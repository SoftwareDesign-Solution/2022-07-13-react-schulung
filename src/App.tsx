import React from 'react';
import { Todo } from "./models/Todo";

export default function App() {

  const todoArray: Todo[] = [
    { id: 1, title: 'Aufgabe 1', completed: true },
    { id: 2, title: 'Aufgabe 2', completed: false },
    { id: 3, title: 'Aufgabe 3', completed: false },
  ];

  return (
    <div>
        <h1>React Schulung</h1>
    </div>
  );
};
