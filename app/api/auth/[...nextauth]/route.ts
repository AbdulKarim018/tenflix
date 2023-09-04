// @ts-nocheck
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';



const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
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
            async authorize(credentials: {}, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }
                if (email && password) return { email, password };
                return null
            },
        })
    ],
    pages: {},
}

const handler = NextAuth(authOptions);




export { handler as GET, handler as POST }