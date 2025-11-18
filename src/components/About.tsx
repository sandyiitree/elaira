import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

interface StatItem {
  value: number;
  label: string;
  suffix: string;
}

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  
  const stats: StatItem[] = [
    { value: 5, label: '5.6 Acres Land', suffix: '+' },
    { value: 290, label: 'Luxury Apartments', suffix: '' },
    { value: 34, label: 'Floors', suffix: '' },
    { value: 5, label: 'Star Club House', suffix: '★' }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-[#1A1815]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Welcome to <span className="font-bold" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Elaira Residences</span>
            </h2>
            <div className="w-20 h-1 mb-6" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}></div>
            <p className="text-white/80 mb-6 leading-relaxed">
            The finest homes await you at Elaira Residences, a new luxury community where elegance meets class.
            </p>
            <p className="text-white/80 mb-8 leading-relaxed">
            Thoughtfully designed spaces and exceptional attention to detail make Elaira Residences a place you'll admire and a home you'll truly love.
            </p>
            <a 
              href="#amenities" 
              className="inline-block bg-[#D26A3B] hover:bg-[#B85A2B] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Discover Features
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-[#2A2825] p-6 rounded-lg shadow-lg border border-[#3A3835] transform transition-all duration-500 hover:-translate-y-2 hover:bg-[#3A3835] ${
                  isInView ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-end mb-2">
                  <span
                    style={{
                      background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    <CountUp 
                      end={stat.value} 
                      isInView={isInView} 
                      className="text-4xl md:text-5xl font-bold"
                    />
                  </span>
                  <span className="text-2xl md:text-3xl font-bold" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CountUpProps {
  end: number;
  isInView: boolean;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, isInView, className }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end]);
  
  return <span className={className}>{count}</span>;
};

export default About;