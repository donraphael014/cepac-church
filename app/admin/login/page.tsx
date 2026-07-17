"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔐 Envoi de la requête...");
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("📊 Status de la réponse:", response.status);
      
      const data = await response.json();
      console.log("📊 Données reçues:", data);

      if (response.ok) {
        console.log("✅ Connexion réussie !");
        // Utiliser window.location pour forcer la redirection
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (error) {
      console.error("❌ Erreur:", error);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Administration
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">CEPAC Church</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="admin@cepac.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="********"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          Identifiants: <span className="font-semibold text-gray-700">admin@cepac.com</span> / <span className="font-semibold text-gray-700">admin123</span>
        </p>
      </div>
    </div>
  );
}