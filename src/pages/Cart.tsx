import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Minus, Trash2, ShoppingBag, Loader } from 'lucide-react';
import { useCart, useUpdateCartItem, useRemoveFromCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Cart = () => {
  const { user } = useAuth();
  const { data: cartItems = [], isLoading, error } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartItem.mutateAsync({ id, quantity: newQuantity });
      toast.success('Menge aktualisiert');
    } catch (error) {
      toast.error('Fehler beim Aktualisieren der Menge');
      console.error(error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeFromCart.mutateAsync(id);
      toast.success('Artikel entfernt');
    } catch (error) {
      toast.error('Fehler beim Entfernen des Artikels');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Anmeldung erforderlich</h1>
            <p className="text-gray-600 mb-8">Bitte melden Sie sich an, um Ihren Warenkorb zu sehen</p>
            <Link 
              to="/auth"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200"
            >
              Anmelden
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Lade Warenkorb...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-gray-600">Fehler beim Laden des Warenkorbs</h1>
          <p className="text-gray-500 mt-4">{error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price.toString()) * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Warenkorb</h1>
          <p className="text-xl text-yellow-200">
            Ihre ausgewählten DDR-Kunstwerke
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Ihr Warenkorb ist leer</h2>
              <p className="text-gray-500 mb-8">Entdecken Sie unsere einzigartige Sammlung von DDR-Kunstwerken</p>
              <Link 
                to="/galerie"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200"
              >
                Zur Galerie
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Artikel im Warenkorb</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => {
                      const primaryImage = item.product.product_images?.find(img => img.is_primary) || item.product.product_images?.[0];
                      const imageUrl = primaryImage 
                        ? `https://images.unsplash.com/${primaryImage.image_url}?w=120&h=120&fit=crop`
                        : `https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=120&h=120&fit=crop`;

                      return (
                        <div key={item.id} className="p-6 flex items-center space-x-4">
                          <img 
                            src={imageUrl}
                            alt={item.product.title}
                            className="w-24 h-24 object-cover rounded-lg"
                            style={{ filter: 'sepia(10%) saturate(110%)' }}
                          />
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800">{item.product.title}</h3>
                            <p className="text-red-600 font-medium">von {item.product.artist}</p>
                            <p className="text-2xl font-bold text-red-700 mt-2">{item.product.price}€</p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100"
                                disabled={updateCartItem.isPending}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100"
                                disabled={updateCartItem.isPending}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                              disabled={removeFromCart.isPending}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Bestellübersicht</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zwischensumme</span>
                      <span className="font-bold">{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Versand</span>
                      <span className="font-bold">
                        {shipping === 0 ? 'Kostenlos' : `${shipping}€`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-sm text-green-600">
                        ✓ Kostenloser Versand ab 500€
                      </p>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Gesamt</span>
                        <span className="font-bold text-red-700">{total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 mb-4">
                    Zur Kasse
                  </button>
                  
                  <div className="text-center">
                    <Link 
                      to="/galerie"
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Weiter einkaufen
                    </Link>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4">Ihre Sicherheit</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span>SSL-verschlüsselte Zahlung</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span>14 Tage Rückgaberecht</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span>Versicherter Versand</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
