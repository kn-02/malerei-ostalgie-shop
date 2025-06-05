
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Edit, Trash2, Upload, Eye, DollarSign, Package, Users } from 'lucide-react';
import { useProducts, useCreateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useUserRole';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    artist: '',
    price: '',
    description: '',
    long_description: '',
    year: '',
    dimensions: '',
    technique: '',
    category: '',
    images: ['']
  });

  // Redirect if not authenticated or not admin
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Zugriff verweigert</h1>
            <p className="text-gray-600 mb-8">Sie haben keine Berechtigung, auf das Dashboard zuzugreifen</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + parseFloat(p.price.toString()), 0),
    inStock: products.filter(p => p.in_stock).length,
    categories: [...new Set(products.map(p => p.category).filter(Boolean))].length
  };

  const handleAddProduct = async () => {
    try {
      const productData = {
        title: newProduct.title,
        artist: newProduct.artist,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        long_description: newProduct.long_description,
        year: newProduct.year ? parseInt(newProduct.year) : null,
        dimensions: newProduct.dimensions || null,
        technique: newProduct.technique || null,
        category: newProduct.category || null,
        in_stock: true
      };

      const product = await createProduct.mutateAsync(productData);
      
      // Add product images if provided
      if (newProduct.images.length > 0 && newProduct.images[0].trim()) {
        // You would implement image creation here using a separate hook
        // For now, we'll just create the product
      }
      
      setNewProduct({
        title: '',
        artist: '',
        price: '',
        description: '',
        long_description: '',
        year: '',
        dimensions: '',
        technique: '',
        category: '',
        images: ['']
      });
      setShowAddForm(false);
      toast.success('Kunstwerk erfolgreich hinzugefügt');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Fehler beim Hinzufügen des Kunstwerks');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Sind Sie sicher, dass Sie dieses Kunstwerk löschen möchten?')) {
      try {
        await deleteProduct.mutateAsync(id);
        toast.success('Kunstwerk erfolgreich gelöscht');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Fehler beim Löschen des Kunstwerks');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-600">Lade Dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
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
                    value={newProduct.long_description}
                    onChange={(e) => setNewProduct({...newProduct, long_description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                    placeholder="Detaillierte Beschreibung, Geschichte und Kontext"
                  />
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
                  disabled={createProduct.isPending}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50"
                >
                  {createProduct.isPending ? 'Wird hinzugefügt...' : 'Kunstwerk hinzufügen'}
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
                  {products.map((product) => {
                    const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0];
                    const imageUrl = primaryImage 
                      ? `https://images.unsplash.com/${primaryImage.image_url}?w=60&h=60&fit=crop`
                      : `https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=60&h=60&fit=crop`;

                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={imageUrl}
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
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.in_stock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.in_stock ? 'Verfügbar' : 'Nicht verfügbar'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                              disabled={deleteProduct.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
