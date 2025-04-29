import TodoItem from "./todoItem";

type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  important: boolean;
  created_at: string; 
};

export default async function TodoList() {
 
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`)
  const todos = await data.json();


  return (
    <div className="flex flex-col gap-4">
      {todos?.map((todo:Todo) => (
        <TodoItem
          id={todo.id}
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          important={todo.important}
          created_at={todo.created_at}
        />
      ))}
    </div>
  );
}
