
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useAddToCart } from '@/hooks/useCart';
import { useProductLikes, useToggleLike } from '@/hooks/useProductLikes';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'] & {
  product_images: Database['public']['Tables']['product_images']['Row'][];
};

interface SupabaseProductCardProps {
  product: Product;
}

const SupabaseProductCard: React.FC<SupabaseProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const addToCart = useAddToCart();
  const { data: likesData } = useProductLikes(product.id);
  const toggleLike = useToggleLike();

  // Use the same image handling logic as Gallery
  const getImageUrl = (product: Product) => {
    if (product.product_images?.length > 0) {
      const primaryImage = product.product_images.find(img => img.is_primary) || product.product_images[0];
      return `https://images.unsplash.com/${primaryImage.image_url}?auto=format&fit=crop&w=800&q=80`;
    }
    // Use different placeholder images based on product title
    const placeholders = [
      'photo-1541961017774-22349e4a1262',
      'photo-1470813740244-df37b8c1edcb',
      'photo-1469474968028-56623f02e42e',
      'photo-1523712999610-f77fbcfc3843',
      'photo-1500673922987-e212871fec22'
    ];
    const index = product.title.length % placeholders.length;
    return `https://images.unsplash.com/${placeholders[index]}?auto=format&fit=crop&w=800&q=80`;
  };

  const imageUrl = getImageUrl(product);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Artikel zum Warenkorb hinzuzufügen');
      return;
    }

    try {
      await addToCart.mutateAsync({ productId: product.id });
      toast.success('Artikel zum Warenkorb hinzugefügt');
    } catch (error) {
      toast.error('Fehler beim Hinzufügen zum Warenkorb');
      console.error(error);
    }
  };

  const handleToggleLike = async () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Artikel zu liken');
      return;
    }

    try {
      const result = await toggleLike.mutateAsync(product.id);
      toast.success(result.liked ? 'Artikel geliked' : 'Like entfernt');
    } catch (error) {
      toast.error('Fehler beim Liken');
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group border border-gray-200 hover:border-amber-400">
      <div className="relative overflow-hidden h-64">        
        <img 
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-70 opacity-40"></div>
        
        <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <Link 
            to={`/produkt/${product.id}`}
            className="bg-white/90 text-gray-800 p-3 rounded-full hover:bg-amber-400 hover:text-white transition-colors duration-200"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button 
            onClick={handleToggleLike}
            className={`p-3 rounded-full transition-colors duration-200 ${
              likesData?.isLiked 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/90 text-gray-800 hover:bg-red-400 hover:text-white'
            }`}
          >
            <Heart className={`h-5 w-5 ${likesData?.isLiked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-amber-400 text-white p-3 rounded-full hover:bg-amber-500 transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {product.year}
        </div>

        {likesData && likesData.totalLikes > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Heart className="h-3 w-3 fill-current" />
            <span>{likesData.totalLikes}</span>
          </div>
        )}
      </div>
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-500">€{parseFloat(product.price.toString()).toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-200 transform hover:scale-105 ${
              product.in_stock
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:shadow-lg'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? 'In den Warenkorb' : 'Nicht verfügbar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupabaseProductCard;
