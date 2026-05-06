const FAQ = () => {
  const faqs = [
    { q: 'How do custom orders work?', a: 'Choose a product, share your design details, and place your order.' },
    { q: 'Can I place bulk orders?', a: 'Yes. We support bulk custom orders for events, teams, and businesses.' },
    { q: 'Do you support logo printing?', a: 'Yes, logo-based customization is available on selected products.' },
  ];

  return (
    <section className="bg-background py-16 min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">Frequently Asked Questions</h1>
        <div className="space-y-5">
          {faqs.map((item) => (
            <article key={item.q} className="bg-white border border-gray-100 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-primary">{item.q}</h2>
              <p className="text-text mt-2">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
