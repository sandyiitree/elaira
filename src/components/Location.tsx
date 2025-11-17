import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { MapPin } from 'lucide-react';

const Location: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const locationPoints = [
    { name: "NH8", distance: "1 km" },
    { name: "SPR", distance: "5 km" },
    { name: "Karma Lakelands", distance: "0 km" },
    { name: "Delhi Airport", distance: "25 km" },
    { name: "Dwarka Expressway", distance: "3 km" },
    { name: "Leopard Trail", distance: "2 km" },
    { name: "Aravali Hills View", distance: "0 km" }
  ];

  return (
    <section id="location" ref={sectionRef} className="py-20 bg-[#1A1815]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Prime <span className="font-bold" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Location</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Strategically located in the heart of the city with convenient access to key destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Map */}
          <div 
            className={`relative rounded-lg overflow-hidden h-96 lg:h-auto transition-opacity duration-1000 ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.994958159795!2d76.96073757571067!3d28.363312475812823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d91cd759c63%3A0x2a9b7a23b55f8fa2!2sElaira%20Residences%20by%20Conscient!5e0!3m2!1sen!2sin!4v1763124469976!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Location Info */}
          <div className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-[#2A2825] p-8 rounded-lg shadow-lg border border-[#3A3835] mb-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Connectivity</h3>
              <div className="space-y-4">
                {locationPoints.map((point, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-[#3A3835] pb-3">
                    <div className="flex items-center">
                      <div className="bg-[#3A3835] p-2 rounded-full mr-4">
                        <div className="h-2 w-2 rounded-full bg-[#D26A3B]"></div>
                      </div>
                      <span className="font-medium text-white">{point.name}</span>
                    </div>
                    <span className="text-white/80">{point.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2A2825] text-white p-8 rounded-lg border border-[#3A3835]">
              <h3 className="text-2xl font-bold mb-6">About the Area</h3>
              <p className="mb-4 text-white/80">
                Located in one of the city's most prestigious neighborhoods, Elaira Residences offers residents 
                the perfect blend of connectivity and tranquility. The surrounding area features lush 
                greenery, premium educational institutions, healthcare facilities, and entertainment options.
              </p>
              <p className="text-white/80">
                With seamless access to major highways and public transportation, navigating the city 
                from Elaira Residences is effortless, making it the ideal location for those who value both 
                convenience and exclusivity.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;
