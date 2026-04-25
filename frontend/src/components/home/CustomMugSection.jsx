import { Link } from 'react-router-dom';

const CustomMugSection = () => {
  const steps = [
    { number: '01', title: 'Choose Mug', desc: 'Select from our wide range of premium mugs.' },
    { number: '02', title: 'Add Text', desc: 'Personalize with names or special messages.' },
    { number: '03', title: 'Add to Cart', desc: 'Review your order and proceed to checkout.' },
    { number: '04', title: 'WhatsApp Checkout', desc: 'Confirm your order instantly via WhatsApp.' },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Create Your Perfect Custom Mug</h2>
            <p className="text-lg text-text-light mb-8">
              Whether it's a gift for a loved one, a corporate giveaway, or just a treat for yourself, our simple customization process makes it easy to bring your ideas to life.
            </p>
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-secondary font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-primary">{step.title}</h4>
                    <p className="text-text-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/products" className="btn-accent text-lg px-8 py-4">Start Customizing Now</Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[500px]">
              <img 
                src="/src/assets/custom.png" 
                alt="Customization Process" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">The G Store Difference</p>
                  <h3 className="text-2xl font-serif font-bold">Crafted with precision, delivered with love.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomMugSection;
