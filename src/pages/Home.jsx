import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Loader2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { useCart } from "../state/CartContext.jsx";
import { ProductModal } from "../components/ProductModal.jsx";
import { LazyImage } from "../components/LazyImage.jsx";

async function fetchProducts({ signal }) {
  const res = await fetch("https://fakestoreapi.com/products", {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data;
}

export function HomePage() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
  });

  const categories = useMemo(() => {
    if (!data) return [];
    const cats = [...new Set(data.map((p) => p.category))];
    return ["all", ...cats];
  }, [data]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!data) return [];

    let filtered = data.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );
      case "name":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [data, searchTerm, selectedCategory, sortBy]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-gray-400 mb-4" />
        <p className="text-gray-600">Loading amazing products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="size-12 text-red-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">
          We couldn't load the products. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to Demo Store
        </h1>
        <p className="text-blue-100 text-lg">
          Discover amazing products at unbeatable prices
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="default">Sort by</option>
            <option value="name">Name A-Z</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredAndSortedProducts.length}{" "}
        {filteredAndSortedProducts.length === 1 ? "product" : "products"}
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortBy("default");
            }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
              onViewDetails={(product) => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={addItem}
      />
    </div>
  );
}

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    onAddToCart(product);
    // Add a small delay for better UX feedback
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group">
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <LazyImage
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {product.rating && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating.rate}</span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          aria-label="Quick view">
          <Eye className="size-4 text-gray-700" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="space-y-2">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            {product.category}
          </p>
          <h3
            className="font-semibold text-gray-900 line-clamp-2 leading-tight"
            title={product.title}>
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.rating && (
              <div className="text-xs text-gray-500">
                ({product.rating.count} reviews)
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white text-sm font-medium h-10 px-4 hover:bg-gray-800 active:bg-gray-900 disabled:opacity-70 transition-colors">
            {isAdding ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="size-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
