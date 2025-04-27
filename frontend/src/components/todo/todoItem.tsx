"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type TodoItemProps = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  important?: boolean;
};

export default function TodoItem({  title, description, completed, important }: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(completed);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    //checkbox 클릭에 따라 PUT 요청 변경
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Checkbox checked={isChecked} onCheckedChange={handleToggle} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg">{title}</h2>
              {important && <span className="text-yellow-500">⭐</span>}
            </div>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
        </div>
        <Button variant="destructive" size="sm">
          삭제
        </Button>
      </CardHeader>
    </Card>
  );
}
