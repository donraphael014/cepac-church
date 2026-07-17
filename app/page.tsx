export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section avec animation */}
      <section className="relative bg-gradient-to-br from-church-navy via-church-dark to-church-navy text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 animate-fade-in">
            8e CEPAC KASENGA
          </h1>
          <p className="text-xl md:text-2xl text-church-gold font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            « La foi est l'ultime arme d'évolution »
          </p>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Bienvenue sur le site de l'Église CEPAC KASENGA/Uvira. Découvrez nos cultes, 
            nos enseignements et notre communauté.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a
              href="/sermons"
              className="bg-church-gold hover:bg-church-gold/90 text-church-navy px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Nos Sermons
            </a>
            <a
              href="/evenements"
              className="border-2 border-church-gold hover:bg-church-gold text-church-gold hover:text-church-navy px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Nos Événements
            </a>
          </div>
        </div>
      </section>

      {/* Section À propos avec animations */}
      <section className="py-20 px-4 bg-church-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-church-navy mb-6 animate-fade-in">
            À Propos de CEPAC
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 animate-fade-in">
            Une communauté chrétienne engagée pour la propagation de l'Évangile
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="text-2xl font-serif text-church-navy mb-3">Notre Foi</h3>
              <p className="text-gray-600 leading-relaxed">
                Une communauté unie par la foi en Dieu et l'amour du prochain.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-2xl font-serif text-church-navy mb-3">Enseignement</h3>
              <p className="text-gray-600 leading-relaxed">
                Des messages bibliques pour nourrir votre vie spirituelle.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-serif text-church-navy mb-3">Communauté</h3>
              <p className="text-gray-600 leading-relaxed">
                Une famille spirituelle où chacun trouve sa place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Call-to-Action avec animation */}
      <section className="relative bg-church-navy py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-church-gold/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 animate-fade-in">
            Rejoignez-nous
          </h2>
          <p className="text-gray-300 text-lg mb-10 animate-fade-in">
            Venez découvrir une communauté vivante où la foi et l'amour se partagent.
          </p>
          <a
            href="/contact"
            className="inline-block bg-church-gold hover:bg-church-gold/90 text-church-navy px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </div>
  );
}