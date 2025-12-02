import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/database/models/Users";
import { loginSchema } from "@/validators/login.schema";
import { ValidationError } from "yup";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await loginSchema.validate(credentials, { abortEarly: false });

          await connectDB();
          const user = await User.findOne({ email: credentials!.email });
          if (!user) throw new Error("User not found");

          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (!isValid) throw new Error("Invalid password");

          return {
            id: String(user._id),
            name: user.name,
            email: user.email,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error instanceof ValidationError) {
            throw new Error(error.errors.join(" • "));
          }
          throw new Error(error.message || "Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/pages/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.id = (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
