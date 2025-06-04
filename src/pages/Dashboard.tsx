
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Edit, Trash2, Upload, Eye, DollarSign, Package, Users } from 'lucide-react';
import { products as initialProducts } from '../data/products';

const Dashboard = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const [newProduct, setNewProduct] = useState({
    title: '',
    artist: '',
    price: '',
    description: '',
    longDescription: '',
    year: '',
    dimensions: '',
    technique: '',
    category: '',
    images: ['']
  });

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
    inStock: products.filter(p => p.inStock).length,
    categories: [...new Set(products.map(p => p.category))].length
  };

  const handleAddProduct = () => {
    const product = {
      ...newProduct,
      id: Math.max(...products.map(p => p.id)) + 1,
      price: parseFloat(newProduct.price),
      year: parseInt(newProduct.year),
      image: newProduct.images[0],
      images: newProduct.images.filter(img => img.trim() !== ''),
      inStock: true
    };
    
    setProducts([...products, product]);
    setNewProduct({
      title: '',
      artist: '',
      price: '',
      description: '',
      longDescription: '',
      year: '',
      dimensions: '',
      technique: '',
      category: '',
      images: ['']
    });
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Sind Sie sicher, dass Sie dieses Kunstwerk löschen möchten?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleStock = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Künstler Dashboard</h1>
          <p className="text-xl text-yellow-200">
            Verwalten Sie Ihre Kunstwerke und überwachen Sie Ihre Verkäufe
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Kunstwerke gesamt</p>
                  <p className="text-3xl font-bold text-blue-800">{stats.totalProducts}</p>
                </div>
                <Package className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Gesamtwert</p>
                  <p className="text-3xl font-bold text-green-800">{stats.totalValue.toLocaleString()}€</p>
                </div>
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Verfügbar</p>
                  <p className="text-3xl font-bold text-yellow-800">{stats.inStock}</p>
                </div>
                <Eye className="h-10 w-10 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Kategorien</p>
                  <p className="text-3xl font-bold text-purple-800">{stats.categories}</p>
                </div>
                <Users className="h-10 w-10 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Kunstwerke verwalten</h2>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Neues Kunstwerk</span>
            </button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-red-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Neues Kunstwerk hinzufügen</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Titel</label>
                  <input 
                    type="text"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Titel des Kunstwerks"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Künstler</label>
                  <input 
                    type="text"
                    value={newProduct.artist}
                    onChange={(e) => setNewProduct({...newProduct, artist: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Name des Künstlers"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Preis (€)</label>
                  <input 
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Preis in Euro"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Jahr</label>
                  <input 
                    type="number"
                    value={newProduct.year}
                    onChange={(e) => setNewProduct({...newProduct, year: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Entstehungsjahr"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Maße</label>
                  <input 
                    type="text"
                    value={newProduct.dimensions}
                    onChange={(e) => setNewProduct({...newProduct, dimensions: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="z.B. 80 x 60 cm"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Technik</label>
                  <input 
                    type="text"
                    value={newProduct.technique}
                    onChange={(e) => setNewProduct({...newProduct, technique: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="z.B. Öl auf Leinwand"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">Kategorie</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Kategorie wählen</option>
                    <option value="Sozialistischer Realismus">Sozialistischer Realismus</option>
                    <option value="Stadtansichten">Stadtansichten</option>
                    <option value="Genremalerei">Genremalerei</option>
                    <option value="Kinder und Jugend">Kinder und Jugend</option>
                    <option value="Architektur">Architektur</option>
                    <option value="Landwirtschaft">Landwirtschaft</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">Kurze Beschreibung</label>
                  <textarea 
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-24"
                    placeholder="Kurze Beschreibung des Kunstwerks"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">Ausführliche Beschreibung</label>
                  <textarea 
                    value={newProduct.longDescription}
                    onChange={(e) => setNewProduct({...newProduct, longDescription: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                    placeholder="Detaillierte Beschreibung, Geschichte und Kontext"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">Bild-IDs (Unsplash)</label>
                  <div className="space-y-2">
                    {newProduct.images.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input 
                          type="text"
                          value={image}
                          onChange={(e) => {
                            const newImages = [...newProduct.images];
                            newImages[index] = e.target.value;
                            setNewProduct({...newProduct, images: newImages});
                          }}
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="z.B. photo-1541961017774-22349e4a1262"
                        />
                        {index === newProduct.images.length - 1 && (
                          <button 
                            onClick={() => setNewProduct({...newProduct, images: [...newProduct.images, '']})}
                            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Verwenden Sie Unsplash Foto-IDs. Das erste Bild wird als Hauptbild verwendet.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Abbrechen
                </button>
                <button 
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200"
                >
                  Kunstwerk hinzufügen
                </button>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kunstwerk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Künstler
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jahr
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={`https://images.unsplash.com/${product.image}?w=60&h=60&fit=crop`}
                            alt={product.title}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.artist}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.price}€
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleStock(product.id)}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.inStock ? 'Verfügbar' : 'Nicht verfügbar'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
