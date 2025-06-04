
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Filter, Grid, List } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('alle');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    'alle',
    'Sozialistischer Realismus',
    'Stadtansichten',
    'Genremalerei',
    'Kinder und Jugend',
    'Architektur',
    'Landwirtschaft'
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'alle' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'year':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Kunstgalerie</h1>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            Entdecken Sie unsere komplette Sammlung authentischer DDR-Gemälde
          </p>
        </div>
      </section>

      {/* Filter and Sort Section */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'alle' ? 'Alle Kategorien' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center space-x-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="name">Nach Name</option>
                <option value="price-low">Preis aufsteigend</option>
                <option value="price-high">Preis absteigend</option>
                <option value="year">Nach Jahr</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              {sortedProducts.length} Kunstwerk{sortedProducts.length !== 1 ? 'e' : ''} gefunden
              {selectedCategory !== 'alle' && ` in "${selectedCategory}"`}
            </p>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product) => (
              <div key={product.id} className={viewMode === 'list' ? 'max-w-4xl mx-auto' : ''}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                Keine Kunstwerke in dieser Kategorie gefunden.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
