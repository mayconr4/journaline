// app/api/diario/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    // Busca o usuário pelo email para obter userId (mais robusto que depender de session.user.id)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    const diarios = await prisma.diario.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ diarios });
  } catch (err) {
    console.error("GET /api/diario error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const body = await req.json();
    const { titulo, data, texto, corFundo, imagemFundo } = body;

    if (!titulo || !texto)
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    const diario = await prisma.diario.create({
      data: {
        titulo,
        data: data ?? new Date().toISOString().split("T")[0], // se não enviar, usa hoje (YYYY-MM-DD)
        texto,
        corFundo: corFundo ?? "#FFFFFF",
        imagemFundo: imagemFundo ?? null,
        userId: user.id,
      },
    });

    return NextResponse.json({ diario }, { status: 201 });
  } catch (err) {
    console.error("POST /api/diario error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "ID do diário ausente" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    const diarioToDelete = await prisma.diario.findUnique({
      where: { id: id },
    });

    if (!diarioToDelete)
      return NextResponse.json(
        { error: "Diário não encontrado" },
        { status: 404 }
      );

    if (diarioToDelete.userId !== user.id)
      return NextResponse.json(
        { error: "Não autorizado a excluir este diário" },
        { status: 403 }
      );

    await prisma.diario.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Diário excluído com sucesso" }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/diario error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}