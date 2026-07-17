"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Fermer le menu après un clic sur un lien
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-church-navy cursor-pointer"
            onDoubleClick={handleLogoDoubleClick}
            title="Double-cliquez pour accéder à l'admin"
          >
            CEPAC
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-church-gold transition-colors">Accueil</Link>
            <Link href="/sermons" className="text-gray-700 hover:text-church-gold transition-colors">Sermons</Link>
            <Link href="/evenements" className="text-gray-700 hover:text-church-gold transition-colors">Événements</Link>
            <Link href="/pasteurs" className="text-gray-700 hover:text-church-gold transition-colors">Pasteurs</Link>
            {showAdminLink && (
              <Link 
                href="/admin/login" 
                className="text-church-gold font-semibold hover:text-church-navy transition-colors border-l pl-6 border-gray-300"
              >
                ⚙️ Admin
              </Link>
            )}
          </div>

          {/* Bouton menu burger (mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-church-navy hover:text-church-gold transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            <Link 
              href="/" 
              onClick={handleLinkClick}
              className="block text-gray-700 hover:text-church-gold transition-colors py-2"
            >
              Accueil
            </Link>
            <Link 
              href="/sermons" 
              onClick={handleLinkClick}
              className="block text-gray-700 hover:text-church-gold transition-colors py-2"
            >
              Sermons
            </Link>
            <Link 
              href="/evenements" 
              onClick={handleLinkClick}
              className="block text-gray-700 hover:text-church-gold transition-colors py-2"
            >
              Événements
            </Link>
            <Link 
              href="/pasteurs" 
              onClick={handleLinkClick}
              className="block text-gray-700 hover:text-church-gold transition-colors py-2"
            >
              Pasteurs
            </Link>
            {showAdminLink && (
              <Link 
                href="/admin/login" 
                onClick={handleLinkClick}
                className="block text-church-gold font-semibold hover:text-church-navy transition-colors py-2"
              >
                ⚙️ Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}