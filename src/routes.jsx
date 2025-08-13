import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    async lazy() {
      return {}
    },
    children: [
      {
        index: true,
        async lazy() {
          const mod = await import('./pages/Home.jsx')
          return { Component: mod.HomePage }
        },
      },
      {
        path: 'cart',
        async lazy() {
          const mod = await import('./pages/Cart.jsx')
          return { Component: mod.CartPage }
        },
      },
      {
        path: 'checkout',
        async lazy() {
          const mod = await import('./pages/Checkout.jsx')
          return { Component: mod.CheckoutPage }
        },
      },
    ],
  },
])


