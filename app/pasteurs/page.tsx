import { supabase } from "@/lib/supabase";

export default async function PasteursPage() {
  const { data: pasteurs, error } = await supabase
    .from("pasteurs")
    .select("*, eglises(nom)")
    .order("nom", { ascending: true });

  if (error) {
    console.error("Erreur:", error);
  }

  return (
    <div className="min-h-screen bg-church-light py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-church-navy mb-4 animate-fade-in">
          Nos Pasteurs
        </h1>
        <p className="text-center text-gray-600 mb-12 animate-fade-in">
          Découvrez ceux qui guident notre communauté
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pasteurs && pasteurs.length > 0 ? (
            pasteurs.map((pasteur: any) => (
              <div
                key={pasteur.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center"
              >
                <div className="w-24 h-24 bg-church-gold rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                  👤
                </div>
                <h2 className="text-xl font-bold text-church-navy">
                  {pasteur.prenom} {pasteur.nom}
                </h2>
                {pasteur.fonction && (
                  <p className="text-church-gold text-sm mb-2">{pasteur.fonction}</p>
                )}
                {pasteur.eglises && (
                  <p className="text-gray-500 text-sm mb-3">{pasteur.eglises.nom}</p>
                )}
                <p className="text-gray-600 text-sm line-clamp-3">
                  {pasteur.biographie || "Pasteur au service de la communauté CEPAC"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center py-8">
              Aucun pasteur enregistré pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}