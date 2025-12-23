import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/lib/data";
import { ArrowRight, Shield, Truck, RefreshCw, Award } from "lucide-react";

export default function Home() {
  const featuredProducts = sampleProducts.filter(p => p.featured).slice(0, 4);
  const brands = ["Chanel", "Louis Vuitton", "Hermes", "Dior", "Gucci", "Prada"];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[85vh] sm:min-h-[80vh] bg-gradient-to-br from-purple-100 via-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center py-6 sm:py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div className="flex justify-center order-1 md:order-2 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-4 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
                  <Image src="/images/logo-animated.gif" alt="Bella Bags of Boston" width={400} height={400} className="relative z-10 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-3xl shadow-xl" priority unoptimized />
                </div>
              </div>
              <div className="text-center md:text-left animate-fade-in order-2 md:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-gray-900 leading-tight">Luxury<span className="block text-pink-500">Redefined</span></h1>
                <p className="mt-3 sm:mt-6 text-sm sm:text-lg text-gray-600 max-w-md mx-auto md:mx-0">Discover Boston&apos;s most exquisite collection of authentic designer handbags. From Chanel to Hermes, find your perfect statement piece.</p>
                <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                  <Link href="/shop" className="btn-primary text-center">Shop Collection</Link>
                  <Link href="/about" className="btn-secondary text-center">Our Story</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black text-white py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 text-center p-2"><Shield className="text-pink-400" size={24} /><div><p className="font-semibold text-xs sm:text-base">100% Authentic</p><p className="text-[10px] sm:text-sm text-gray-400">Guaranteed</p></div></div>
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 text-center p-2"><Truck className="text-pink-400" size={24} /><div><p className="font-semibold text-xs sm:text-base">Free Shipping</p><p className="text-[10px] sm:text-sm text-gray-400">Orders $500+</p></div></div>
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 text-center p-2"><RefreshCw className="text-pink-400" size={24} /><div><p className="font-semibold text-xs sm:text-base">Easy Returns</p><p className="text-[10px] sm:text-sm text-gray-400">30-day policy</p></div></div>
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 text-center p-2"><Award className="text-pink-400" size={24} /><div><p className="font-semibold text-xs sm:text-base">Expert Curated</p><p className="text-[10px] sm:text-sm text-gray-400">Premium selection</p></div></div>
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-12"><h2 className="text-xl sm:text-3xl md:text-4xl font-serif text-gray-900">Featured Collection</h2><p className="mt-2 sm:mt-4 text-xs sm:text-base text-gray-600 max-w-2xl mx-auto">Hand-selected pieces from the world&apos;s most prestigious fashion houses</p></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">{featuredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}</div>
          <div className="text-center mt-6 sm:mt-12"><Link href="/shop" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">View All Products<ArrowRight size={18} /></Link></div>
        </div>
      </section>
      <section className="py-10 sm:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-12"><h2 className="text-xl sm:text-3xl md:text-4xl font-serif text-gray-900">Our Brands</h2><p className="mt-2 sm:mt-4 text-xs sm:text-base text-gray-600">Exclusively authentic luxury</p></div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-8 md:gap-16">{brands.map((brand) => (<Link key={brand} href={"/shop?brand=" + brand} className="text-sm sm:text-xl md:text-2xl font-serif text-gray-400 hover:text-pink-500 transition-colors">{brand}</Link>))}</div>
        </div>
      </section>
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="order-2 md:order-1"><Image src="/images/logo.png" alt="Bella Bags of Boston" width={400} height={400} className="mx-auto w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-2xl shadow-lg" /></div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-3 sm:mb-6">Welcome to Bella Bags</h2>
              <p className="text-xs sm:text-base text-gray-600 leading-relaxed mb-2 sm:mb-4">At Bella Bags of Boston, we believe every woman deserves to carry a piece of luxury. Our carefully curated collection features authentic designer handbags from the world&apos;s most coveted fashion houses.</p>
              <p className="text-xs sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-6">Whether you&apos;re searching for a timeless Chanel classic or a statement Birkin, our expert team is here to help you find your perfect match.</p>
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2 text-sm sm:text-base">Learn More About Us<ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif mb-2 sm:mb-4">Stay Connected</h2>
          <p className="text-xs sm:text-base text-gray-400 mb-4 sm:mb-8 max-w-2xl mx-auto">Follow us on Facebook for the latest arrivals, exclusive deals, and behind-the-scenes looks at our newest luxury finds.</p>
          <a href="https://www.facebook.com/profile.php?id=61578321601654" target="_blank" rel="noopener noreferrer" className="btn-accent inline-flex items-center gap-2 text-sm sm:text-base">Follow Us on Facebook<ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
