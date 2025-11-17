import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { X } from 'lucide-react';
import img1 from '../assets/images/V05.jpg';
import img2 from '../assets/images/V06-B.jpg';
import img3 from '../assets/images/V13A.jpg';
import img4 from '../assets/images/V15-A.jpg';
import img5 from '../assets/images/V08.jpg';
import img6 from '../assets/images/V06-A.jpg';

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const images = [
    {
      src: img1,
      alt: "Gallery image 1",
      title: "Outdoor Exercise Area"
    },
    {
      src: img2,
      alt: "Gallery image 2",
      title: "Outdoor Lawn"
    },
    {
      src: img3,
      alt: "Gallery image 3",
      title: "Swimming Pool"
    },
    {
      src: img4,
      alt: "Gallery image 4",
      title: "Lobby Area"
    },
    {
      src: img5,
      alt: "Gallery image 5",
      title: "Lift Lobby"
    },
    {
      src: img6,
      alt: "Gallery image 6",
      title: "Walking Path"
    }
  ];

  const openModal = (index: number) => {
    document.body.style.overflow = 'hidden';
    setActiveImage(index);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setActiveImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (activeImage === null) return;
    
    if (direction === 'prev') {
      setActiveImage(activeImage === 0 ? images.length - 1 : activeImage - 1);
    } else {
      setActiveImage(activeImage === images.length - 1 ? 0 : activeImage + 1);
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-[#1A1815]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Experience <span className="font-bold" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Elaira Residences</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Take a visual journey through our meticulously designed spaces and discover the 
            perfect blend of luxury, comfort, and sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openModal(index)}
            >
              <div className="relative group h-64 sm:h-72 lg:h-80 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {activeImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-[#D26A3B] transition-colors duration-300"
            onClick={closeModal}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-4 text-white hover:text-[#D26A3B] transition-colors duration-300 hidden md:block"
            onClick={() => navigateImage('prev')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute right-4 text-white hover:text-[#D26A3B] transition-colors duration-300 hidden md:block"
            onClick={() => navigateImage('next')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="w-full max-w-4xl">
            <img 
              src={images[activeImage].src} 
              alt={images[activeImage].alt}
              className="max-h-[80vh] w-full object-contain"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{images[activeImage].title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;