import type { Meta, StoryObj } from "@storybook/react";
import TodoItem from "@/components/todo/todoItem";

const meta = {
  title: "Components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    title: "테스트 할일",
    description: "테스트 설명",
    completed: false,
    important: true,
    created_at: "2024-03-20T00:00:00.000Z",
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto  p-4">
        <Story />
      </div>
    ),
  ],
};
