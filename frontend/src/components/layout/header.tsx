"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-2 px-4 border-b">
      <div className="text-xl font-bold">
        MY TODO
      </div>
      <Button variant="outline" onClick={() => signOut()} >
        로그아웃
      </Button>
    </header>
  );
}
