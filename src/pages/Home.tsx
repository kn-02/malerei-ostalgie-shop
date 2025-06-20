
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { ArrowRight, Star, Award, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-2xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-6 animate-pulse" />
          </motion.div>
          
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-amber-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            KUNSTGALERIE
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Exclusive DDR Art Collection
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/galerie"
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Kollektion entdecken</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <Link
              to="/story-timeline"
              className="group border-2 border-white/30 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:border-amber-400 hover:bg-amber-400/10 hover:shadow-lg"
            >
              <span className="flex items-center space-x-2">
                <span>Die Geschichte</span>
                <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-amber-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 to-slate-900 relative">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Exzellenz in <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Kunst</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Authentische Meisterwerke mit garantierter Provenienz und höchster Qualität
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Award,
                title: "Authentizität",
                description: "Jedes Werk wird mit Echtheitszertifikat und dokumentierter Herkunft geliefert",
                gradient: "from-amber-400 to-yellow-500"
              },
              {
                icon: Sparkles,
                title: "Meisterhafte Qualität",
                description: "Professionell restaurierte und konservierte Kunstwerke in perfektem Zustand",
                gradient: "from-purple-400 to-pink-500"
              },
              {
                icon: Shield,
                title: "Garantierte Sicherheit",
                description: "Versicherter Versand und 30 Tage Rückgaberecht für Ihren sorgenfreien Kauf",
                gradient: "from-blue-400 to-cyan-500"
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
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-black" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ausgewählte <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Meisterwerke</span>
            </h2>
            <p className="text-xl text-gray-400">Entdecken Sie unsere exklusivsten Kunstwerke</p>
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
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ArrowRight className="w-8 h-8" />
                          </div>
                          <p className="text-lg font-semibold">Details ansehen</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {product.year}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
                      <p className="text-amber-400 font-medium mb-3">{product.artist}</p>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-amber-400">€{product.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-1 text-amber-400">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                        </div>
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
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
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
