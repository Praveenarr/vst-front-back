import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

interface HeroProps {
  scrollToPricing: () => void;
  scrollToProduct: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToPricing, scrollToProduct }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse block sm:inline">
              VST Universe
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold mb-6 sm:mb-8">
            <span className="text-yellow-400 block sm:inline">Your Ultimate Music</span>
            <br className="hidden sm:block" />
            <span className="text-white block sm:inline">Production Destination</span>
          </h2>

          <div className="flex items-start justify-center mb-8 sm:mb-12">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 mt-1 animate-bounce flex-shrink-0" />
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed text-left sm:text-center">
              Experience the power of a one-stop solution for all your music composition,
              production, and audio post-production software needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={scrollToProduct}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25"
            >
              <span className="flex items-center justify-center">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </button>

            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105"
            >
              View Packages
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-yellow-400 rounded-full mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
