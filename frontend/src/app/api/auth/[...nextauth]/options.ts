import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { sign } from "jsonwebtoken";

// Extender os tipos padrão para incluir campos personalizados
declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        role: string;
        accessToken?: string;
    }

    interface Session {
        user: {
        id: string;
        name: string;
        role: string;
        accessToken: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        accessToken?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            // Verificar credenciais com as variáveis de ambiente
            const adminUser = process.env.ADMIN_USERNAME;
            const adminPass = process.env.ADMIN_PASSWORD;

            if (credentials && credentials.username === adminUser && credentials.password === adminPass) {
                const accessToken = sign(
                    { 
                        id: "1", 
                        name: credentials.username, 
                        role: "admin" 
                        },
                        process.env.NEXTAUTH_SECRET || "",
                        { expiresIn: '1d' } // Token expira em 1 dia
                    );

                return {
                    id: "1",
                    name: credentials.username,
                    role: "admin",
                    accessToken: accessToken,
                };
            }
            return null;
        }
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: JWT, user?: any }) {
            // Adicionar role ao token se disponível no usuário
            if (user) {
                token.role = user.role;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            // Adicionar role e accessToken à sessão
            if (session.user) {
                session.user.role = token.role as string;
                session.user.accessToken = token.accessToken as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 1 dia
    }
};