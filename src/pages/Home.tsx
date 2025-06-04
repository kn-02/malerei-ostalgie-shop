
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { ArrowRight, Palette, Award, Shield } from 'lucide-react';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section mit Parallax-Effekt */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.7), rgba(184, 134, 11, 0.7)), url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop')`
          }}
        ></div>
        
        {/* DDR-style geometric overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffff00' fill-opacity='0.4'%3E%3Cpath d='M30 30l15-15v30l-15-15zm0 0l-15 15h30l-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            DDR Kunstgalerie
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-yellow-200">
            Authentische Gemälde aus der Zeit der Deutschen Demokratischen Republik
          </p>
          <p className="text-lg mb-10 text-gray-200 max-w-2xl mx-auto">
            Entdecken Sie eine einzigartige Sammlung von Originalgemälden, die das Leben, 
            die Kultur und die Hoffnungen einer ganzen Generation widerspiegeln.
          </p>
          <Link 
            to="/galerie"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-red-800 px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Galerie entdecken</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

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
