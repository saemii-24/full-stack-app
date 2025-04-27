"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Star from "../icon/star";

type TodoItemProps = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  important?: boolean;
};

export default function TodoItem({
  title,
  description,
  completed,
  important,
}: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(completed);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    // TODO: 체크 상태 서버에 업데이트
  };

  // TODO: 날짜 저장 필요

  return (
    <Card className="w-full p-5 rounded-2xl flex flex-col gap-3 shadow-sm">
      {/* 상단 영역 */}
      <div className="flex items-start justify-between">
        {/* 왼쪽: 체크박스 + 제목 + 설명 */}
        <div className="flex gap-3">
          <Checkbox checked={isChecked} onCheckedChange={handleToggle} />
          <div className="flex flex-col">
            <h2
              className={`text-lg font-bold ${
                isChecked ? "line-through text-gray-400" : ""
              }`}
            >
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
            )}
          </div>
        </div>

        {/* 삭제 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-red-400 p-0 h-auto"
        >
          삭제
        </Button>
      </div>

      {/* 구분선 */}
      <div className="border-t" />

      {/* 하단 영역 */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        {/* <span></span> TODO: 날짜 업데이트 */}
        {important && <Star/>}
      </div>
    </Card>
  );
}
