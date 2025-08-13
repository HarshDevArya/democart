import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar.jsx";
import { Footer } from "../shared/Footer.jsx";
import { CartProvider } from "../state/CartContext.jsx";

export function RootLayout() {
  return (
    <CartProvider>
      <div className="min-h-dvh flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto max-w-6xl w-full px-4 py-6 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
