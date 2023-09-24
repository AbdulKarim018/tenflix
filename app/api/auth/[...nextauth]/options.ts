import prismadb from '@/lib/prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "john@email.com",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        }
        if (!email || !password) {
          throw new Error("Missing Credentials!");
        };
        const user = await prismadb.user.findUnique({
          where: {
            email,
          },
          include: {
            Profiles: true,
          },
        })
        if (!user || !user.hashedPassword) {
          throw new Error("Email Does Not Exist!");
        }
        const isCorrectPassword = await compare(password, user.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error("Incorrect Password!");
        };
        // console.log(user);

        return user;
      },
    })
  ],
  callbacks: {
    jwt: ({ token, session, user }) => {
      // console.log('JWT Callback: ', token, session, user);
      if (user) {
        return {
          ...token,
          id: user.id,
          hashedPassword: user.hashedPassword,
          emailVerifiedAt: user.emailVerifiedAt,
          Profiles: user.Profiles,
        };
      };
      return token;
    },
    session: ({ session, user, token }) => {
      // console.log('Session Callback: ', token, session, user);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          hashedPassowrd: token.hashedPassword,
          emailVerifiedAt: token.emailVerifiedAt,
          Profiles: token.Profiles,
        }
      }
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
}

export default authOptions;