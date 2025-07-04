import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import PricingSection from './components/PricingSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import { useRef } from 'react';

function App() {
  const productRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToProductShowcase = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero
          scrollToPricing={scrollToPricing}
          scrollToProduct={scrollToProductShowcase}
        />
        <div ref={productRef}>
          <ProductShowcase />
        </div>
        <div ref={pricingRef}>
          <PricingSection />
        </div>
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
