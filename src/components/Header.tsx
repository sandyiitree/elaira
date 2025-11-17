import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1A1815]/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold flex items-center">
            <img 
              src={logo}
              alt="Elaira Residences Logo" 
              className={`h-10 w-auto transition-all duration-300 ${isScrolled ? '' : ''}`} 
              style={{ maxHeight: isScrolled ? '40px' : '56px', transition: 'max-height 0.3s' }}
            />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Gallery', 'Amenities', 'Location', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`font-medium transition-colors duration-300 hover:text-[#D26A3B] ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={`h-6 w-6 text-white`} />
          ) : (
            <Menu className={`h-6 w-6 text-white`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-[#1A1815]/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-4">
            {['Home', 'About', 'Gallery', 'Amenities', 'Location', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="font-medium text-white hover:text-[#D26A3B] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;