"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="pt-32 pb-24 px-6 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-syne text-accent-dark mb-4">About Rupali Homes</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              India&apos;s premier luxury real estate platform, connecting discerning buyers with the finest properties across top metropolitan cities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <h2 className="text-3xl font-bold font-syne text-accent-dark">Our Vision</h2>
              <p>
                To redefine the luxury real estate experience by providing unparalleled service, transparency, and access to the most exclusive properties in the market.
              </p>
              <h2 className="text-3xl font-bold font-syne text-accent-dark pt-4">Our Mission</h2>
              <p>
                We strive to build lasting relationships with our clients by understanding their unique needs and delivering exceptional results through our expertise and dedication.
              </p>
              <h2 className="text-3xl font-bold font-syne text-accent-dark pt-4">Why Choose Us?</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Curated selection of premium properties</li>
                <li>Expert guidance throughout the buying/renting process</li>
                <li>Transparent and honest communication</li>
                <li>Deep understanding of local markets</li>
              </ul>
            </div>
            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Home" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
