// Auth Context - manages user authentication state across the app

// Create a context to store and provide auth state
class AuthContext {
  constructor() {
    this.user = null;
    this.isLoading = true;
    this.error = null;
    this.subscribers = [];
    
    // Wait for DOM content to be loaded before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._initialize());
    } else {
      // DOM already loaded, initialize directly
      setTimeout(() => this._initialize(), 100);
    }
  }

  // Initialize auth state listener
  _initialize() {
    // Check if Firebase auth is available
    if (typeof window.auth === 'undefined') {
      console.error('Firebase auth not initialized yet');
      this.error = 'Firebase auth not initialized';
      this.isLoading = false;
      this._notifySubscribers();
      return;
    }
    
    try {
      // Listen for auth state changes
      window.auth.onAuthStateChanged((user) => {
        this.isLoading = false;
        this.user = user;
        this._notifySubscribers();
      }, (error) => {
        this.error = error;
        this.isLoading = false;
        this._notifySubscribers();
      });
    } catch (error) {
      console.error('Error initializing auth listener:', error);
      this.error = error.message;
      this.isLoading = false;
      this._notifySubscribers();
    }
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      if (!window.auth || !window.googleProvider) {
        throw new Error('Firebase auth not initialized');
      }
      
      this.isLoading = true;
      this._notifySubscribers();
      await window.auth.signInWithPopup(window.googleProvider);
      return true;
    } catch (error) {
      console.error("Error signing in with Google", error);
      this.error = error.message;
      this._notifySubscribers();
      return false;
    } finally {
      this.isLoading = false;
      this._notifySubscribers();
    }
  }

  // Sign out
  async signOut() {
    try {
      if (!window.auth) {
        throw new Error('Firebase auth not initialized');
      }
      
      this.isLoading = true;
      this._notifySubscribers();
      await window.auth.signOut();
      return true;
    } catch (error) {
      console.error("Error signing out", error);
      this.error = error.message;
      this._notifySubscribers();
      return false;
    } finally {
      this.isLoading = false;
      this._notifySubscribers();
    }
  }

  // Subscribe to auth state changes
  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this._getState());
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers of state change
  _notifySubscribers() {
    const state = this._getState();
    this.subscribers.forEach(callback => callback(state));
  }

  // Get current state
  _getState() {
    return {
      user: this.user,
      isLoading: this.isLoading,
      error: this.error,
      isAuthenticated: !!this.user
    };
  }
}

// Create a singleton instance and expose it globally
document.addEventListener('DOMContentLoaded', function() {
  window.authContext = new AuthContext();
}); 