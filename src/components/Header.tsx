
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Palette } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white shadow-lg relative overflow-hidden">
      {/* DDR-style pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <Palette className="h-8 w-8 text-yellow-300" />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">DDR Kunstgalerie</h1>
              <p className="text-sm text-yellow-200">Nostalgie in Farbe</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-yellow-300 transition-colors duration-200 font-medium">
              Startseite
            </Link>
            <Link to="/galerie" className="hover:text-yellow-300 transition-colors duration-200 font-medium">
              Galerie
            </Link>
            <Link to="/ueber-uns" className="hover:text-yellow-300 transition-colors duration-200 font-medium">
              Über uns
            </Link>
            <Link to="/kontakt" className="hover:text-yellow-300 transition-colors duration-200 font-medium">
              Kontakt
            </Link>
            <Link to="/warenkorb" className="flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
              <span className="bg-yellow-500 text-red-800 px-2 py-1 rounded-full text-xs font-bold">0</span>
            </Link>
            <Link to="/dashboard" className="bg-yellow-500 text-red-800 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-bold">
              Dashboard
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-red-600 pt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">Startseite</Link>
              <Link to="/galerie" className="hover:text-yellow-300 transition-colors duration-200">Galerie</Link>
              <Link to="/ueber-uns" className="hover:text-yellow-300 transition-colors duration-200">Über uns</Link>
              <Link to="/kontakt" className="hover:text-yellow-300 transition-colors duration-200">Kontakt</Link>
              <Link to="/warenkorb" className="hover:text-yellow-300 transition-colors duration-200">Warenkorb</Link>
              <Link to="/dashboard" className="hover:text-yellow-300 transition-colors duration-200">Dashboard</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
