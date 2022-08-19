
export const protectedRoute = (user, router) => {
  const routesWithAuth =
    router.pathname === '/user-settings'
    || router.pathname === '/user-settings/upload'
    || router.pathname === '/user-settings/security'
    || router.pathname === '/user-settings/notifications'
    || router.pathname === '/user-settings/wallet'

  const authRoute =
    router.pathname === '/register'
    || router.pathname === '/login'

  if (routesWithAuth || authRoute) {
    !user
      ? router.push('/')
      : authRoute
        ? router.push('/')
        : ''
  }
}