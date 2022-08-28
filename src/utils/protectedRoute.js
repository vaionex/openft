export const protectedRoute = (isAuthenticated, router) => {
  const routesWithAuth =
    router.pathname === '/user-settings' ||
    router.pathname === '/user-settings/upload' ||
    router.pathname === '/user-settings/security' ||
    router.pathname === '/user-settings/notifications' ||
    router.pathname === '/user-settings/wallet'

  const authRoute =
    router.pathname === '/register' || router.pathname === '/login'

  if (routesWithAuth && !isAuthenticated) {
    router.push('/')
  }

  if (authRoute && isAuthenticated) {
    router.push('/')
  }
}
