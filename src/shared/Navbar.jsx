import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Store, Menu, X, Heart, User } from "lucide-react";
import { useCart } from "../state/CartContext.jsx";

export function Navbar() {
  const { totalItems, subtotal } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto max-w-6xl w-full px-4">
        {/* Main navbar */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <Store className="size-5 text-white" aria-hidden="true" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Demo Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
              end>
              Home
            </NavLink>
            <div className="text-sm font-medium text-gray-600">Categories</div>
            <div className="text-sm font-medium text-gray-600">About</div>
            <div className="text-sm font-medium text-gray-600">Contact</div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="size-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="size-5" />
            </button>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }>
              <ShoppingCart className="size-5" aria-hidden="true" />
              <span className="font-medium">Cart</span>
              {totalItems > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 rounded-full bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center px-1 transition-transform duration-200 group-hover:scale-110">
                    {totalItems}
                  </span>
                  <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 max-w-0 group-hover:max-w-20 overflow-hidden whitespace-nowrap">
                    ${subtotal.toFixed(2)}
                  </span>
                </>
              )}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-2">
              <NavLink
                to="/"
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
                end>
                Home
              </NavLink>
              <div className="px-4 py-3 text-base font-medium text-gray-600">
                Categories
              </div>
              <div className="px-4 py-3 text-base font-medium text-gray-600">
                About
              </div>
              <div className="px-4 py-3 text-base font-medium text-gray-600">
                Contact
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-4 px-4 pb-3">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Heart className="size-5" />
                    <span>Wishlist</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <User className="size-5" />
                    <span>Account</span>
                  </button>
                </div>

                <NavLink
                  to="/cart"
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors group ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="size-5" />
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <span className="rounded-full bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center px-1 transition-transform duration-200 group-hover:scale-110">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  {subtotal > 0 && (
                    <span className="text-sm font-semibold transition-all duration-300 group-hover:scale-105">
                      ${subtotal.toFixed(2)}
                    </span>
                  )}
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
