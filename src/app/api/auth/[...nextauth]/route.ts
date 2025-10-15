import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.senha, user.senha);
        if (!valid) return null;

        // Retorna o usuário com as informações que serão usadas no token e na sessão
        return {
          id: user.id,
          name: user.nome,
          email: user.email,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET,

  // ✅ Aqui entram os callbacks
  callbacks: {
    /**
     * Esse callback roda sempre que um JWT é criado ou atualizado.
     * Ele adiciona o id do usuário (e outros dados) ao token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    /**
     * Esse callback roda sempre que a sessão é verificada (useSession, getServerSession, etc.)
     * Aqui garantimos que session.user tenha o mesmo id do token.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
