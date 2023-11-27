import prisma from "@/app/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Auth',
            
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'your@email.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials) => {
                if(!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });

                if(!user) {
                    return null;
                }

                const userPassword = user.passwordHash;

                const isValidPassword = bcrypt.compareSync(password, userPassword);

                if(!isValidPassword) {
                    return null;
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/signin',
        signOut: '/signout',
    },
    callbacks: {
        session: ({ session, token }) => {
          return {
            ...session,
            user: {
              ...session.user,
              role: token.role,
              id: token.id,
              randomKey: token.randomKey
            }
          }
        },
        jwt: ({ token, user }) => {
          if (user) {
            const u = user as unknown as any
            return {
              ...token,
              id: u.id,
              role: u.role,
              randomKey: u.randomKey
            }
          }
          return token
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }