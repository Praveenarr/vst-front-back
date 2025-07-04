import React from 'react';
import { Instagram, Mail, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <Music className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <div className="text-white font-bold text-xl sm:text-2xl tracking-wider">
              VST <span className="text-yellow-400">Universe</span>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 w-full">
            <a
              href="https://www.instagram.com/vst_universe?igsh=MXJjdmlqNmp3eHh3Ng=="
              className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-base sm:text-lg">instagram</span>
            </a>
            
            <a
              href="mailto:vstuniverse02@gmail.com"
              className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group text-center"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-base sm:text-lg break-all sm:break-normal">vstuniverse02@gmail.com</span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs sm:max-w-md h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

          {/* Copyright */}
          <div className="text-center text-gray-500">
            <p className="text-sm sm:text-base">&copy; 2024 VST Universe. All rights reserved.</p>
            <p className="text-xs sm:text-sm mt-2">Your Ultimate Music Production Destination</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;