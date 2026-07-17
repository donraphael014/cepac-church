import { supabase } from "@/lib/supabase";

export default async function SermonsPage() {
  // Récupérer les sermons depuis Supabase
  const { data: sermons, error } = await supabase
    .from("sermons")
    .select("*, pasteurs(nom, prenom)")
    .order("date", { ascending: false });

  if (error) {
    console.error("Erreur:", error);
  }

  return (
    <div className="min-h-screen bg-church-light py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-church-navy mb-4 animate-fade-in">
          Nos Sermons
        </h1>
        <p className="text-center text-gray-600 mb-12 animate-fade-in">
          Écoutez et partagez les messages de la Parole
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {sermons && sermons.length > 0 ? (
            sermons.map((sermon: any) => (
              <div
                key={sermon.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <h2 className="text-xl font-bold text-church-navy mb-2">
                  {sermon.titre}
                </h2>
                {sermon.pasteurs && (
                  <p className="text-church-gold text-sm mb-2">
                    Pasteur {sermon.pasteurs.prenom} {sermon.pasteurs.nom}
                  </p>
                )}
                <p className="text-gray-500 text-sm mb-3">
                  {new Date(sermon.date).toLocaleDateString("fr-FR")}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {sermon.description || "Cliquez pour écouter ce message"}
                </p>
                <a
                  href={`/sermons/${sermon.slug}`}
                  className="inline-block bg-church-gold text-church-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all"
                >
                  Écouter
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center py-8">
              Aucun sermon disponible pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}