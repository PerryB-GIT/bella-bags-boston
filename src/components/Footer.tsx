import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and About */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <Image
              src="/images/logo.png"
              alt="Bella Bags of Boston"
              width={120}
              height={120}
              className="object-contain bg-white rounded-2xl shadow-lg p-2 mb-4 mx-auto md:mx-0"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Boston&apos;s premier destination for authentic luxury handbags. 
              Curated collection of designer bags at exceptional prices.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-pink-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Track Order
                </Link>
              </li>
            </ul>
          </nav>

          {/* Customer Service */}
          <nav aria-label="Customer service">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-pink-400">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-pink-400">Contact Us</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                <MapPin size={18} className="text-pink-400 flex-shrink-0" aria-hidden="true" />
                Boston, Massachusetts
              </p>
              <p>
                <a href="mailto:info@bellabags.com" className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  <Mail size={18} className="text-pink-400 flex-shrink-0" aria-hidden="true" />
                  info@bellabags.com
                </a>
              </p>
              <p>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  <Phone size={18} className="text-pink-400 flex-shrink-0" aria-hidden="true" />
                  (123) 456-7890
                </a>
              </p>
            </address>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61578321601654" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Follow us on Facebook (opens in new tab)"
              >
                <Facebook size={24} aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Bella Bags of Boston. All rights reserved.</p>
          <p className="mt-2">Authenticity Guaranteed on All Products</p>
          <p className="mt-4 text-xs">
            Developed by{' '}
            <a
              href="https://support-forge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              Support Forge
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
