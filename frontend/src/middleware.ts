import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!isAuth && !isLoginPage) {
    // 로그인을 안함 -> 로그인 페이지로 이동
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuth && isLoginPage) {
    // 로그인했는데 로그인 페이지 접근 -> 홈으로 이동
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // 나머지는 그대로 진행함
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
