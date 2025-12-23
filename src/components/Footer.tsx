import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Bella Bags of Boston"
              width={100}
              height={100}
              className="object-contain bg-white rounded-full p-2 mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Boston&apos;s premier destination for authentic luxury handbags. 
              Curated collection of designer bags at exceptional prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client" className="text-gray-400 hover:text-pink-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="text-pink-400" />
                Boston, Massachusetts
              </li>
              <li>
                <a href="mailto:info@bellabags.com" className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                  <Mail size={18} className="text-pink-400" />
                  info@bellabags.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                  <Phone size={18} className="text-pink-400" />
                  (123) 456-7890
                </a>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61578321601654" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Bella Bags of Boston. All rights reserved.</p>
          <p className="mt-2">Authenticity Guaranteed on All Products</p>
        </div>
      </div>
    </footer>
  );
}
