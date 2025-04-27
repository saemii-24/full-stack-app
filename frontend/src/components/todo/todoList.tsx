import TodoItem from "./todoItem";

type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  important: boolean;
};

export default async function TodoList() {
 
  const data = await fetch(`http://127.0.0.1:8800/todos`)
 console.log(data)

  return (
    <div className="flex flex-col gap-4">
      {/* {todos?.map((todo:Todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          important={todo.important}
        />
      ))} */}
    </div>
  );
}
