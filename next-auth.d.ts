// next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string; // Adicionado para receber user.nome
  }

  interface Session {
    user: {
      id: string; // Propriedade adicionada
      name: string; // Propriedade adicionada
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Propriedade adicionada
    name: string; // Propriedade adicionada
  }
}
