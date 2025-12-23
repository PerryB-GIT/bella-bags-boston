import { writeFileSync } from 'fs';

const homepage = `import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/lib/data";
import { ArrowRight, Shield, Truck, RefreshCw, Award } from "lucide-react";

export default function Home() {
  const featuredProducts = sampleProducts.filter(p => p.featured).slice(0, 4);
  const brands = ["Chanel", "Louis Vuitton", "Hermes", "Dior", "Gucci", "Prada"];

  return (
    <div className="min-h-screen">
      <section className="relative h-[80vh] bg-gradient-to-br from-purple-100 via-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">
                  Luxury
                  <span className="block text-pink-500">Redefined</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-md">
                  Discover Boston&apos;s most exquisite collection of authentic designer handbags. 
                  From Chanel to Hermes, find your perfect statement piece.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/shop" className="btn-primary">Shop Collection</Link>
                  <Link href="/about" className="btn-secondary">Our Story</Link>
                </div>
              </div>
              <div className="flex justify-center animate-fade-in animate-delay-200">
                <div className="relative">
                  <div className="absolute -inset-4 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
                  <Image src="/images/logo-animated.gif" alt="Bella Bags of Boston" width={400} height={400} className="relative z-10" priority unoptimized />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Shield className="text-pink-400" size={32} />
              <div><p className="font-semibold">100% Authentic</p><p className="text-sm text-gray-400">Guaranteed</p></div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Truck className="text-pink-400" size={32} />
              <div><p className="font-semibold">Free Shipping</p><p className="text-sm text-gray-400">Orders over \$500</p></div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <RefreshCw className="text-pink-400" size={32} />
              <div><p className="font-semibold">Easy Returns</p><p className="text-sm text-gray-400">30-day policy</p></div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Award className="text-pink-400" size={32} />
              <div><p className="font-semibold">Expert Curated</p><p className="text-sm text-gray-400">Premium selection</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Featured Collection</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Hand-selected pieces from the world&apos;s most prestigious fashion houses</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">View All Products<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Our Brands</h2>
            <p className="mt-4 text-gray-600">Exclusively authentic luxury</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <Link key={brand} href={"/shop?brand=" + brand} className="text-2xl font-serif text-gray-400 hover:text-pink-500 transition-colors">{brand}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div><Image src="/images/logo.png" alt="Bella Bags of Boston" width={400} height={400} className="mx-auto" /></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Welcome to Bella Bags</h2>
              <p className="text-gray-600 leading-relaxed mb-4">At Bella Bags of Boston, we believe every woman deserves to carry a piece of luxury. Our carefully curated collection features authentic designer handbags from the world&apos;s most coveted fashion houses.</p>
              <p className="text-gray-600 leading-relaxed mb-6">Whether you&apos;re searching for a timeless Chanel classic or a statement Birkin, our expert team is here to help you find your perfect match.</p>
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2">Learn More About Us<ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Stay Connected</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Follow us on Facebook for the latest arrivals, exclusive deals, and behind-the-scenes looks at our newest luxury finds.</p>
          <a href="https://www.facebook.com/profile.php?id=61578321601654" target="_blank" rel="noopener noreferrer" className="btn-accent inline-flex items-center gap-2">Follow Us on Facebook<ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
`;

writeFileSync('src/app/page.tsx', homepage);
console.log('Homepage written');
