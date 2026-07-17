export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} CEPAC - Tous droits réservés
        </p>
        <p className="text-gray-500 text-sm mt-2">
          « La foi est l'ultime arme d'évolution »
        </p>
      </div>
    </footer>
  )
}