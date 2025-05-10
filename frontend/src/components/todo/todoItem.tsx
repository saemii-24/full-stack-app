"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Star from "../icon/star";

type TodoItemProps = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  important?: boolean;
  created_at: string;
};

export default function TodoItem({
  id,
  title,
  description,
  completed,
  important,
  created_at,
}: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const [error, setError] = useState<string>("");

  const handleToggle = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setError("");

    try {
      const response = await fetch(`/todos/completed/${id}`, {
        method: "PATCH", //일부만 업데이트 할 떄 사용된다.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newChecked }),
      });

      if (!response.ok) {
        throw new Error("업데이트에 실패했습니다.");
      }
    } catch (error) {
      setIsChecked(!newChecked);
      setError("서버 업데이트 실패. 다시 시도해 주세요.");
    }
  };

  function formatDateRange(dateString: string) {
    const startDate = new Date(dateString);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const format = (date: Date) =>
      `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

    return `${format(startDate)} ~ ${format(endDate)}`;
  }

  return (
    <Card className="w-full p-5 rounded-2xl flex flex-col gap-3 shadow-sm">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {/* 상단 영역 */}
      <div className="flex items-start justify-between">
        {/* 왼쪽: 체크박스 + 제목 + 설명 */}
        <div className="flex gap-3">
          <Checkbox checked={isChecked} onCheckedChange={handleToggle} />
          <div className="flex flex-col">
            <h2 className={`text-lg font-bold ${isChecked ? "line-through text-gray-400" : ""}`}>
              {title}
            </h2>
            {description && <p className="text-sm text-gray-500 line-clamp-2">{description}</p>}
          </div>
        </div>

        {/* 삭제 버튼 */}
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-red-400 p-0 h-auto">
          삭제
        </Button>
      </div>

      {/* 구분선 */}
      <div className="border-t" />

      {/* 하단 영역 */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{formatDateRange(created_at)}</span>
        {important && <Star />}
      </div>
    </Card>
  );
}
