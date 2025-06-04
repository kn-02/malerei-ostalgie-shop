
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageSlideshow from '../components/ImageSlideshow';
import { getProductById } from '../data/products';
import { ShoppingCart, ArrowLeft, Heart, Share2, Ruler, Calendar, Palette } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-gray-600">Kunstwerk nicht gefunden</h1>
          <Link to="/galerie" className="text-red-600 hover:text-red-800 mt-4 inline-block">
            Zurück zur Galerie
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link to="/" className="hover:text-red-600">Startseite</Link>
            <span>/</span>
            <Link to="/galerie" className="hover:text-red-600">Galerie</Link>
            <span>/</span>
            <span className="text-gray-800">{product.title}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Slideshow */}
            <div>
              <ImageSlideshow images={product.images} title={product.title} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Link 
                  to="/galerie"
                  className="inline-flex items-center space-x-2 text-red-600 hover:text-red-800 mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Zurück zur Galerie</span>
                </Link>
                
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <p className="text-xl text-red-600 font-medium">von {product.artist}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg">
                <div className="text-center">
                  <Calendar className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Jahr</p>
                  <p className="font-bold">{product.year}</p>
                </div>
                <div className="text-center">
                  <Ruler className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Maße</p>
                  <p className="font-bold">{product.dimensions}</p>
                </div>
                <div className="text-center">
                  <Palette className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Technik</p>
                  <p className="font-bold">{product.technique}</p>
                </div>
              </div>

              {/* Price and Purchase */}
              <div className="bg-white p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-red-700">{product.price}€</span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {product.inStock ? (
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
                    
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>In den Warenkorb ({(product.price * quantity)}€)</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-red-600 font-bold">Derzeit nicht verfügbar</p>
                    <button className="mt-2 bg-gray-400 text-white py-2 px-6 rounded-lg cursor-not-allowed">
                      Benachrichtigen wenn verfügbar
                    </button>
                  </div>
                )}
              </div>

              {/* Category Badge */}
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                {product.category}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Beschreibung
                </button>
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
                <button 
                  onClick={() => setActiveTab('shipping')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'shipping'
                      ? 'border-red-500 text-red-600'
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
                    {product.longDescription}
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
                      <li><strong>Jahr:</strong> {product.year}</li>
                      <li><strong>Maße:</strong> {product.dimensions}</li>
                      <li><strong>Technik:</strong> {product.technique}</li>
                      <li><strong>Kategorie:</strong> {product.category}</li>
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
