
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  description: string;
  image: string;
  year: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Use the same image styling as Gallery
  const imageUrl = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=80`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group border-2 border-transparent hover:border-red-300">
      <div className="relative overflow-hidden h-64">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-vintage-grain opacity-10 pointer-events-none z-10" />
        
        <img 
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover filter sepia-[10%] saturate-[110%] contrast-[105%] brightness-[98%] group-hover:sepia-0 group-hover:saturate-100 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700"
        />
        
        {/* Vintage grain overlay */}
        <div className="absolute inset-0 bg-vintage-grain opacity-20 group-hover:opacity-10 transition-opacity duration-500" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent transition-opacity duration-300 group-hover:opacity-70 opacity-40"></div>
        
        <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <Link 
            to={`/produkt/${product.id}`}
            className="bg-white/90 text-red-800 p-3 rounded-full hover:bg-white transition-colors duration-200"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button className="bg-white/90 text-red-800 p-3 rounded-full hover:bg-white transition-colors duration-200">
            <Heart className="h-5 w-5" />
          </button>
          <button className="bg-yellow-500 text-red-800 p-3 rounded-full hover:bg-yellow-400 transition-colors duration-200">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute top-3 right-3 bg-red-700 text-yellow-300 px-2 py-1 rounded-full text-xs font-bold font-mono">
          {product.year}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-800 text-white px-3 py-1 rounded-full text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{product.title}</h3>
        <p className="text-red-600 font-medium mb-2 font-mono">von {product.artist}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-700">€{product.price.toFixed(2)}</span>
          <Link
            to={`/produkt/${product.id}`}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-bold font-mono transition-all duration-200 transform hover:scale-105 hover:from-red-700 hover:to-red-800"
          >
            Details ansehen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
