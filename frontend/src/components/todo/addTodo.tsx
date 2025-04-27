import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

async function addTodo(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const important = formData.get("important") === "on";

  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, important }),
  });

  revalidatePath("/todos");
}

export default function AddTodo() {
  return (
    <form action={addTodo} className="flex flex-col gap-6 w-full mb-8">
      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">할 일 제목</Label>
        <Input
          id="title"
          name="title"
          placeholder="할 일을 입력하세요"
          required
        />
      </div>

      {/* 설명 */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">할 일 설명 (선택)</Label>
        <Input
          id="description"
          name="description"
          placeholder="추가 설명을 입력하세요"
        />
      </div>

      {/* 중요 여부 체크박스 */}
      <div className="flex items-center gap-2">
        <Checkbox id="important" name="important" />
        <Label htmlFor="important" className="text-sm">
          중요한 할 일로 표시
        </Label>
      </div>

      {/* 제출 버튼 */}
      <Button type="submit" className="self-end">
        할 일 추가
      </Button>
    </form>
  );
}
