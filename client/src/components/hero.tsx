import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-[#1E3A8A] to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Smart Loan Automation Platform</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Apply, track, and manage loans with zero hassle. Fast, digital, and completely automated for the modern India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => scrollToSection('apply')}
              className="finflow-accent text-white px-8 py-4 text-lg font-semibold hover:bg-green-600 transition-colors duration-200 shadow-lg"
            >
              Start Application <i className="fas fa-arrow-right ml-2"></i>
            </Button>
            <Button 
              onClick={() => scrollToSection('track')}
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-finflow-primary transition-colors duration-200"
            >
              Track Status
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-finflow-accent"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Secure</h3>
              <p className="text-blue-100">Bank-grade security for all your data</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-2xl text-finflow-accent"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">2-Min Process</h3>
              <p className="text-blue-100">Quick application with instant decisions</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl text-finflow-accent"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">50K+ Users</h3>
              <p className="text-blue-100">Trusted by thousands across India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
