// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    if (!login || !password) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const user = await prisma.contratLogin.findUnique({
      where: { Login: login },
    });

    if (!user || !user.passwordCRYPTE) {
      return NextResponse.json(
        { error: "Login ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordCRYPTE);
    if (!isValid) {
      return NextResponse.json(
        { error: "Login ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.IDcontrat_login.toString(),
        login: user.Login,
      },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "1d" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Erreur login :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
