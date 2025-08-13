import { useState } from "react";
import { LazyImage } from "./LazyImage.jsx";
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Mock additional images (in a real app, these would come from the API)
  const images = [product.image, product.image, product.image];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal">
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)] scrollbar-thin">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <LazyImage
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="flex gap-2 justify-center">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}>
                  <LazyImage
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {product.category}
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Free shipping over $100
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="size-4 text-green-600" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="size-4 text-blue-600" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="size-4 text-purple-600" />
                <span>2-year warranty included</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <Minus className="size-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-50 transition-colors">
                    <Plus className="size-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Total: ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white font-semibold py-3 px-6 hover:bg-gray-800 transition-colors">
                <ShoppingCart className="size-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>

              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 text-gray-700 font-medium py-2 px-4 hover:bg-gray-50 transition-colors">
                  <Heart className="size-4" />
                  Wishlist
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 text-gray-700 font-medium py-2 px-4 hover:bg-gray-50 transition-colors">
                  <Share2 className="size-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-gray-900">Product Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">SKU:</div>
                <div className="text-gray-900">
                  #{product.id.toString().padStart(6, "0")}
                </div>
                <div className="text-gray-600">Category:</div>
                <div className="text-gray-900 capitalize">
                  {product.category}
                </div>
                <div className="text-gray-600">Availability:</div>
                <div className="text-green-600">In Stock</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
