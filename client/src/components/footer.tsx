import { Link } from "wouter";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="finflow-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <i className="fas fa-chart-line text-2xl mr-3"></i>
              <h3 className="text-xl font-bold">FinFlow Hub</h3>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Your trusted partner for smart loan automation. We make financial services accessible, fast, and transparent for everyone.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-white bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-20 transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-20 transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-20 transition-colors duration-200">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-20 transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('apply')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Apply for Loan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('track')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Track Application
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('cibil')}
                  className="hover:text-white transition-colors duration-200"
                >
                  CIBIL Score Check
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors duration-200">Legal Disclaimer</Link></li>
              <li><Link href="/nbfc-license" className="hover:text-white transition-colors duration-200">NBFC License</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p className="text-blue-100">&copy; 2025 FinFlow Hub. All rights reserved. | Designed with ❤️ for India</p>
        </div>
      </div>
    </footer>
  );
}
