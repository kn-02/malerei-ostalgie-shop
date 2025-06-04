
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const CartIcon = () => {
  const { user } = useAuth();
  const { data: cartItems = [] } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/warenkorb" className="relative p-2 text-white hover:text-yellow-300 transition-colors">
      <ShoppingCart className="h-6 w-6" />
      {user && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-red-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
