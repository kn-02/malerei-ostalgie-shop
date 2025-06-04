
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Ungültige Anmeldedaten');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Erfolgreich angemeldet');
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
        });
        if (error) {
          if (error.message.includes('User already registered')) {
            toast.error('Benutzer bereits registriert');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Konto erfolgreich erstellt! Bitte bestätigen Sie Ihre E-Mail-Adresse.');
        }
      }
    } catch (error) {
      toast.error('Ein unerwarteter Fehler ist aufgetreten');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              {isLogin ? 'Anmelden' : 'Registrieren'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Vorname
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required={!isLogin}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Nachname
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  minLength={6}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Lädt...' : (isLogin ? 'Anmelden' : 'Registrieren')}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                {isLogin 
                  ? 'Noch kein Konto? Jetzt registrieren' 
                  : 'Bereits ein Konto? Jetzt anmelden'
                }
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
