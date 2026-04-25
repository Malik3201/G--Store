import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-secondary sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-serif font-bold text-primary sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Personalized Mugs</span>{' '}
                <span className="block text-accent xl:inline">Made for Every Moment</span>
              </h1>
              <p className="mt-3 text-base text-text sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create unforgettable memories with our premium custom printed mugs. Perfect for gifts, corporate events, or your morning coffee routine. Add your name, text, or select from our beautiful templates.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/products" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-hover md:py-4 md:text-lg transition-colors">
                    Shop Mugs
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/products" className="w-full flex items-center justify-center px-8 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary hover:text-white md:py-4 md:text-lg transition-colors">
                    Customize Yours
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex justify-center items-center p-8 lg:p-12">
        <div className="relative w-full h-full max-w-lg aspect-square">
           <img 
             src="/src/assets/hero.png" 
             alt="Premium Personalized Mug" 
             className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
           />
           {/* Decorative elements */}
           <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent opacity-20 rounded-full blur-2xl"></div>
           <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
