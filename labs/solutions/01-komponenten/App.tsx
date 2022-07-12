import React, { useEffect, useState } from 'react';
import './App.scss';
import { Todo } from "./models/todo";
import ToDoItem from "./components/ToDoItem/ToDoItem";
import EditToDo from "./components/EditToDo/EditToDo";

export default function App() {

  const todoArray: Todo[] = [
    { id: 1, title: 'Aufgabe 1', completed: true },
    { id: 2, title: 'Aufgabe 2', completed: false },
    { id: 3, title: 'Aufgabe 3', completed: false },
  ];

  const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {

        setTodos(todoArray);

    }, []);

  const handleTodoSaved = (todo: Todo) => {

      setTodos((todos) => [
          ...todos,
          todo
      ]);

  }

  return (
    <div>
      <div className="todos">

        {
            todos.map((todo) => (
                <ToDoItem key={todo.id} title={todo.title} completed={todo.completed}></ToDoItem>
            ))
        }

      </div>
      <EditToDo todosaved={handleTodoSaved}></EditToDo>
    </div>
  );
};
