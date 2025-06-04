
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  year: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={`https://images.unsplash.com/${product.image}?w=400&h=300&fit=crop`}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          style={{
            filter: isHovered ? 'sepia(20%) saturate(120%) contrast(110%)' : 'sepia(10%) saturate(110%)'
          }}
        />
        
        {/* DDR-style overlay effect */}
        <div className={`absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-70' : 'opacity-40'
        }`}></div>
        
        {/* Action buttons on hover */}
        <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link 
            to={`/produkt/${product.id}`}
            className="bg-white/90 text-red-800 p-3 rounded-full hover:bg-white transition-colors duration-200"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button className="bg-yellow-500 text-red-800 p-3 rounded-full hover:bg-yellow-400 transition-colors duration-200">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        
        {/* Vintage badge */}
        <div className="absolute top-3 right-3 bg-red-700 text-yellow-300 px-2 py-1 rounded-full text-xs font-bold">
          {product.year}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{product.title}</h3>
        <p className="text-red-600 font-medium mb-2">von {product.artist}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-700">{product.price}€</span>
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105">
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
