import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Truck,
} from "lucide-react";
import { useCart } from "../state/CartContext.jsx";
import { LazyImage } from "../components/LazyImage.jsx";

export function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="size-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-black text-white font-medium px-6 py-3 hover:bg-gray-800 transition-colors">
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  const savings = 0; // You can calculate savings here if you have original prices
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">each</span>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity">
                        <Minus className="size-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity">
                        <Plus className="size-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                      aria-label="Remove item">
                      <Trash2 className="size-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.quantity > 1 &&
                      `${item.quantity} × $${item.price.toFixed(2)}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Truck className="size-4 text-gray-400" />
                  <span className="text-gray-600">Shipping</span>
                </div>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>

              {subtotal < 100 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-1 text-blue-700 font-medium mb-1">
                    <Tag className="size-4" />
                    Free shipping available
                  </div>
                  <p className="text-blue-600">
                    Add ${(100 - subtotal).toFixed(2)} more to qualify for free
                    shipping
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white font-semibold py-3 px-4 hover:bg-gray-800 transition-colors mb-3">
              Proceed to Checkout
            </Link>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                Secure checkout powered by SSL
              </div>
              <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
                <span>🔒</span>
                <span>Your information is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
