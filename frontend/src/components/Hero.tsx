import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-navy-900/40 z-10" />

      {/* Background Image (Placeholder for now) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-27bf9099d299?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      />

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white font-serif mb-6 drop-shadow-lg tracking-wide">
          <span className="text-gold">RUPALI</span> HOMES
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
          Crafting architectural masterpieces that define luxury and elegance.
          Your dream home awaits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#projects"
            className="px-8 py-3 bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold rounded-sm transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-navy-900 text-white font-bold rounded-sm transition-all duration-300 backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
