import { Link } from 'react-router-dom';

const CustomMugSection = () => {
  const steps = [
    { number: '01', title: 'Pick Product Type', desc: 'Select mugs, apparel, accessories, hampers, or branded merchandise.' },
    { number: '02', title: 'Share Design Details', desc: 'Add names, text, logos, or references to match your idea.' },
    { number: '03', title: 'Review & Confirm', desc: 'Approve product details, quantity, and delivery timeline.' },
    { number: '04', title: 'Receive Your Order', desc: 'We produce and deliver your custom products with care.' },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Create Any Custom Product in 4 Steps</h2>
            <p className="text-lg text-text-light mb-8">
              Whether it is a personal gift, event giveaway, or bulk corporate order, our process keeps customization simple and reliable from idea to delivery.
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
              <Link to="/products" className="btn-accent text-lg px-8 py-4">Build Your Order Now</Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" 
                alt="Customization Process" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">The G Store Difference</p>
                  <h3 className="text-2xl font-serif font-bold">Designed with precision, delivered on time.</h3>
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
