
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-900 via-red-800 to-red-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-300">DDR Kunstgalerie</h3>
            <p className="text-red-100">
              Authentische DDR-Gemälde und Nostalgie-Kunst. 
              Erleben Sie die Geschichte durch Farbe und Form.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-300">Navigation</h4>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-yellow-300 transition-colors duration-200">Startseite</Link>
              <Link to="/galerie" className="block hover:text-yellow-300 transition-colors duration-200">Galerie</Link>
              <Link to="/ueber-uns" className="block hover:text-yellow-300 transition-colors duration-200">Über uns</Link>
              <Link to="/kontakt" className="block hover:text-yellow-300 transition-colors duration-200">Kontakt</Link>
            </div>
          </div>
          
          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-300">Rechtliches</h4>
            <div className="space-y-2">
              <Link to="/impressum" className="block hover:text-yellow-300 transition-colors duration-200">Impressum</Link>
              <Link to="/datenschutz" className="block hover:text-yellow-300 transition-colors duration-200">Datenschutz</Link>
              <Link to="/agb" className="block hover:text-yellow-300 transition-colors duration-200">AGB</Link>
              <Link to="/widerruf" className="block hover:text-yellow-300 transition-colors duration-200">Widerrufsrecht</Link>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-300">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-300" />
                <span className="text-sm">info@ddr-kunstgalerie.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-300" />
                <span className="text-sm">+49 30 12345678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-300" />
                <span className="text-sm">Berlin, Deutschland</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-red-600 mt-8 pt-8 text-center">
          <p className="text-red-200">&copy; 2024 DDR Kunstgalerie. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
