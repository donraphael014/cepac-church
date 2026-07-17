import { supabase } from "@/lib/supabase";

export default async function EvenementsPage() {
  const { data: evenements, error } = await supabase
    .from("evenements")
    .select("*")
    .order("date_debut", { ascending: true });

  if (error) {
    console.error("Erreur:", error);
  }

  return (
    <div className="min-h-screen bg-church-light py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-church-navy mb-4 animate-fade-in">
          Nos Événements
        </h1>
        <p className="text-center text-gray-600 mb-12 animate-fade-in">
          Restez connectés à la vie de notre communauté
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {evenements && evenements.length > 0 ? (
            evenements.map((event: any) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <h2 className="text-xl font-bold text-church-navy mb-2">
                  {event.titre}
                </h2>
                <p className="text-church-gold text-sm mb-2">
                  📅 {new Date(event.date_debut).toLocaleDateString("fr-FR")}
                  {event.date_fin &&
                    ` - ${new Date(event.date_fin).toLocaleDateString("fr-FR")}`}
                </p>
                {event.lieu && (
                  <p className="text-gray-500 text-sm mb-3">📍 {event.lieu}</p>
                )}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description || "Rejoignez-nous pour cet événement"}
                </p>
                <a
                  href={`/evenements/${event.slug}`}
                  className="inline-block bg-church-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all"
                >
                  En savoir plus
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center py-8">
              Aucun événement prévu pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}