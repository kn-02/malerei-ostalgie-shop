
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-amber-400 transition-all duration-500 hover:shadow-2xl">
        <div className="aspect-square relative overflow-hidden">
          <motion.img 
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-medium">{product.year}</span>
                <span className="text-2xl font-bold text-amber-400">€{product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-30">
            <span className="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.category}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {product.year}
          </div>

          {/* Action buttons on hover */}
          <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-30">
            <Link 
              to={`/produkt/${product.id}`}
              className="bg-white/90 backdrop-blur-sm text-gray-800 p-4 rounded-full hover:bg-amber-400 hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <Eye className="h-6 w-6" />
            </Link>
            <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-4 rounded-full hover:bg-red-400 hover:text-white transition-all duration-200 transform hover:scale-110">
              <Heart className="h-6 w-6" />
            </button>
            <button className="bg-amber-400 text-white p-4 rounded-full hover:bg-amber-500 transition-all duration-200 transform hover:scale-110">
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Product details below image */}
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-amber-500">€{product.price.toFixed(2)}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>
          </div>
          
          <Link
            to={`/produkt/${product.id}`}
            className="block w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-center px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Details ansehen
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
