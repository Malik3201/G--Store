const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sara Khan',
      role: 'Event Planner',
      quote: 'We ordered custom welcome kits for 120 guests. The quality and delivery timing were excellent.',
    },
    {
      name: 'Usman Ali',
      role: 'Small Business Owner',
      quote: 'Branding merchandise is now easy for us. The team handled our logo placement perfectly.',
    },
    {
      name: 'Hira Fatima',
      role: 'Gift Buyer',
      quote: 'I ordered personalized gifts for my family and everything arrived exactly as requested.',
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Loved by Customers</h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Real feedback from people and teams who trust G Store for their custom product needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-xl border border-gray-100 shadow-sm p-6 bg-background">
              <p className="text-text italic">"{item.quote}"</p>
              <div className="mt-5">
                <p className="font-semibold text-primary">{item.name}</p>
                <p className="text-sm text-text-light">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
