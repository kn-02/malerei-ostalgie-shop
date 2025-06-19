
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ShoppingCart, Heart, Eye, ArrowLeft, ArrowRight, Filter } from 'lucide-react';
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

  // Handle image display with fallback for products without images
  const getImageUrl = (product: any) => {
    if (product.product_images?.length > 0) {
      return `https://images.unsplash.com/${product.product_images[0].image_url}?auto=format&fit=crop&w=800&q=80`;
    }
    // Use a placeholder image for products without images (like testkunst)
    return 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80';
  };

  const primaryImage = getImageUrl(artwork);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-stone-50 to-amber-50 border-2 border-red-800">
        <DialogTitle className="sr-only">
          {artwork.title} - Kunstwerk Details
        </DialogTitle>
        
        <div className="absolute inset-0 bg-vintage-grain opacity-5 pointer-events-none" />
        
        {/* Navigation Arrows */}
        {hasPrevious && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        
        {hasNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white"
            onClick={onNext}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg border-4 border-red-900/20 shadow-2xl">
              <img 
                src={primaryImage}
                alt={artwork.title}
                className="w-full h-full object-cover filter sepia-[15%] saturate-[120%] contrast-[110%] brightness-[95%]"
              />
            </div>
            {/* Vintage grain overlay */}
            <div className="absolute inset-0 bg-vintage-grain opacity-20 rounded-lg pointer-events-none" />
            {/* Typewriter overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none" />
          </div>
          
          {/* Details Section */}
          <div className="space-y-6 font-mono">
            <div className="border-l-4 border-red-800 pl-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
                {artwork.title}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p className="text-lg font-mono">{artwork.year || 'Jahr unbekannt'}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    {artwork.category || 'Unbekannte Kategorie'}
                  </span>
                  <span className="text-2xl font-bold text-red-800">
                    €{parseFloat(artwork.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 font-mono">Beschreibung</h3>
              <div className="bg-stone-100 p-4 rounded-lg border border-stone-300">
                <p className="text-gray-700 leading-relaxed">
                  {artwork.description || 'Ein Werk aus der Zeit der letzten Diktatur Europas. Jedes Bild erzählt eine Geschichte von Widerstand, Sehnsucht und dem menschlichen Geist, der sich nicht brechen lässt.'}
                </p>
              </div>
            </div>
            
            {/* Artist Quote */}
            <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-4 rounded-lg border-l-4 border-red-700">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 font-mono">Künstlerin über das Werk</h3>
              <p className="text-gray-700 italic font-serif">
                "In jedem Pinselstrich suchte ich nach der Wahrheit, die uns verschwiegen wurde. Diese Bilder sind Zeugen einer Zeit, die niemals vergessen werden darf."
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!artwork.in_stock || addToCart.isPending}
                className="bg-red-800 hover:bg-red-900 text-white font-mono"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {addToCart.isPending ? 'Wird hinzugefügt...' : 'In den Warenkorb'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleToggleLike}
                className={`font-mono border-2 ${
                  likesData?.isLiked 
                    ? 'bg-red-100 border-red-300 text-red-800' 
                    : 'border-gray-300 hover:border-red-300'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${likesData?.isLiked ? 'fill-current' : ''}`} />
                {likesData?.isLiked ? 'Favorit' : 'Favorisieren'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleViewDetails}
                className="font-mono border-2 border-gray-300 hover:border-red-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Details ansehen
              </Button>
            </div>
            
            {/* Stock Status */}
            {!artwork.in_stock && (
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                <p className="text-gray-600 font-mono text-sm">
                  Derzeit nicht verfügbar
                </p>
              </div>
            )}
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

  // Define themes based on categories in the data
  const themes = ['alle', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filteredProducts = products.filter(product => {
    const matchesTheme = selectedTheme === 'alle' || product.category === selectedTheme;
    return matchesTheme && product.in_stock;
  });

  // Helper function to get image URL with fallback
  const getImageUrl = (product: any) => {
    if (product.product_images?.length > 0) {
      return `https://images.unsplash.com/${product.product_images[0].image_url}?auto=format&fit=crop&w=800&q=80`;
    }
    // Use different placeholder images based on product title or category
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

  // Lock scroll when modal is open
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
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-100">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 font-mono">Galerie wird geladen...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-100">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-gray-600 font-mono">Fehler beim Laden der Galerie</h1>
          <p className="text-gray-500 mt-4">{error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-gray-800 via-red-900 to-amber-800">
        <div className="absolute inset-0 bg-vintage-grain opacity-20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-white font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bilder aus Beton
          </motion.h1>
          <motion.p
            className="text-xl text-amber-200 max-w-3xl mx-auto font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Werke aus der letzten Diktatur Europas – Eine visuelle Chronik von Widerstand, 
            Sehnsucht und dem unbeugsamen menschlichen Geist
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-stone-200 border-b border-red-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-red-800" />
              <span className="font-mono text-sm text-red-800 font-semibold">Themen:</span>
            </div>
            
            {themes.map(theme => (
              <motion.button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                  selectedTheme === theme
                    ? 'bg-red-800 text-white shadow-lg'
                    : 'bg-white text-red-800 border-2 border-red-200 hover:border-red-400 hover:bg-red-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'alle' ? 'Alle Werke' : theme}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 font-mono">
              {filteredProducts.length} Kunstwerke
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4 font-mono">Keine Kunstwerke gefunden</p>
              <p className="text-gray-500">Versuchen Sie andere Filtereinstellungen</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => openModal(product)}
                    >
                      <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-300">
                        {/* Paper texture overlay */}
                        <div className="absolute inset-0 bg-vintage-grain opacity-10 pointer-events-none z-10" />
                        
                        <div className="aspect-square relative overflow-hidden">
                          <motion.img 
                            src={primaryImage}
                            alt={product.title}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          
                          {/* Vintage grain overlay */}
                          <div className="absolute inset-0 bg-vintage-grain opacity-20 group-hover:opacity-10 transition-opacity duration-500" />
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-lg font-bold font-serif mb-1">{product.title}</h3>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-mono">{product.year || 'Jahr unbekannt'}</span>
                                <span className="text-lg font-bold">€{parseFloat(product.price.toString()).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-30">
                            <span className="bg-red-800 text-white px-3 py-1 rounded-full text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {product.category}
                            </span>
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
