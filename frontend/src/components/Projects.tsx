import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "The Golden Heights",
    location: "Premium District, City Center",
    description:
      "A 25-story luxury apartment complex featuring panoramic city views and world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    status: "Under Construction",
  },
  {
    id: 2,
    title: "Rupali Villa Estate",
    location: "Green Valley, Suburbs",
    description:
      "Exclusive gated community of 50 luxury villas surrounded by lush greenery and private lakes.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
  },
  {
    id: 3,
    title: "Sapphire Commercial Plaza",
    location: "Business Hub",
    description:
      "State-of-the-art office spaces and retail outlets designed for modern businesses.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    status: "Booking Open",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 font-serif mb-4">
            Our Premium Projects
          </h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of exceptional properties, designed with
            precision and tailored for sophisticated living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-navy-900/90 text-gold px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy-900 mb-2 font-serif">
                  {project.title}
                </h3>
                <p className="text-gold-600 font-medium text-sm mb-4">
                  {project.location}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <button className="text-navy-900 font-semibold hover:text-gold transition-colors text-sm uppercase tracking-wide flex items-center gap-2">
                    View Details
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
