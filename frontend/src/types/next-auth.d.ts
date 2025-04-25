import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
    };
  }
}

interface User {
  id: number;
  userId: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userId: string;
  }
}
