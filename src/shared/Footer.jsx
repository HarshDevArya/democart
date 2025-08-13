import { Link } from "react-router-dom";
import { Store, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto max-w-6xl w-full px-4">
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-bold text-xl">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Store className="size-5 text-white" aria-hidden="true" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Demo Store
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Quality products, fair prices.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link
                to="/cart"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cart
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="size-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="size-4" />
                <span>support@demostore.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm text-gray-500">
              © {currentYear} Demo Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
