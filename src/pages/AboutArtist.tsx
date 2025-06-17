
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Calendar, Palette, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutArtist = () => {
  const [activeTab, setActiveTab] = useState('stadt');

  const themes = {
    stadt: {
      title: 'Stadt & Beton',
      description: 'Urbane Landschaften und die Architektur des sozialistischen Realismus',
      color: 'from-gray-600 to-gray-800',
      icon: <Map className="h-6 w-6" />
    },
    portraits: {
      title: 'Porträts der Arbeit',
      description: 'Menschen in ihrer alltäglichen Arbeit und ihrem gesellschaftlichen Kontext',
      color: 'from-red-700 to-red-900',
      icon: <Palette className="h-6 w-6" />
    },
    kritik: {
      title: 'Kritik & Flucht',
      description: 'Subtile Gesellschaftskritik und Sehnsucht nach Freiheit',
      color: 'from-yellow-700 to-yellow-900',
      icon: <ArrowRight className="h-6 w-6" />
    },
    abstrakt: {
      title: 'Abstrakte Reflexionen',
      description: 'Emotionale Landschaften jenseits der sichtbaren Realität',
      color: 'from-red-800 to-yellow-800',
      icon: <Calendar className="h-6 w-6" />
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section with Blurred Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{
            backgroundImage: `url('/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png')`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Die Künstlerin
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Eine Reise durch vier Jahrzehnte künstlerischen Schaffens in der DDR. 
            Ihre Werke erzählen Geschichten von Hoffnung, Widerstand und der 
            menschlichen Sehnsucht nach Ausdruck und Freiheit.
          </motion.p>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link 
              to="/werke"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-red-800 px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Werke entdecken</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Thematic Tabs Section */}
      <section className="py-20 bg-gradient-to-b from-gray-200 to-gray-300">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-16 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Künstlerische Themenwelten
          </motion.h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === key 
                    ? 'bg-red-700 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme.icon}
                <span className="font-mono text-sm">{theme.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`bg-gradient-to-r ${themes[activeTab].color} p-8 rounded-lg text-white`}>
                <h3 className="text-3xl font-bold mb-4 font-serif">
                  {themes[activeTab].title}
                </h3>
                <p className="text-lg leading-relaxed">
                  {themes[activeTab].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-serif">
                Ein Leben für die Kunst
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Geboren in den 1940er Jahren, erlebte sie die gesamte Geschichte 
                  der DDR als Künstlerin. Ihre Werke spiegeln nicht nur persönliche 
                  Erfahrungen wider, sondern auch die kollektive Erinnerung einer Generation.
                </p>
                <p>
                  Durch subtile Symbolik und meisterhafte Technik schuf sie Werke, 
                  die sowohl den Zeitgeist einfingen als auch zeitlose menschliche 
                  Erfahrungen thematisierten.
                </p>
                <p>
                  Ihre Kunst war Zeugnis und Widerstand zugleich - eine stille 
                  Revolution auf der Leinwand, die heute mehr denn je an Bedeutung gewinnt.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-red-100 to-yellow-100 p-8 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-red-700" />
                    <span className="font-mono text-red-700">1940er - 2000er</span>
                  </div>
                  <div className="border-l-4 border-red-700 pl-4">
                    <h3 className="font-bold text-gray-800 mb-2">Künstlerische Laufbahn</h3>
                    <p className="text-gray-600">
                      Über 60 Jahre kreatives Schaffen in der DDR und darüber hinaus
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-800 via-red-700 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-8 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Entdecken Sie ihre Werke
          </motion.h2>
          
          <motion.p
            className="text-xl text-yellow-200 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tauchen Sie ein in die faszinierende Welt ihrer Kunstwerke und 
            erleben Sie Geschichte durch die Augen einer außergewöhnlichen Künstlerin.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/werke"
              className="inline-flex items-center space-x-2 bg-white text-red-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Zur Werksammlung</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutArtist;
