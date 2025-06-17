
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AuthButton from './AuthButton';
import CartIcon from './CartIcon';
import { useIsAdmin } from '@/hooks/useUserRole';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = useIsAdmin();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            <span className="text-yellow-300">DDR</span>
            <span>Kunst</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-yellow-300 transition-colors">
              Startseite
            </Link>
            <Link to="/galerie" className="hover:text-yellow-300 transition-colors">
              Galerie
            </Link>
            <Link to="/ueber-uns" className="hover:text-yellow-300 transition-colors">
              Über uns
            </Link>
            <Link to="/kontakt" className="hover:text-yellow-300 transition-colors">
              Kontakt
            </Link>
            {isAdmin && (
              <Link to="/dashboard" className="hover:text-yellow-300 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side - Auth and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <CartIcon />
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-red-600">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-yellow-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Startseite
              </Link>
              <Link 
                to="/galerie" 
                className="hover:text-yellow-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Galerie
              </Link>
              <Link 
                to="/ueber-uns" 
                className="hover:text-yellow-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Über uns
              </Link>
              <Link 
                to="/kontakt" 
                className="hover:text-yellow-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </Link>
              {isAdmin && (
                <Link 
                  to="/dashboard" 
                  className="hover:text-yellow-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-red-600">
                <CartIcon />
                <AuthButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
