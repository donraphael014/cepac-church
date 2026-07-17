"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [showAdminLink, setShowAdminLink] = useState(false);

  // Détecter si l'utilisateur est sur la page admin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setShowAdminLink(path.startsWith('/admin'));
    }
  }, []);

  // Fonction pour afficher le lien admin (double-clic sur le logo)
  const handleLogoDoubleClick = () => {
    setShowAdminLink(!showAdminLink);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-church-navy cursor-pointer"
          onDoubleClick={handleLogoDoubleClick}
          title="Double-cliquez pour accéder à l'admin"
        >
           8 CEPAC KASENGA/UVIRA
        </div>
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-church-gold transition-colors">Accueil</Link>
          <Link href="/sermons" className="text-gray-700 hover:text-church-gold transition-colors">Sermons</Link>
          <Link href="/evenements" className="text-gray-700 hover:text-church-gold transition-colors">Événements</Link>
          <Link href="/pasteurs" className="text-gray-700 hover:text-church-gold transition-colors">Pasteurs</Link>
          
          {/* Lien Admin caché - visible uniquement si l'utilisateur est sur /admin ou après double-clic */}
          {showAdminLink && (
            <Link 
              href="/admin/login" 
              className="text-church-gold font-semibold hover:text-church-navy transition-colors border-l pl-6 border-gray-300"
            >
              ⚙️ Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}