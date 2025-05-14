import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      userId,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      setError("아이디 또는 비밀번호를 확인해주세요.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">로그인</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={isLoading} // 입력 중에도 비활성화 할 수 있음
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button onClick={handleLogin} disabled={isLoading} className="w-full">
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
      </CardContent>
    </Card>
  );
}
