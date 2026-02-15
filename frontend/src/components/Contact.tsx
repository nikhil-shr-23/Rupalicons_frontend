"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 bg-accent-dark text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-syne mb-6">
            Get In <span className="text-gold">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Have questions? Our team is here to help you plan your dream home.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Location / Sector
                </label>
                <input
                  type="text"
                  placeholder="e.g. DLF Phase 2, Sector 56"
                  className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gold hover:bg-gold-hover text-accent-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold font-syne mb-8">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Office Address
                    </p>
                    <p className="text-white text-lg">
                      123, Sector 56, Gurgaon, Haryana 122011
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                    <Phone className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Phone Number
                    </p>
                    <p className="text-white text-lg">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                    <Mail className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Email Address
                    </p>
                    <p className="text-white text-lg">
                      info@rupaliconstruction.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Integration */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-gray-700/50 relative">
              {/* Using an iframe for Google Maps (Placeholder coordinates for Gurgaon) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.155462529683!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d187cc8155555%3A0x6b77207860155555!2sSector%2056%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
