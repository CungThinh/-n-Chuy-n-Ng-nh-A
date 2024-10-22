import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "text", placeholder: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Thời gian sống của JWT là 24 giờ
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Nếu là lần đầu tiên đăng nhập (sau khi user được xác thực)
      if (user) {
        if (account && account.provider === "google") {
          // Lấy thông tin từ DB nếu đăng nhập bằng Google
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          if (existingUser) {
            token.id = existingUser.id;
            token.role = existingUser.role;
          } else {
            // Nếu người dùng chưa tồn tại, tạo mới
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            });
            token.id = newUser.id;
            token.role = newUser.role;
          }
        } else {
          // Người dùng đăng nhập bằng Credentials
          token.id = user.id;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Đảm bảo session trả về đúng cấu trúc giống nhau cho cả Google và Credentials
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
  debug: true,
});
