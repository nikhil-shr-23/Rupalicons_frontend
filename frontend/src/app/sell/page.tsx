"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Building,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { submitInquiry } from "../../lib/api";

export default function SellPropertyPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    propertyType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setStatus("submitting");

    // Format phone to digits only if it matches
    const submissionData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, ""),
      type: "SELL",
    };

    const success = await submitInquiry(submissionData);

    if (success) {
      setStatus("success");
      setFormData({ name: "", phone: "", city: "", propertyType: "" });
    } else {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Copy & Value Prop */}
          <div>
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Sell With Rupali Homes
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-syne text-accent-dark leading-tight mb-6">
              Get the Best Value for Your{" "}
              <span className="text-gold">Property</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Join thousands of homeowners who trust Rupali Homes to sell their
              properties quickly and profitably. Zero upfront fees, complete
              transparency, and expert guidance at every step.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-accent-dark text-xl mb-1">
                    Maximum Market Value
                  </h3>
                  <p className="text-gray-500">
                    Our data-driven pricing strategy ensures you don't leave
                    money on the table.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Users className="text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-accent-dark text-xl mb-1">
                    Qualified Buyer Network
                  </h3>
                  <p className="text-gray-500">
                    Access our exclusive network of pre-approved buyers and
                    investors.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-accent-dark text-xl mb-1">
                    Hassle-Free Legal Process
                  </h3>
                  <p className="text-gray-500">
                    We handle all the paperwork, legal checks, and negotiations
                    for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full z-0"></div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 relative z-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold font-syne text-accent-dark mb-4">
                  Request Received!
                </h3>
                <p className="text-gray-600 text-lg">
                  Thank you. One of our senior property experts will contact you
                  within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-gold font-bold hover:underline"
                >
                  Submit another property
                </button>
              </motion.div>
            ) : (
              <div className="relative z-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold font-syne text-accent-dark mb-2">
                    Request Valuation
                  </h2>
                  <p className="text-gray-500">
                    Fill out this quick form and we'll get back to you with a
                    free market estimate.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        City *
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <select
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select City</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Noida">Noida</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Pune">Pune</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Property Type *
                      </label>
                      <div className="relative">
                        <Building
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <select
                          required
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select Type</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa</option>
                          <option value="Plot">Plot</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 mt-4 bg-accent-dark text-white rounded-xl font-bold text-lg hover:bg-gold transition-all duration-300 shadow-xl hover:shadow-gold/20 flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Get Free Valuation"
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By submitting, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
