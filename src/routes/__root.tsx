import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import styles from '@/index.css?url'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: styles }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  )
}

function RootDocument({ 
    children 
}: { 
    children: ReactNode 
}) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className='dark:bg-zinc-950 dark:text-zinc-200 bg-zinc-50 text-zinc-900 min-h-screen antialiased'>
        {children}
        <Scripts />
        <ReactQueryDevtools />
        <TanStackRouterDevtools />
      </body>
    </html>
  )
}