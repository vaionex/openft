export const protectedRoute = (user, isAuthenticated, isPending, router) => {
  const routesWithAuth =
    router.pathname === '/user-settings' ||
    router.pathname === '/user-settings/upload' ||
    router.pathname === '/user-settings/security' ||
    router.pathname === '/user-settings/notifications' ||
    router.pathname === '/user-settings/wallet'

  const authRoute =
    router.pathname === '/register' || router.pathname === '/login'

  if (
    routesWithAuth &&
    isAuthenticated === false &&
    (isPending === false || isPending === null)
  ) {
    router.push('/')
  }

  if (
    authRoute &&
    isAuthenticated &&
    (isPending === false || isPending === null)
  ) {
    router.push('/')
  }
}
