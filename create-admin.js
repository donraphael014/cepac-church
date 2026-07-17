import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import WebSocket from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger le fichier .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erreur: Variables d\'environnement non trouvées');
  console.log('Vérifiez que .env.local contient:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=votre_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle');
  process.exit(1);
}

// Créer le client Supabase avec WebSocket
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      transport: WebSocket,
    },
  },
});

async function createAdmin() {
  const email = 'admin@cepac.com';
  const password = 'admin123';
  
  console.log('🔨 Génération du mot de passe hashé...');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  console.log('📝 Mot de passe hashé:', hashedPassword);
  console.log('🗄️  Connexion à Supabase...');
  
  // Supprimer l'ancien admin s'il existe
  await supabase.from('admins').delete().eq('email', email);
  
  // Créer le nouvel admin
  const { data, error } = await supabase.from('admins').insert([
    { email, password_hash: hashedPassword }
  ]);
  
  if (error) {
    console.error('❌ Erreur:', error.message);
  } else {
    console.log('✅ Admin créé avec succès !');
    console.log('📧 Email:', email);
    console.log('🔑 Mot de passe:', password);
  }
}

createAdmin();