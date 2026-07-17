import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminSermonsPage() {
  const { data: sermons, error } = await supabase
    .from("sermons")
    .select("*, pasteurs(nom, prenom)")
    .order("date", { ascending: false });

  if (error) {
    console.error("Erreur:", error);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Sermons</h1>
          <Link
            href="/admin/sermons/nouveau"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Nouveau sermon
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pasteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sermons && sermons.length > 0 ? (
                sermons.map((sermon: any) => (
                  <tr key={sermon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sermon.titre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sermon.pasteurs ? 
                        `${sermon.pasteurs.prenom} ${sermon.pasteurs.nom}` : 
                        "Non assigné"
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sermon.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Link
                        href={`/admin/sermons/${sermon.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm("Supprimer ce sermon ?")) {
                            await supabase
                              .from("sermons")
                              .delete()
                              .eq("id", sermon.id);
                            window.location.reload();
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Aucun sermon pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}