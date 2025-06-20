
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const imageUrl = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=80`;

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-300">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-vintage-grain opacity-10 pointer-events-none z-10" />
        
        <div className="aspect-square relative overflow-hidden">
          <motion.img 
            src={imageUrl}
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
                <span className="text-sm font-mono">{product.year}</span>
                <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-30">
            <span className="bg-red-800 text-white px-3 py-1 rounded-full text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.category}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-3 right-3 bg-red-700 text-yellow-300 px-2 py-1 rounded-full text-xs font-bold font-mono">
            {product.year}
          </div>

          {/* Action buttons on hover */}
          <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-30">
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
        </div>
        
        {/* Product details below image */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{product.title}</h3>
          <p className="text-red-600 font-medium mb-2 font-mono">von {product.artist}</p>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-mono">{product.description}</p>
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
    </motion.div>
  );
};

export default ProductCard;
