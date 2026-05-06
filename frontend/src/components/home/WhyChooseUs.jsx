import { FiStar, FiAward, FiMessageSquare, FiTruck } from 'react-icons/fi';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Multiple Product Categories',
      description: 'Order custom gifts, apparel, branding kits, and more from one streamlined platform.',
      icon: FiAward,
    },
    {
      title: 'Reliable Print Quality',
      description: 'We use quality materials and print processes to keep designs clean, vibrant, and consistent.',
      icon: FiStar,
    },
    {
      title: 'Flexible Personalization',
      description: 'Add names, text, logos, or artwork to match personal, business, and event requirements.',
      icon: FiMessageSquare,
    },
    {
      title: 'Fast Support & Delivery',
      description: 'Quick support and dependable fulfillment for both single-item and bulk custom orders.',
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
