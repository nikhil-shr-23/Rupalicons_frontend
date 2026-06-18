"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    // Format phone to digits only if it matches
    const submissionData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, ""),
    };

    const result = await submitContactForm(submissionData);

    if (result) {
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

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
            Have questions about a property? Our team is here to help you find
            your dream home.
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
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle className="h-16 w-16 text-gold mb-4" />
                <h3 className="text-2xl font-bold font-syne mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-400">
                  We&apos;ve received your message and will get back to you
                  shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-[#1A2235] border border-gray-700/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                  ></textarea>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold hover:bg-gold-hover text-accent-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-dark" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
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
                    <p className="text-white text-lg">info@rupalihomes.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/rupali_homes"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Integration */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-gray-700/50 relative">
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
