import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";

// Define auth options
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const admin = await Admin.findOne({ username: credentials.username });
        if (!admin) {
          console.error("❌ Username not found");
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordCorrect) {
          console.error("❌ Incorrect password");
          return null;
        }

        return { id: admin._id.toString(), name: admin.username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// For App Router: export named GET and POST handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
