
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

const AuthButton = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Erfolgreich abgemeldet');
    } catch (error) {
      toast.error('Fehler beim Abmelden');
      console.error(error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <User className="h-4 w-4" />
          <span className="text-sm">{user.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Abmelden</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/auth"
      className="bg-yellow-500 hover:bg-yellow-400 text-red-800 px-4 py-2 rounded-lg font-bold transition-colors"
    >
      Anmelden
    </Link>
  );
};

export default AuthButton;
