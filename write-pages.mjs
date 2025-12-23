import { writeFileSync, mkdirSync } from 'fs';

// About Page
const aboutPage = `import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Story</h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bella Bags of Boston was born from a passion for luxury fashion and a commitment to making designer handbags accessible to every woman who dreams of carrying one.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded by Jan and Perry, two lifelong friends with decades of combined experience in the luxury fashion industry, we set out to create a destination where authenticity meets affordability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every bag in our collection is hand-selected and authenticated by our expert team, ensuring you receive only genuine designer pieces at exceptional prices.
              </p>
            </div>
            <div className="flex justify-center">
              <Image src="/images/logo.png" alt="Bella Bags of Boston" width={400} height={400} className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-12">Why Choose Bella Bags?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 card-elegant">
              <Shield className="mx-auto text-pink-500 mb-4" size={48} />
              <h3 className="text-xl font-serif mb-2">100% Authentic</h3>
              <p className="text-gray-600">Every bag is verified by our authentication experts. We guarantee authenticity or your money back.</p>
            </div>
            <div className="text-center p-8 card-elegant">
              <Heart className="mx-auto text-pink-500 mb-4" size={48} />
              <h3 className="text-xl font-serif mb-2">Curated Selection</h3>
              <p className="text-gray-600">We hand-pick only the finest pieces from Chanel, Louis Vuitton, Hermes, and other prestigious brands.</p>
            </div>
            <div className="text-center p-8 card-elegant">
              <Star className="mx-auto text-pink-500 mb-4" size={48} />
              <h3 className="text-xl font-serif mb-2">Exceptional Service</h3>
              <p className="text-gray-600">Our dedicated team provides personalized assistance to help you find your perfect luxury piece.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Find Your Dream Bag?</h2>
          <p className="text-gray-400 mb-8">Browse our collection of authentic luxury handbags today.</p>
          <Link href="/shop" className="btn-accent inline-flex items-center gap-2">
            Shop Now <ArrowRight size={18} />
          </Link>
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
`;

writeFileSync('src/app/about/page.tsx', aboutPage);
console.log('About page written');
