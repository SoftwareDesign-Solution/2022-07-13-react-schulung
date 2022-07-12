
# 1. Erweitern Sie die App.tsx um die jsonplaceholder-API mit axios

Installieren Sie zuerst axios-

```
npm install axios
```

Verwenden Sie als URL die Adresse

https://jsonplaceholder.typicode.com/todos

<details>
<summary>Lösung anzeigen</summary>
<p>

**App.tsx**

```tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import { Todo } from "./models/todo";
import ToDoItem from "./components/ToDoItem/ToDoItem";
import EditToDo from "./components/EditToDo/EditToDo";

export default function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data);
    };

  const handleTodoSaved = (todo: Todo) => {

      axios.post(`https://jsonplaceholder.typicode.com/todos`, { todo })
          .then(res => {
              console.log(res);
              console.log(res.data);
          })

      fetchData();

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
```

</p>
</details>