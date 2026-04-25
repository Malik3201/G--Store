import { FiStar, FiAward, FiMessageSquare, FiTruck } from 'react-icons/fi';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Premium Ceramic Quality',
      description: 'Our mugs are crafted from high-grade ceramic, ensuring durability and a premium feel in your hands.',
      icon: FiAward,
    },
    {
      title: 'Long Lasting Print',
      description: 'Advanced sublimation printing guarantees vibrant colors that will never fade, even after hundreds of washes.',
      icon: FiStar,
    },
    {
      title: 'Custom Name Printing',
      description: 'Make it uniquely yours or create the perfect personalized gift by adding custom names or text.',
      icon: FiMessageSquare,
    },
    {
      title: 'Easy WhatsApp Order',
      description: 'Checkout seamlessly through our automated WhatsApp system for a quick and personal shopping experience.',
      icon: FiTruck,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Why Choose G Store?</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="text-3xl text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{reason.title}</h3>
                <p className="text-text-light">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
