import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../state/CartContext.jsx";
import { LazyImage } from "../components/LazyImage.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Truck,
  Shield,
  MapPin,
  Phone,
  User,
  FileText,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone")
    .max(15, "Enter a valid phone")
    .regex(/^\+?[0-9\-\s]+$/, "Only numbers, spaces, dashes and optional +"),
  address: z.string().min(6, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Postal code must be exactly 6 digits"),
  cod: z.literal(true, {
    errorMap: () => ({
      message: "Please select Cash on delivery as the payment method",
    }),
  }),
  notes: z.string().optional(),
});

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const totals = useMemo(() => {
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { shipping, tax, total };
  }, [subtotal]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(checkoutSchema), mode: "onTouched" });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));

    // Generate a random order number
    const generatedOrderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`;
    setOrderNumber(generatedOrderNumber);
    setShowConfirm(true);
    clear();
    reset();
  };

  if (items.length === 0 && !showConfirm) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="size-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before proceeding to checkout.
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1">Complete your order</p>
        </div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          <ArrowLeft className="size-4" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Truck className="size-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Information
                </h2>
                <p className="text-sm text-gray-600">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="size-4" />
                    Full Name
                  </label>
                  <input
                    className={`w-full h-11 border rounded-lg px-4 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="size-4" />
                    Mobile Number
                  </label>
                  <input
                    className={`w-full h-11 border rounded-lg px-4 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="+1 555 123 4567"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="size-4" />
                  Street Address
                </label>
                <input
                  className={`w-full h-11 border rounded-lg px-4 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="123 Main Street, Apartment 4B"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    City
                  </label>
                  <input
                    className={`w-full h-11 border rounded-lg px-4 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.city ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="New York"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Postal Code
                  </label>
                  <input
                    className={`w-full h-11 border rounded-lg px-4 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.postalCode ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="560001"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    type="text"
                    {...register("postalCode")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                    }}
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="size-4" />
                  Order Notes (optional)
                </label>
                <textarea
                  className="w-full min-h-24 border border-gray-300 rounded-lg px-4 py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any special delivery instructions..."
                  {...register("notes")}
                />
              </div>

              {/* Payment Method */}
              <div className="border-t pt-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CreditCard className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Payment Method
                    </h3>
                    <p className="text-sm text-gray-600">
                      How would you like to pay?
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <input
                      id="cod"
                      type="checkbox"
                      className="size-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      {...register("cod")}
                    />
                    <label
                      htmlFor="cod"
                      className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <span>💰</span>
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 ml-8">
                    Pay when your order is delivered to your doorstep
                  </p>
                  {errors.cod && (
                    <p className="text-xs text-red-600 mt-2 ml-8 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.cod.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white font-semibold py-4 px-6 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all">
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <Shield className="size-5" />
                    Place Order Securely
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Truck className="size-4 text-gray-400" />
                  <span className="text-gray-600">Shipping</span>
                </div>
                <span className="font-medium">
                  {totals.shipping === 0
                    ? "Free"
                    : `$${totals.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${totals.tax.toFixed(2)}</span>
              </div>

              {subtotal < 100 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <p className="text-blue-700 font-medium">
                    💡 Free shipping tip
                  </p>
                  <p className="text-blue-600 text-xs mt-1">
                    Add ${(100 - subtotal).toFixed(2)} more to get free shipping
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="size-4" />
                <span>SSL Secured Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Order Confirmed! 🎉
              </h3>
              <p className="text-gray-600">
                Thank you for your purchase! Your order has been placed
                successfully and you'll receive a confirmation email shortly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Order Number:</strong> {orderNumber}
                <br />
                <strong>Order Total:</strong> ${totals.total.toFixed(2)}
                <br />
                <strong>Payment:</strong> Cash on Delivery
                <br />
                <strong>Estimated Delivery:</strong> 3-5 business days
              </p>
            </div>
            <button
              onClick={() => {
                setShowConfirm(false);
                setOrderNumber(null);
                navigate("/");
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white font-semibold py-3 px-6 hover:bg-gray-800 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
