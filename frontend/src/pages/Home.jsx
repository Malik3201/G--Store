import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryStrip from '../components/home/CategoryStrip';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CustomMugSection from '../components/home/CustomMugSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <CustomMugSection />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
