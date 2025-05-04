import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import AppProviders from '../providers'
import Header from '../components/organisms/Header'

export const Route = createRootRoute({
  component: () => (
    <AppProviders>
      <Header/>
      <Outlet />
      <TanStackRouterDevtools />
    </AppProviders>
  ),
})
