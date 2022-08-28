export const protectedRoute = (isAuthenticated, router) => {
  const routesWithAuth =
    router.pathname === '/user-settings' ||
    router.pathname === '/user-settings/upload' ||
    router.pathname === '/user-settings/security' ||
    router.pathname === '/user-settings/notifications' ||
    router.pathname === '/user-settings/wallet'

  const authRoute =
    router.pathname === '/register' || router.pathname === '/login'

  const isAuthenticatedRoute = localStorage.getItem('authed')

  routesWithAuth && Boolean(!isAuthenticatedRoute)
    ? router.push('/login')
    : authRoute && Boolean(isAuthenticatedRoute) && router.push('/')
}
