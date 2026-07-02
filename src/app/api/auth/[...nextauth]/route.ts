import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // ---------- Email / Password ----------
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
  async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password required");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const result = await res.json();

  // 👇 accessToken na, token
  if (!res.ok || !result?.data?.token) {
    throw new Error(result?.message || "Invalid email or password");
  }

  const user = result.data.user;
  const accessToken = result.data.token; // 👈 fix

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    accessToken,
  };
},
    }),

    // ---------- Google ----------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login", // google login e error hole login page e redirect
  },

  callbacks: {
    // Google দিয়ে login করলে এখানে backend এ user create/sync করব
   async signIn({ user, account }) {
  if (account?.provider === "google") {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/social-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ").slice(1).join(" ") || "",
          provider: "google",
          providerId: account.providerAccountId,
        }),
      });

      const result = await res.json();

      // 👇 eikhaneo token check korun, apnar backend eta implement korle
      if (!res.ok || !result?.data?.token) {
        return false;
      }

      (user as any).accessToken = result.data.token; // 👈 fix
      (user as any).id = result.data.user._id;
      (user as any).role = result.data.user.role;
      (user as any).firstName = result.data.user.firstName;
      (user as any).lastName = result.data.user.lastName;

      return true;
    } catch (err) {
      console.error("Google social login failed:", err);
      return false;
    }
  }

  return true;
},

    // user login howar por token e dhukbe
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
      }
      return token;
    },

    // client side e session hisebe ja pabo
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };