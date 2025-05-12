import type { Meta, StoryObj } from "@storybook/react";
import AddTodo from "../components/todo/addTodo";

const meta = {
  title: "Components/AddTodo",
  component: AddTodo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AddTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
