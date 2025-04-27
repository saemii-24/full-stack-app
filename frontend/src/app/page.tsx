import Header from "@/components/layout/header";
import AddTodo from "@/components/todo/addTodo";
import TodoItem from "@/components/todo/todoItem";
import TodoList from "@/components/todo/todoList";
const dummyTodos = [
  { id: 1, title: "첫 번째 할 일", description: "설명1", completed: false },
  { id: 2, title: "두 번째 할 일", description: "설명2", completed: true },
];
export default function Home() {
  return (
    <div>
      <Header/>
      <main className="p-6">
      <AddTodo/>
      <TodoList/>
    </main>
    </div>
  );
}
