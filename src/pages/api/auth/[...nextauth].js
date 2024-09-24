import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NextAuth( {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email"},
                password: {label: "Password", type: "text", placeholder: "password"}
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                })

                if(user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user.id, fullName: user.fullName, email: user.email };
                }

                return null;
            }
        })
    ], 
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,  // Thời gian sống của JWT là 24 giờ
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                console.log("User ID added to token:", user.id);
            }
            return token
        },
        async session({ session, token }) {
        if (token?.id) {
            session.user.id = token.id;
            console.log("User ID added to session:", token.id);
        } else {
            console.log("Token does not contain ID");
        }
        return session;
    }
    }
})
