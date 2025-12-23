"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { sampleProducts, categories, brands, conditions } from "@/lib/data";
import { Filter, ArrowRight, X } from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  let filteredProducts = sampleProducts.filter(product => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    if (selectedBrand !== "All" && product.brand !== selectedBrand) return false;
    if (selectedCondition !== "All" && product.condition !== selectedCondition) return false;
    return true;
  });

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 text-center">Shop Collection</h1>
          <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">Discover our curated selection of authentic luxury handbags</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden btn-secondary inline-flex items-center gap-2">
              <Filter size={18} /> Filters
            </button>
            <p className="text-gray-600">{filteredProducts.length} products</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-elegant w-auto">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex gap-8">
            <aside className={"w-64 flex-shrink-0 " + (showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-auto md:static md:bg-transparent md:p-0" : "hidden md:block")}>
              {showFilters && (
                <button onClick={() => setShowFilters(false)} className="md:hidden absolute top-4 right-4">
                  <X size={24} />
                </button>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} className={"block w-full text-left px-3 py-2 rounded " + (selectedCategory === cat ? "bg-pink-500 text-white" : "hover:bg-gray-100")}>{cat}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Brand</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <button key={brand} onClick={() => setSelectedBrand(brand)} className={"block w-full text-left px-3 py-2 rounded " + (selectedBrand === brand ? "bg-pink-500 text-white" : "hover:bg-gray-100")}>{brand}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map(cond => (
                      <button key={cond} onClick={() => setSelectedCondition(cond)} className={"block w-full text-left px-3 py-2 rounded " + (selectedCondition === cond ? "bg-pink-500 text-white" : "hover:bg-gray-100")}>{cond}</button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                  <button onClick={() => { setSelectedCategory("All"); setSelectedBrand("All"); setSelectedCondition("All"); }} className="btn-secondary">Clear Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/" className="text-pink-500 hover:text-pink-600 inline-flex items-center gap-2">
            <ArrowRight className="rotate-180" size={18} /> Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
