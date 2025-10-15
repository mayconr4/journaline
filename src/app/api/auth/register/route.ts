// app/api/auth/register/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, senha } = body;

    // Verifica campos
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    // Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const user = await prisma.user.create({
      data: { nome, email, senha: hashedPassword },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("❌ Erro no cadastro:", error);
    // 🎯 Apenas para depuração: inclua a mensagem de erro no JSON em ambiente de desenvolvimento
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json(
      { error: "Erro interno no servidor", details: errorMessage }, // Inclui detalhes do erro
      { status: 500 }
    );
  }
}
