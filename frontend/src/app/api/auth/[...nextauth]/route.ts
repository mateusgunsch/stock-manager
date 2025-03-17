import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (
            credentials?.username === process.env.ADMIN_USER &&
            credentials?.password === process.env.ADMIN_PASSWORD
            ) {
            return { id: "1", name: "Admin" };
            }
            return null;
        },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt", // ✅ Corrigido aqui
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
