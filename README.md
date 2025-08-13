## Demo Store (React + Vite)

A modern demo e‑commerce cart built with React and Vite. Browse products from the Fake Store API, search/filter/sort, view details, add to cart with local persistence, and try a client‑side checkout form with validation.

### Tech stack

- React 19 + Vite 7
- React Router v7 (data APIs, lazy routes)
- TanStack Query v5 for data fetching/caching
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Hook Form + Zod validation
- Lucide icons

### Features

- Product grid with search, category filter, and sorting
- Product quick‑view modal with gallery and add‑to‑cart
- Cart with quantity controls, subtotal, shipping, tax, and total
- Persistent cart via `localStorage` (`cart:v1`)
- Checkout form with validation (COD only; no real payments)

### Getting started

Prerequisites: Node 18+ and npm.

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` – production build to `dist/`
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

### Project structure (key files)

```text
src/
  main.jsx                # App entry; sets up Router + QueryClient
  routes.jsx              # Routes with lazy-loaded pages
  layouts/RootLayout.jsx  # Shell with Navbar/Footer and CartProvider
  pages/Home.jsx          # Products listing + search/filter/sort
  pages/Cart.jsx          # Cart page with summary and actions
  pages/Checkout.jsx      # Checkout form with RHF + Zod
  state/CartContext.jsx   # Cart state + localStorage persistence
  components/             # LazyImage, ProductModal, etc.
  shared/                 # Navbar, Footer
  index.css               # Tailwind (v4) + custom utilities
```

### Routing

- `/` – Home (browse products)
- `/cart` – Cart
- `/checkout` – Checkout

Routes are lazy‑loaded via `createBrowserRouter` in `src/routes.jsx`.

### Data & state

- Products fetched from `https://fakestoreapi.com/products` using TanStack Query
- Cart state via React Context in `src/state/CartContext.jsx`
  - Actions: add, remove, setQuantity, clear
  - Persists to `localStorage` under key `cart:v1`

### Styling

- Tailwind CSS v4 imported in `src/index.css` using `@import "tailwindcss"`
- Additional small utilities (line clamps, animations, scrollbars)

### Deployment

This is a single‑page app. The included `vercel.json` rewrites all routes to `index.html` for client‑side routing. To deploy on Vercel:

1. `npm run build`
2. Deploy the `dist/` directory and keep the provided rewrite.

For other hosts, ensure SPA fallback to `index.html` is enabled.

### Notes & limitations

- Demo only: no backend or real payment integration; checkout is COD UI/validation.
- Images and data come from the public Fake Store API.

### License

No license specified.
