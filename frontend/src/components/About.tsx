import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-400/20 rounded-full z-0"></div>
            <div className="relative z-10 bg-navy-900/5 p-2 rounded-lg rotate-3 transform transition-transform hover:rotate-0 duration-500">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury Home Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-navy-900 font-serif mb-6">
              Building Legacy Since 2010
            </h2>
            <div className="w-20 h-1 bg-gold-400 mb-8 rounded-full"></div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Rupali Homes isn't just about building structures; it's about
              creating spaces where memories are made and legacies are built.
              With over a decade of excellence in the real estate industry, we
              have established ourselves as a symbol of trust and quality.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our vision is to transform the skyline with architectural marvels
              that blend modern aesthetics with functional design. We are
              committed to delivering premium residential and commercial
              projects that stand the test of time.
            </p>

            <div className="block">
              <Link
                href="#contact"
                className="inline-block px-8 py-3 bg-navy-900 text-white font-bold rounded-sm hover:bg-navy-800 transition-colors shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
