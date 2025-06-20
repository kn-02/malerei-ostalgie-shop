
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ShoppingCart, Heart, Eye, ArrowLeft, ArrowRight, Filter, Grid, List, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useToggleLike, useProductLikes } from '@/hooks/useProductLikes';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ArtworkModalProps {
  artwork: any;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const toggleLike = useToggleLike();
  const { data: likesData } = useProductLikes(artwork?.id?.toString() || '');

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Artikel zum Warenkorb hinzuzufügen');
      return;
    }
    addToCart.mutate({ productId: artwork.id }, {
      onSuccess: () => {
        toast.success('Zum Warenkorb hinzugefügt');
      }
    });
  };

  const handleToggleLike = () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Artikel zu markieren');
      return;
    }
    toggleLike.mutate(artwork.id.toString());
  };

  const handleViewDetails = () => {
    navigate(`/produkt/${artwork.id}`);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft' && hasPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, hasNext, hasPrevious, onNext, onPrevious, onClose]);

  if (!artwork) return null;

  const getImageUrl = (product: any) => {
    if (product.product_images?.length > 0) {
      return `https://images.unsplash.com/${product.product_images[0].image_url}?auto=format&fit=crop&w=800&q=80`;
    }
    return 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80';
  };

  const primaryImage = getImageUrl(artwork);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-2 border-amber-400/30">
        <DialogTitle className="sr-only">
          {artwork.title} - Kunstwerk Details
        </DialogTitle>
        
        {/* Navigation Arrows */}
        {hasPrevious && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-amber-400/20 text-white border border-amber-400/30"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        
        {hasNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-amber-400/20 text-white border border-amber-400/30"
            onClick={onNext}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl border-2 border-amber-400/20 shadow-2xl">
              <img 
                src={primaryImage}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none" />
          </div>
          
          {/* Details Section */}
          <div className="space-y-8 text-white">
            <div className="border-l-4 border-amber-400 pl-6">
              <h2 className="text-4xl font-bold mb-4">{artwork.title}</h2>
              <div className="space-y-3">
                <p className="text-2xl text-amber-400 font-medium">{artwork.artist || 'Unbekannter Künstler'}</p>
                <div className="flex items-center space-x-6 text-lg">
                  <span className="bg-amber-400/20 text-amber-400 px-4 py-2 rounded-full border border-amber-400/30">
                    {artwork.year || 'Jahr unbekannt'}
                  </span>
                  <span className="text-3xl font-bold text-amber-400">
                    €{parseFloat(artwork.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-amber-400">Beschreibung</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {artwork.description || 'Ein Werk aus der Zeit der letzten Diktatur Europas. Jedes Bild erzählt eine Geschichte von Widerstand, Sehnsucht und dem menschlichen Geist, der sich nicht brechen lässt.'}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!artwork.in_stock || addToCart.isPending}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addToCart.isPending ? 'Wird hinzugefügt...' : 'In den Warenkorb'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleToggleLike}
                className={`font-bold px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  likesData?.isLiked 
                    ? 'bg-red-500/20 border-red-400 text-red-400 hover:bg-red-500/30' 
                    : 'border-white/30 text-white hover:border-amber-400 hover:text-amber-400'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${likesData?.isLiked ? 'fill-current' : ''}`} />
                {likesData?.isLiked ? 'Favorit' : 'Favorisieren'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleViewDetails}
                className="border-2 border-white/30 text-white hover:border-amber-400 hover:text-amber-400 font-bold px-6 py-3 rounded-full transition-all duration-300"
              >
                <Eye className="w-5 h-5 mr-2" />
                Details ansehen
              </Button>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-400 ml-2">Meisterwerk</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Gallery = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const [selectedTheme, setSelectedTheme] = useState('alle');
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const themes = ['alle', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filteredProducts = products.filter(product => {
    const matchesTheme = selectedTheme === 'alle' || product.category === selectedTheme;
    return matchesTheme && product.in_stock;
  });

  const getImageUrl = (product: any) => {
    if (product.product_images?.length > 0) {
      return `https://images.unsplash.com/${product.product_images[0].image_url}?auto=format&fit=crop&w=800&q=80`;
    }
    const placeholders = [
      'photo-1541961017774-22349e4a1262',
      'photo-1470813740244-df37b8c1edcb',
      'photo-1469474968028-56623f02e42e',
      'photo-1523712999610-f77fbcfc3843',
      'photo-1500673922987-e212871fec22'
    ];
    const index = product.title.length % placeholders.length;
    return `https://images.unsplash.com/${placeholders[index]}?auto=format&fit=crop&w=800&q=80`;
  };

  const openModal = (artwork: any) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    setIsModalOpen(false);
  };

  const navigateArtwork = (direction: 'next' | 'prev') => {
    if (!selectedArtwork) return;
    
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedArtwork.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex - 1;
    }
    
    if (newIndex >= 0 && newIndex < filteredProducts.length) {
      setSelectedArtwork(filteredProducts[newIndex]);
    }
  };

  const currentIndex = selectedArtwork ? filteredProducts.findIndex(p => p.id === selectedArtwork.id) : -1;
  const hasNext = currentIndex >= 0 && currentIndex < filteredProducts.length - 1;
  const hasPrevious = currentIndex > 0;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Galerie wird geladen...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl text-white mb-4">Fehler beim Laden der Galerie</h1>
          <p className="text-gray-400">{error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-amber-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            GALERIE
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Entdecken Sie unsere exklusive Sammlung authentischer DDR-Kunstwerke
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-black/50 backdrop-blur-sm border-y border-amber-400/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex items-center space-x-3">
                <Filter className="h-6 w-6 text-amber-400" />
                <span className="text-white text-lg font-medium">Filter:</span>
              </div>
              
              {themes.map(theme => (
                <motion.button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTheme === theme
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:border-amber-400 hover:text-amber-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'alle' ? 'Alle Werke' : theme}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">{filteredProducts.length} Kunstwerke</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 mb-4">Keine Kunstwerke gefunden</p>
              <p className="text-gray-500">Versuchen Sie andere Filtereinstellungen</p>
            </div>
          ) : (
            <motion.div 
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 lg:grid-cols-2 gap-12'
              }`}
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => {
                  const primaryImage = getImageUrl(product);
                  
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.02 }}
                      className="group cursor-pointer"
                      onClick={() => openModal(product)}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                        <div className={`${viewMode === 'grid' ? 'aspect-square' : 'aspect-video'} relative overflow-hidden`}>
                          <img 
                            src={primaryImage}
                            alt={product.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-16 h-16 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-8 h-8" />
                              </div>
                              <p className="text-lg font-semibold">Werk betrachten</p>
                            </div>
                          </div>
                          
                          <div className="absolute top-4 right-4 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {product.year || 'N/A'}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                          <p className="text-amber-400 font-medium mb-3">{product.artist || 'Unbekannter Künstler'}</p>
                          {viewMode === 'list' && (
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-amber-400">€{parseFloat(product.price.toString()).toFixed(2)}</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={() => navigateArtwork('next')}
        onPrevious={() => navigateArtwork('prev')}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />

      <Footer />
    </div>
  );
};

export default Gallery;
