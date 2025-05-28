// Auth Context - manages user authentication state across the app

// Create a context to store and provide auth state
class AuthContext {
  constructor() {
    this.user = null;
    this.isLoading = true;
    this.error = null;
    this.subscribers = [];
    this._initialize();
  }

  // Initialize auth state listener
  _initialize() {
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
      this.isLoading = false;
      this.user = user;
      this._notifySubscribers();
    }, (error) => {
      this.error = error;
      this.isLoading = false;
      this._notifySubscribers();
    });
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      this.isLoading = true;
      this._notifySubscribers();
      await auth.signInWithPopup(googleProvider);
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
      this.isLoading = true;
      this._notifySubscribers();
      await auth.signOut();
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

// Create a singleton instance
const authContext = new AuthContext();

// Export the auth context
window.authContext = authContext; 