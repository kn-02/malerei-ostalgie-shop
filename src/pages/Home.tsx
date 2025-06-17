import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import AnimatedHero from '../components/AnimatedHero';
import { products } from '../data/products';
import { ArrowRight, Palette, Award, Shield } from 'lucide-react';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Warum DDR Kunstgalerie?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir bieten authentische Kunstwerke mit garantierter Herkunft und professionellem Service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Authentizität</h3>
              <p className="text-gray-600">
                Jedes Gemälde stammt aus der originalen DDR-Zeit und wird mit Echtheitszertifikat geliefert.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-red-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Qualität</h3>
              <p className="text-gray-600">
                Sorgfältig restaurierte und konservierte Kunstwerke in bestem Zustand.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sicherheit</h3>
              <p className="text-gray-600">
                14 Tage Rückgaberecht und sichere Zahlung für Ihren sorgenfreien Kauf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ausgewählte Werke</h2>
            <p className="text-xl text-gray-600">
              Entdecken Sie unsere beliebtesten DDR-Gemälde
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/galerie"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
            >
              <span>Alle Kunstwerke ansehen</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
