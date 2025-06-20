
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageSlideshow from '../components/ImageSlideshow';
import { useProduct } from '../hooks/useProducts';
import { useAddToCart } from '../hooks/useCart';
import { useProductLikes, useToggleLike } from '../hooks/useProductLikes';
import { useAuth } from '../hooks/useAuth';
import { ShoppingCart, ArrowLeft, Heart, Share2, Ruler, Calendar, Palette, Loader } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const { data: product, isLoading, error } = useProduct(id!);
  const { data: likesData } = useProductLikes(id!);
  const { user } = useAuth();
  const addToCart = useAddToCart();
  const toggleLike = useToggleLike();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Artikel zum Warenkorb hinzuzufügen');
      return;
    }

    if (!product) return;

    try {
      await addToCart.mutateAsync({ productId: product.id, quantity });
      toast.success(`${quantity} Artikel zum Warenkorb hinzugefügt`);
    } catch (error) {
      toast.error('Fehler beim Hinzufügen zum Warenkorb');
      console.error(error);
    }
  };

  const handleToggleLike = async () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Artikel zu liken');
      return;
    }

    if (!product) return;

    try {
      const result = await toggleLike.mutateAsync(product.id);
      toast.success(result.liked ? 'Artikel geliked' : 'Like entfernt');
    } catch (error) {
      toast.error('Fehler beim Liken');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Lade Kunstwerk...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-gray-600">Kunstwerk nicht gefunden</h1>
          <Link to="/galerie" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Zurück zur Galerie
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.product_images?.map(img => 
    `https://images.unsplash.com/${img.image_url}?w=800&h=600&fit=crop`
  ) || [`https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop`];

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link to="/" className="hover:text-blue-600">Startseite</Link>
            <span>/</span>
            <Link to="/galerie" className="hover:text-blue-600">Galerie</Link>
            <span>/</span>
            <span className="text-gray-800">{product.title}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <ImageSlideshow images={images} title={product.title} />
            </div>

            <div className="space-y-6">
              <div>
                <Link 
                  to="/galerie"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Zurück zur Galerie</span>
                </Link>
                
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <p className="text-xl text-blue-600 font-medium">von {product.artist}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg">
                <div className="text-center">
                  <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Jahr</p>
                  <p className="font-bold">{product.year || 'Unbekannt'}</p>
                </div>
                <div className="text-center">
                  <Ruler className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Maße</p>
                  <p className="font-bold">{product.dimensions || 'Nicht angegeben'}</p>
                </div>
                <div className="text-center">
                  <Palette className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Technik</p>
                  <p className="font-bold">{product.technique || 'Nicht angegeben'}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-700">{product.price}€</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={handleToggleLike}
                      className={`p-2 border border-gray-300 rounded-lg transition-colors ${
                        likesData?.isLiked 
                          ? 'bg-red-500 text-white border-red-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${likesData?.isLiked ? 'fill-current' : 'text-gray-600'}`} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {likesData && likesData.totalLikes > 0 && (
                  <div className="mb-4 text-sm text-gray-600">
                    {likesData.totalLikes} {likesData.totalLikes === 1 ? 'Person gefällt' : 'Personen gefällt'} dieses Kunstwerk
                  </div>
                )}

                {product.in_stock ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-gray-700 font-medium">Anzahl:</label>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>In den Warenkorb ({(parseFloat(product.price.toString()) * quantity).toFixed(2)}€)</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-blue-600 font-bold">Derzeit nicht verfügbar</p>
                    <button className="mt-2 bg-gray-400 text-white py-2 px-6 rounded-lg cursor-not-allowed">
                      Benachrichtigen wenn verfügbar
                    </button>
                  </div>
                )}
              </div>

              {product.category && (
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {product.category}
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="border-b border-blue-200">
              <nav className="flex space-x-8">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Beschreibung
                </button>
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
                <button 
                  onClick={() => setActiveTab('shipping')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'shipping'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Versand & Rückgabe
                </button>
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {product.long_description || product.description || 'Keine Beschreibung verfügbar.'}
                  </p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Kunstwerk-Details</h3>
                    <ul className="space-y-2">
                      <li><strong>Titel:</strong> {product.title}</li>
                      <li><strong>Künstler:</strong> {product.artist}</li>
                      <li><strong>Jahr:</strong> {product.year || 'Unbekannt'}</li>
                      <li><strong>Maße:</strong> {product.dimensions || 'Nicht angegeben'}</li>
                      <li><strong>Technik:</strong> {product.technique || 'Nicht angegeben'}</li>
                      <li><strong>Kategorie:</strong> {product.category || 'Nicht kategorisiert'}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Authentizität</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Originalgemälde aus der DDR-Zeit</li>
                      <li>✓ Echtheitszertifikat inklusive</li>
                      <li>✓ Professionell restauriert</li>
                      <li>✓ Dokumentierte Provenienz</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Versand</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Kostenloser Versand innerhalb Deutschlands</li>
                      <li>• Versicherter Versand mit Kunsttransport</li>
                      <li>• Lieferzeit: 5-7 Werktage</li>
                      <li>• Internationale Lieferung auf Anfrage</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Rückgabe</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 14 Tage Rückgaberecht</li>
                      <li>• Kunstwerk muss unversehrt sein</li>
                      <li>• Originalverpackung erforderlich</li>
                      <li>• Rücksendekosten trägt der Käufer</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
