// lib/auth.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

// Extensão de tipos garante que as propriedades 'id' e 'name' são reconhecidas
// pelo TypeScript em 'user' (do authorize) e em 'token' e 'session'.

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
        if (!valid) return null; // O retorno deve ser do tipo 'User' (que foi estendido). // Note que 'name' aqui recebe 'user.nome' do seu schema do Prisma.
        return {
          id: user.id,
          name: user.nome, // <-- Mapeando 'nome' do banco para 'name' do NextAuth
          email: user.email,
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // O 'user' aqui é o que foi retornado pelo 'authorize' acima.
    async jwt({ token, user }) {
      if (user) {
        // Atribuição direta, pois 'user' foi tipado corretamente (User & AdapterUser)
        // e 'token' foi estendido (interface JWT).
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    }, // O 'session' é o objeto de sessão que será acessado pelo cliente (useSession()).
    async session({ session, token }) {
      if (session.user) {
        // Atribuição direta, pois 'session.user' e 'token' foram estendidos.
        session.user.id = token.id as string;
        session.user.name = token.name; // Agora sem erro de tipagem
      }
      return session;
    },
  },
};
