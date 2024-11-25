import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async session({ session, token }) {
      try {
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return null;
      }
    },
    async jwt({ token, user, account }) {
      try {
        if (account && user) {
          return {
            ...token,
            accessToken: account.access_token,
            userId: user.id,
          };
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },
  },
  events: {
    async error(error) {
      console.error('NextAuth error:', error);
    },
  },
});

export { handler as GET, handler as POST };
