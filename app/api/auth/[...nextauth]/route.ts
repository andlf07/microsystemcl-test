import axios from 'axios';
import jwt from 'jsonwebtoken';
import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { config } from '~/consts/config';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password ' },
      },
      async authorize(credentials, req) {
        const url = config.LOGIN_ENDPOINT;

        const login = await axios({
          method: 'POST',
          url: config.HOST_BASE + url,
          headers: { 'Content-Type': 'application/json' },
          data: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });

        if (login.data.statusCode === 401) return null;

        if (login.data.token) {
          return {
            id: '',
            token: login.data.token,
            email: credentials?.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: config.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === 'google') {
        try {
          const getToken = await axios({
            url: config.HOST_BASE + config.GEN_PROVIDER_TOKEN_ENDPOINT,
            method: 'POST',
            data: { email: profile.email },
          });

          if (getToken.data.statusCode === 200) {
            token.jwtToken = getToken.data.token;
            token.email = profile.email;
          }

          return token;
        } catch (error) {
          console.log(error, 'error jwt google provider');
        }
      }

      if (user) {
        token.jwtToken = user.token;
        token.email = user.email;
      }

      return token;
    },

    async signIn({ user, account, profile }: any): Promise<string | boolean> {
      if (account?.provider === 'google') {
        const googleAuthData = {
          first_name: profile?.given_name,
          last_name: profile?.family_name ? profile?.family_name : profile?.given_name,
          email: user.email,
          authProvider: 'GOOGLE',
        };

        try {
          const googleCreateUser = await axios({
            url: config.HOST_BASE + config.GOOGLE_CREATE_USER_ENDPOINT,
            method: 'POST',
            data: googleAuthData,
          });

          if (googleCreateUser.data.statusCode === 201) {
            return true;
          }
        } catch (error) {
          console.log(error, 'error');
          return false;
        }
      }
      return true;
    },
    async session({ session, token, user }: any) {
      const decodeToken = jwt.decode(token.jwtToken);

      session.user = decodeToken;
      session.jwtToken = token.jwtToken;

      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url === '/dashboard') {
        return Promise.resolve(`/dashboard`);
      }

      if (url === '/login') {
        return Promise.resolve(`/login`);
      }
      return Promise.resolve(`${baseUrl}/login`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
