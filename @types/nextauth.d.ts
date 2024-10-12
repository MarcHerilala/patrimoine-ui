// @types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Ajoute la propriété accessToken à l'interface Session
  }

  interface User {
    id: string;
    email: string;
    accessToken: string;
  }
}
