import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, Filter, Calendar, Palette, Eye, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Artwork {
  id: string;
  title: string;
  year: number;
  technique: string;
  theme: string;
  image: string;
  description: string;
  artistQuote?: string;
  background: string;
}

const Werke = () => {
  const [selectedTheme, setSelectedTheme] = useState('alle');
  const [selectedYear, setSelectedYear] = useState('alle');
  const [selectedTechnique, setSelectedTechnique] = useState('alle');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const artworks: Artwork[] = [
    {
      id: '1',
      title: 'Beton und Träume',
      year: 1975,
      technique: 'Öl auf Leinwand',
      theme: 'Stadt & Beton',
      image: '/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png',
      description: 'Ein Werk über die Urbanisierung der DDR und die Sehnsucht nach Individualität in standardisierten Wohnblöcken.',
      artistQuote: 'In jedem Betonblock suchte ich nach der menschlichen Seele.',
      background: 'Entstanden während der Zeit des Wohnungsbauprogramms in der DDR.'
    },
    {
      id: '2',
      title: 'Der Arbeiter',
      year: 1980,
      technique: 'Tempera auf Holz',
      theme: 'Porträts der Arbeit',
      image: '/lovable-uploads/9d51a39b-d5c5-404e-a135-356b6d63ed7c.png',
      description: 'Portrait eines Fabrikarbeiters, das die Würde der Arbeit und gleichzeitig die Entfremdung des Individuums zeigt.',
      artistQuote: 'Arbeit sollte den Menschen erheben, nicht unterdrücken.',
      background: 'Gemalt nach langen Besuchen in Industriebetrieben.'
    },
    {
      id: '3',
      title: 'Flucht ins Innere',
      year: 1987,
      technique: 'Mischtechnik',
      theme: 'Kritik & Flucht',
      image: '/lovable-uploads/6b4b9caa-abc7-4569-b88f-fe10c6eb2d1d.png',
      description: 'Ein abstraktes Werk über die innere Emigration vieler DDR-Bürger in den späten 80er Jahren.',
      artistQuote: 'Manchmal war die einzige Freiheit die in unserem Geist.',
      background: 'Entstanden kurz vor der Wende, als Veränderung in der Luft lag.'
    }
  ];

  const themes = ['alle', 'Stadt & Beton', 'Porträts der Arbeit', 'Kritik & Flucht', 'Abstrakte Reflexionen'];
  const years = ['alle', ...Array.from(new Set(artworks.map(a => a.year.toString()))).sort()];
  const techniques = ['alle', ...Array.from(new Set(artworks.map(a => a.technique)))];

  const filteredArtworks = artworks.filter(artwork => {
    return (selectedTheme === 'alle' || artwork.theme === selectedTheme) &&
           (selectedYear === 'alle' || artwork.year.toString() === selectedYear) &&
           (selectedTechnique === 'alle' || artwork.technique === selectedTechnique);
  });

  useEffect(() => {
    // GSAP animations for timeline view
    if (viewMode === 'timeline') {
      gsap.fromTo('.timeline-item', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [viewMode, filteredArtworks]);

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="absolute inset-0 bg-vintage-grain opacity-10" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Werke
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Eine visuelle Reise durch Jahrzehnte künstlerischen Schaffens
          </motion.p>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-8 bg-stone-200 border-b border-red-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-red-800" />
                <span className="font-mono text-sm text-red-800 font-semibold">Filter:</span>
              </div>
              
              <select 
                value={selectedTheme} 
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="px-3 py-2 border border-red-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
              >
                {themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme === 'alle' ? 'Alle Themen' : theme}
                  </option>
                ))}
              </select>

              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-red-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'alle' ? 'Alle Jahre' : year}
                  </option>
                ))}
              </select>

              <select 
                value={selectedTechnique} 
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="px-3 py-2 border border-red-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
              >
                {techniques.map(technique => (
                  <option key={technique} value={technique}>
                    {technique === 'alle' ? 'Alle Techniken' : technique}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-mono transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Palette className="h-4 w-4 inline mr-2" />
                Galerie
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-md text-sm font-mono transition-colors ${
                  viewMode === 'timeline' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Clock className="h-4 w-4 inline mr-2" />
                Zeitlinie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => openModal(artwork)}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-red-300">
                      {/* Paper texture overlay */}
                      <div className="absolute inset-0 bg-vintage-grain opacity-10 pointer-events-none z-10" />
                      
                      <div className="aspect-w-4 aspect-h-3 relative">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                        
                        {/* Vintage grain overlay */}
                        <div className="absolute inset-0 bg-vintage-grain opacity-20 group-hover:opacity-10 transition-opacity duration-500" />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                          >
                            <Eye className="h-8 w-8 text-white" />
                          </motion.div>
                        </div>
                        
                        {/* Year Badge */}
                        <div className="absolute top-3 right-3 bg-red-700 text-yellow-300 px-2 py-1 rounded-full text-xs font-bold font-mono">
                          {artwork.year}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">
                          {artwork.title}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span className="font-mono">{artwork.year}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Palette className="h-4 w-4" />
                            <span className="font-mono">{artwork.technique}</span>
                          </div>
                        </div>
                        <div className="mt-3 px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full inline-block font-mono">
                          {artwork.theme}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                className="timeline-container space-y-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredArtworks
                  .sort((a, b) => a.year - b.year)
                  .map((artwork, index) => (
                    <div 
                      key={artwork.id}
                      className={`timeline-item flex flex-col lg:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      <div className="lg:w-1/2">
                        <div 
                          className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                          onClick={() => openModal(artwork)}
                        >
                          <img 
                            src={artwork.image} 
                            alt={artwork.title}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        </div>
                      </div>
                      
                      <div className="lg:w-1/2 space-y-4">
                        <div className="text-6xl font-bold text-red-700 font-mono">
                          {artwork.year}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 font-serif">
                          {artwork.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-mono">
                          {artwork.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-3 py-1 rounded-full font-mono">
                            {artwork.technique}
                          </span>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-mono">
                            {artwork.theme}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal for Artwork Details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-stone-50 to-amber-50 border-2 border-red-800">
          {selectedArtwork && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative">
                <img 
                  src={selectedArtwork.image} 
                  alt={selectedArtwork.title}
                  className="w-full h-auto rounded-lg filter sepia-[15%] saturate-[120%] contrast-[110%] brightness-[95%]"
                />
                {/* Vintage grain overlay */}
                <div className="absolute inset-0 bg-vintage-grain opacity-20 rounded-lg pointer-events-none" />
              </div>
              
              <div className="space-y-6 font-mono">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
                    {selectedArtwork.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-mono">{selectedArtwork.year}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Palette className="h-4 w-4" />
                      <span className="font-mono">{selectedArtwork.technique}</span>
                    </span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-mono">
                    {selectedArtwork.theme}
                  </span>
                </div>
                
                <div className="prose prose-gray">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-mono">Beschreibung</h3>
                  <p className="text-gray-700 leading-relaxed font-mono">
                    {selectedArtwork.description}
                  </p>
                </div>
                
                <div className="prose prose-gray">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-mono">Hintergrund</h3>
                  <p className="text-gray-700 leading-relaxed font-mono">
                    {selectedArtwork.background}
                  </p>
                </div>
                
                {selectedArtwork.artistQuote && (
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-700">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 font-mono">Künstlerin über das Werk</h3>
                    <p className="text-gray-700 italic font-serif">"{selectedArtwork.artistQuote}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Werke;
