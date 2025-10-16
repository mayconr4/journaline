// app/api/diario/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";

export async function POST(req: Request) {
  try {
    const session: Session | null = await getServerSession(authOptions);

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
      include: { diarios: true },
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

    const pontosPorEntrada = 10;

    const usuarioAtualizado = await prisma.user.update({
      where: { id: user.id },
      data: {
        pontos: { increment: pontosPorEntrada },
      },
    });

    const novoPontos = usuarioAtualizado.pontos ?? 0;
    const novoNivel = Math.min(Math.floor(novoPontos / 30) + 1, 10);

    const proxNivelPontos = Math.min(novoNivel * 30, 30 * 10);
    const pontosFaltando = Math.max(proxNivelPontos - novoPontos, 0);

    await prisma.user.update({
      where: { id: user.id },
      data: { pontos: novoPontos, nivel: novoNivel },
    });

    return NextResponse.json(
      { diario, pontos: novoPontos, nivel: novoNivel, pontosFaltando },
      { status: 201 }
    );
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
    const session: Session | null = await getServerSession(authOptions);

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

export async function DELETE(req: Request) {
  try {
    const session: Session | null = await getServerSession(authOptions);
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

    return NextResponse.json(
      { message: "Diário excluído com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/diario error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
