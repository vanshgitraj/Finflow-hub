import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAgentLoginClick: () => void;
}

export default function Header({ onAgentLoginClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-chart-line text-finflow-primary text-2xl mr-3"></i>
              <h1 className="text-xl font-bold text-finflow-primary">FinFlow Hub</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-600 hover:text-finflow-primary transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-finflow-primary transition-colors duration-200 font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('apply')}
              className="text-gray-600 hover:text-finflow-primary transition-colors duration-200 font-medium"
            >
              Apply
            </button>
            <button 
              onClick={() => scrollToSection('track')}
              className="text-gray-600 hover:text-finflow-primary transition-colors duration-200 font-medium"
            >
              Track
            </button>
            <button 
              onClick={() => scrollToSection('cibil')}
              className="text-gray-600 hover:text-finflow-primary transition-colors duration-200 font-medium"
            >
              CIBIL Score
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-finflow-primary transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onAgentLoginClick}
              className="text-finflow-primary hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Agent Login
            </button>
            <Button 
              onClick={() => scrollToSection('apply')}
              className="finflow-primary text-white hover:bg-blue-800 transition-colors duration-200 font-medium"
            >
              Apply Now
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-finflow-primary"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <button 
              onClick={() => scrollToSection('home')}
              className="block text-gray-600 hover:text-finflow-primary font-medium w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block text-gray-600 hover:text-finflow-primary font-medium w-full text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('apply')}
              className="block text-gray-600 hover:text-finflow-primary font-medium w-full text-left"
            >
              Apply
            </button>
            <button 
              onClick={() => scrollToSection('track')}
              className="block text-gray-600 hover:text-finflow-primary font-medium w-full text-left"
            >
              Track
            </button>
            <button 
              onClick={() => scrollToSection('cibil')}
              className="block text-gray-600 hover:text-finflow-primary font-medium w-full text-left"
            >
              CIBIL Score
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block text-gray-600 hover:text-finflow-primary font-medium w-full text-left"
            >
              Contact
            </button>
            <hr className="my-3" />
            <button 
              onClick={() => {
                onAgentLoginClick();
                setIsMobileMenuOpen(false);
              }}
              className="block text-finflow-primary font-medium w-full text-left"
            >
              Agent Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
