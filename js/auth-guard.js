// Auth Guard - protects routes from unauthorized access

// List of public routes that don't require authentication
const publicRoutes = [
  '/pages/login.html',
  '/login.html',
  '/index.html',
  '/'
];

// Function to check if the current page requires auth
function requiresAuth(path) {
  // Convert route to relative path for comparison
  const relativePath = path.replace(window.location.origin, '');
  
  // Check if the current path is a public route
  return !publicRoutes.some(route => {
    return relativePath === route || relativePath.endsWith(route);
  });
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
  // Get current path
  const currentPath = window.location.pathname;
  
  // Subscribe to auth state changes
  authContext.subscribe(({ user, isLoading }) => {
    // Skip during loading state
    if (isLoading) return;
    
    // Check if the route requires authentication
    if (requiresAuth(currentPath) && !user) {
      // Redirect to login if user is not authenticated
      window.location.href = '/pages/login.html';
    }
  });
}); 