import { prisma } from "lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { titulo, data, texto, corFundo, imagemFundo } = await req.json();

    if (!titulo || !data || !texto) {
      return NextResponse.json(
        { error: "Título, data e texto são obrigatórios." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const diario = await prisma.diario.create({
      data: {
        titulo,
        data,
        texto,
        corFundo,
        imagemFundo,
        userId: user.id,
      },
    });

    return NextResponse.json({ diario }, { status: 201 });
  } catch (error) {
    console.error("❌ Erro ao salvar diário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { diarios: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ diarios: user.diarios }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao buscar diários:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
