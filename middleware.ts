import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req., 'middlewarereq');
    // console.log(req.nextauth.token, 'token');
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log(token, 'token middleware');
        // console.log(req, 'req middleware');

        if (token?.jwtToken) return true;
        return false;
      },
    },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  }
);

export const config = { matcher: ['/dashboard/:path*'] };
