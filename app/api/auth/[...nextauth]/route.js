import UserModel from "@/app/UserModel/UserModel";
import ConnectMongoose from "@/lib/ConnectMongoose/ConnectMongoose";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import CredentialProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        await ConnectMongoose();
        let currentUser = await UserModel.findOne({ email });
        if (!currentUser) {
          await ConnectMongoose();
          const hashPassword = bcrypt.hashSync(password, 10);
          const userData = { email, password: hashPassword };
          currentUser = await UserModel.create(userData);
        }
        if (!currentUser || !currentUser.password) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      return user;
    },
  },
});
export { handler as GET, handler as POST };
