const Contact = () => {
  return (
    <section className="bg-white py-16 min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-primary mb-6">Contact Us</h1>
        <p className="text-text mb-3">Need help with a custom order or bulk quote? Reach us using the details below.</p>
        <div className="space-y-3 text-text">
          <p><span className="font-semibold text-primary">Email:</span> support@gstore.pk</p>
          <p><span className="font-semibold text-primary">Phone:</span> +92 300 1234567</p>
          <p><span className="font-semibold text-primary">Business Hours:</span> Mon - Sat, 10:00 AM to 7:00 PM</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
