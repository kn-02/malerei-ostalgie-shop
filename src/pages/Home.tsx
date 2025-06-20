
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { ArrowRight, Award, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-100 to-blue-300 rounded-full blur-2xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-pulse" />
          </motion.div>
          
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-gray-700 via-blue-600 to-blue-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            KUNSTGALERIE
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-gray-700 mb-12 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Exclusive Art Collection
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/galerie"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Kollektion entdecken</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <Link
              to="/story-timeline"
              className="group border-2 border-blue-300 text-blue-700 px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <span className="flex items-center space-x-2">
                <span>Die Geschichte</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-br from-white to-blue-50 relative">
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Exzellenz in <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Kunst</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Authentische Meisterwerke mit garantierter Provenienz und höchster Qualität
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Award,
                title: "Authentizität",
                description: "Jedes Werk wird mit Echtheitszertifikat und dokumentierter Herkunft geliefert",
                gradient: "from-blue-400 to-blue-500"
              },
              {
                icon: Sparkles,
                title: "Meisterhafte Qualität",
                description: "Professionell restaurierte und konservierte Kunstwerke in perfektem Zustand",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Garantierte Sicherheit",
                description: "Versicherter Versand und 30 Tage Rückgaberecht für Ihren sorgenfreien Kauf",
                gradient: "from-blue-400 to-blue-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-blue-200 hover:border-blue-400 transition-all duration-500 hover:transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Ausgewählte <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Meisterwerke</span>
            </h2>
            <p className="text-xl text-gray-600">Entdecken Sie unsere exklusivsten Kunstwerke</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => {
              const imageUrl = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=80`;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => window.location.href = `/produkt/${product.id}`}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-blue-200 hover:border-blue-400 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-xl">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-30" />
                      
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-gray-800">
                          <div className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ArrowRight className="w-8 h-8" />
                          </div>
                          <p className="text-lg font-semibold">Details ansehen</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.year}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-blue-600">€{product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/galerie"
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span>Komplette Kollektion ansehen</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
