
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/produkt/:id" element={<ProductDetail />} />
            <Route path="/warenkorb" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/impressum" element={<Impressum />} />
            {/* Placeholder routes for other legal pages */}
            <Route path="/datenschutz" element={<Impressum />} />
            <Route path="/agb" element={<Impressum />} />
            <Route path="/widerruf" element={<Impressum />} />
            <Route path="/ueber-uns" element={<Home />} />
            <Route path="/kontakt" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
