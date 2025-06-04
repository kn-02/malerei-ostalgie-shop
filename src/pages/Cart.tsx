
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Arbeiterparadies",
      artist: "Hans Müller",
      price: 850,
      image: "photo-1541961017774-22349e4a1262",
      quantity: 1
    },
    {
      id: 2,
      title: "Brandenburger Tor bei Nacht",
      artist: "Petra Schmidt",
      price: 1200,
      image: "photo-1587330979470-3016b6702d89",
      quantity: 1
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
              <a 
                href="/galerie"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200"
              >
                Zur Galerie
              </a>
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
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex items-center space-x-4">
                        <img 
                          src={`https://images.unsplash.com/${item.image}?w=120&h=120&fit=crop`}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                          style={{ filter: 'sepia(10%) saturate(110%)' }}
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                          <p className="text-red-600 font-medium">von {item.artist}</p>
                          <p className="text-2xl font-bold text-red-700 mt-2">{item.price}€</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
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
                      <span className="font-bold">{subtotal}€</span>
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
                        <span className="font-bold text-red-700">{total}€</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 mb-4">
                    Zur Kasse
                  </button>
                  
                  <div className="text-center">
                    <a 
                      href="/galerie"
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Weiter einkaufen
                    </a>
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
