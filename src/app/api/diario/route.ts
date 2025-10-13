import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { titulo, data, texto, corFundo, imagemFundo } = await req.json();

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
}
