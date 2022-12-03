import NextAuth from "next-auth";
import User from "../../../models/user.model";
import db from "../../../utils/db";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token.id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const pwd = credentials?.password
        await db.on();
        const user = await User.findOne({ email: credentials?.email });
        await db.off();
        console.log(user)
        if (user && pwd && await user.validatePassword(pwd)) {
          return user.toObject();
        }
        throw new Error('bad credentials')
      },
    }),
  ],
});
