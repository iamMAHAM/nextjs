import NextAuth from 'next-auth';
import User from '../../../models/user.model';
import db from '../../../utils/db';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  secret:process.env.JWTPASSWORD,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token.id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      console.log(session)
      if (token?._id) token.id = token._id;
      if (token?.isAdmin) token.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const pwd = credentials?.password;
        await db.on();
        const user = await User.findOne({ email: credentials?.email });
        await db.off();;
        if (user && pwd && (await user.validatePassword(pwd))) {
          return { ...user.toObject(), password: undefined };
        }
        throw new Error('bad credentials');
      },
    }),
  ],
});
