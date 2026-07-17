import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("🔐 Tentative de connexion pour:", email);

    // Vérifier si l'admin existe
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email);

    console.log("📊 Données reçues:", admin);

    if (error) {
      console.log("❌ Erreur Supabase:", error.message);
      return NextResponse.json(
        { message: "Erreur de base de données" },
        { status: 500 }
      );
    }

    if (!admin || admin.length === 0) {
      console.log("❌ Admin non trouvé:", email);
      return NextResponse.json(
        { message: "Identifiants incorrects" },
        { status: 401 }
      );
    }

    const adminUser = admin[0];
    console.log("✅ Admin trouvé:", adminUser.email);

    // Comparer les mots de passe
    const isValid = await bcrypt.compare(password, adminUser.password_hash);

    console.log("🔐 Mot de passe valide?", isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: "Identifiants incorrects" },
        { status: 401 }
      );
    }

    // Créer le token JWT
    const token = jwt.sign(
      { id: adminUser.id, email: adminUser.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
      },
    });

    response.headers.set(
      "Set-Cookie",
      serialize("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    console.log("✅ Connexion réussie pour:", email);
    return response;
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}