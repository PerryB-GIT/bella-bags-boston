"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, ArrowRight, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Have a question about a bag? Need help with an order? We are here to help!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="card-elegant p-8 mb-8">
                <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
                <address className="space-y-4 not-italic">
                  <div className="flex items-center gap-4">
                    <MapPin className="text-pink-500" size={24} aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600">Boston, Massachusetts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="text-pink-500" size={24} aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:info@bellabags.com" className="text-gray-600 hover:text-pink-500">info@bellabags.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-pink-500" size={24} aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-pink-500">(123) 456-7890</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Facebook className="text-pink-500" size={24} aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Facebook</p>
                      <a href="https://www.facebook.com/profile.php?id=61578321601654" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">Follow Us</a>
                    </div>
                  </div>
                </address>
              </div>
            </div>

            <div className="card-elegant p-8">
              {submitted ? (
                <div className="text-center py-8" role="alert" aria-live="polite">
                  <div className="text-pink-500 mb-4"><Send size={48} className="mx-auto" aria-hidden="true" /></div>
                  <h3 className="text-2xl font-serif mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                  <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" id="contact-name" name="name" required className="input-elegant" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input type="email" id="contact-email" name="email" required className="input-elegant" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input type="text" id="contact-subject" name="subject" required className="input-elegant" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea id="contact-message" name="message" rows={5} required className="input-elegant" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary w-full">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/" className="text-pink-500 hover:text-pink-600 inline-flex items-center gap-2">
            <ArrowRight className="rotate-180" size={18} aria-hidden="true" /> Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
