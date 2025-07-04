import React, { forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';

const ProductShowcase = forwardRef<HTMLDivElement>((_, ref) => {
  const features = [
    'Music production DAWs',
    'Virtual instruments',
    'Sound libraries',
    'Mixing and mastering plugins',
    'Sound effects libraries',
    'Loops and presets'
  ];

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Your <span className="text-yellow-400">Music Production Hub</span>
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Access a vast library of professional-grade tools and resources:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition duration-300"
            >
              <ChevronRight className="w-5 h-5 text-yellow-400 mt-1 animate-pulse" />
              <p className="text-base text-gray-300">{feature}</p>
            </div>
          ))}
        </div>


          {/* Descriptive Sections */}
          <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8 max-w-3xl mx-auto">
          {/* Library Overview Paragraph */}
          <div className="flex items-start space-x-3">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-bounce mt-1 flex-shrink-0" />
            <p className="text-base sm:text-lg text-gray-300 text-left leading-relaxed">
              <span className="font-semibold text-white block mb-1">Your Music Production Hub</span>
              Access a vast library of professional-grade tools and resources including music production DAWs, virtual instruments, sound libraries, mixing and mastering plugins, sound effects libraries, and a wide variety of loops and presets to enhance your creative workflow.
            </p>
          </div>

          {/* Free Consultation Section */}
          <div className="flex items-start space-x-3">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-bounce mt-1 flex-shrink-0" />
            <p className="text-base sm:text-lg text-gray-300 text-left leading-relaxed">
              Consultation and guidance are provided <span className="text-yellow-400 font-medium">free of charge</span> to help you make an informed decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ProductShowcase;
