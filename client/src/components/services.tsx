export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = [
    {
      icon: "fas fa-user",
      title: "Personal Loan",
      description: "Quick personal loans for your immediate needs. No collateral required.",
      features: ["Up to ₹5 Lakhs", "Interest from 10.99%", "Tenure up to 5 years"]
    },
    {
      icon: "fas fa-home",
      title: "Home Loan",
      description: "Make your dream home a reality with our competitive home loan rates.",
      features: ["Up to ₹2 Crores", "Interest from 8.75%", "Tenure up to 30 years"]
    },
    {
      icon: "fas fa-briefcase",
      title: "Business Loan",
      description: "Fuel your business growth with our flexible business loan options.",
      features: ["Up to ₹50 Lakhs", "Interest from 12.99%", "Tenure up to 7 years"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Loan Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of loan products designed for every need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div className="bg-finflow-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className={`${service.icon} text-2xl text-finflow-primary`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="text-sm text-gray-500 space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <i className="fas fa-check text-finflow-accent mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => scrollToSection('apply')}
                className="text-finflow-primary font-semibold hover:text-blue-800 transition-colors duration-200"
              >
                Apply Now <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
