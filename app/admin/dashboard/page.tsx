import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  // Compter les sermons
  const { count: sermonsCount, error: sermonsError } = await supabase
    .from("sermons")
    .select("*", { count: "exact", head: true });

  // Compter les événements
  const { count: evenementsCount, error: evenementsError } = await supabase
    .from("evenements")
    .select("*", { count: "exact", head: true });

  // Compter les pasteurs
  const { count: pasteursCount, error: pasteursError } = await supabase
    .from("pasteurs")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tableau de bord
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Carte Sermons */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Sermons</p>
                <p className="text-3xl font-bold text-gray-800">
                  {sermonsCount || 0}
                </p>
              </div>
              <div className="text-4xl">📖</div>
            </div>
            <a
              href="/admin/sermons"
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Gérer les sermons →
            </a>
          </div>

          {/* Carte Événements */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Événements</p>
                <p className="text-3xl font-bold text-gray-800">
                  {evenementsCount || 0}
                </p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
            <a
              href="/admin/evenements"
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Gérer les événements →
            </a>
          </div>

          {/* Carte Pasteurs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pasteurs</p>
                <p className="text-3xl font-bold text-gray-800">
                  {pasteursCount || 0}
                </p>
              </div>
              <div className="text-4xl">👤</div>
            </div>
            <a
              href="/admin/pasteurs"
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Gérer les pasteurs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}