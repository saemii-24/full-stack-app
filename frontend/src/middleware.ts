import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => {
      // token이 있으면 로그인된 것
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
