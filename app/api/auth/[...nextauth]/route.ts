import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { url } from "@/lib/api-url";

interface User {
  id: string; // Identifiant de l'utilisateur (doit être un string)
  email: string; // Email de l'utilisateur
  accessToken: string; // Le token d'accès
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Vérifie que credentials n'est pas undefined et que email et password existent
        if (!credentials?.email || !credentials?.password) {
          return null; // Retourne null si les informations ne sont pas fournies
        }

        const res = await fetch(`${url}/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const token = await res.text(); // Récupère le token sous forme de chaîne

        // Vérifie si la réponse est valide
        if (res.ok && token) {
          return {
            id: credentials.email,
            email: credentials.email,
            accessToken: token,
          } as User;
        }

        return null; // Retourne null si les informations ne sont pas valides
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: "this is the secret key of the auth",
  },



  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken; // Assigne le token JWT ici
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
