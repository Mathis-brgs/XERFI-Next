import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { login, password, nom, prenom } = await request.json();

    if (!login || !password || !nom || !prenom) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const existingUser = await prisma.contratLogin.findUnique({
      where: { Login: login },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Ce login est déjà utilisé" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.contratLogin.create({
      data: {
        Login: login,
        passwordCRYPTE: hashedPassword,
        Nom: nom,
        Prénom: prenom,
      },
    });

    return NextResponse.json(
      {
        message: "Compte créé avec succès",
        userId: newUser.IDcontrat_login.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur register :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
