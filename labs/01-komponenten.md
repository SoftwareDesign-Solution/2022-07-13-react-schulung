
<details>
<summary>Lösung anzeigen</summary>
<p>

****

```typescript
```

</p>
</details>

# 1. Erstellen Sie eine Komponente mit den Parameter title, completed und geben diese in der App.tsx aus

In der App.tsx befindet sich ein Array mit Aufgaben. Erstellen Sie dazu eine Komponente und geben die Aufgaben in der App.tsx aus

<details>
<summary>Lösung anzeigen</summary>
<p>

**components/ToDoItem/ToDoItem.tsx**

```tsx
import React from 'react';

const ToDoItem = (props: any) => {

    return (
        <div>
        <span>{props.title}</span>
    {!props.completed && <button>Erledigt?</button>}
        </div>
    );

};

export default ToDoItem;
```

**App.tsx**

```tsx
import React from 'react';
import { Todo } from "./models/todo";
import ToDoItem from "./components/ToDoItem/ToDoItem";

export default function App() {

  const todoArray: Todo[] = [
    { id: 1, title: 'Aufgabe 1', completed: true },
    { id: 2, title: 'Aufgabe 2', completed: false },
    { id: 3, title: 'Aufgabe 3', completed: false },
  ];

  const todoItems = todoArray.map((todo) => <ToDoItem key={todo.id} title={todo.title} completed={todo.completed}></ToDoItem>);

  return (
    <div>
      <div>
        {todoItems}
      </div>
    </div>
  );
};

```

</p>
</details>

# 2. Erweitern Sie die Komponente um die Validierung und Default-Werte der Parameter

Für die Validierung und die Default-Werte der Parameter wird seit Version 15.5 die Library prop-types benötigt. Mit nachfolgendem Befehl können Sie die Library installieren.

```
npm install prop-types
```

- title ist vom Typ string und ein Pflichtfeld
- completed ist vom Typ boolean und optional

<details>
<summary>Lösung anzeigen</summary>
<p>

**components/ToDoItem/ToDoItem.tsx**

```typescript
import PropTypes from 'prop-types';

ToDoItem.propTypes = {
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool
};

ToDoItem.defaultProps = {
    title: 'Dies ist ein Titel',
    completed: false
};
```

</p>
</details>

# 3. Erstellen Sie eine Komponente mit einem Formular zum Anlegen neuer Aufgaben

- Bild

<details>
<summary>Lösung anzeigen</summary>
<p>

**components/EditToDo/EditToDo.tsx**

```tsx
import React, { useState } from "react";
import {Todo} from "../../models/todo";

export default function EditToDo(props: any) {

    const [todo, setTodo] = useState<Todo>({
        title: '',
        completed: false
    });

    const saveToDo = (event: React.FormEvent) => {

        event.preventDefault();

        props.todosaved(todo);

    };

    const handleChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setTodo((todo) => ({
            ...todo,
            completed: checked
        }));
    }
    
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo((todo) => ({
            ...todo,
            title: value
        }));
    }

    const handleCancelClicked = (event: React.MouseEvent) => {

    }

    return (
        <div>
            <h1>Neue Aufgabe</h1>
            <form onSubmit={saveToDo}>

                <div>
                    <label htmlFor="title">Titel</label>
                    <input type="text" name="title" id="title" value={todo?.title} onChange={handleChangeTitle} />
                </div>

                <div className="form-group">
                    <label htmlFor="completed">Abgeschlossen?</label>
                    <input type="checkbox" name="completed" id="completed" checked={todo?.completed} onChange={handleChangeCompleted} />
                </div>

                <button type="submit">
                    Speichern
                </button>

                <button onClick={handleCancelClicked}>
                    Abbrechen
                </button>

            </form>
            <div>
                <pre>
                    {JSON.stringify(todo)}
                </pre>
            </div>
        </div>
    )
};
```

</p>
</details>

# 4. Ändern Sie die App.tsx so ab, das die über das Formular erstellte Aufgabe automatisch in der Liste der Aufgaben angezeigt wird

<details>
<summary>Lösung anzeigen</summary>
<p>

**App.tsx**

```tsx
import React, { useEffect, useState } from 'react';
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
      <div>

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

# 5. Stylen Sie die Komponenten mit SCSS

Installieren Sie hierzu die Library sass mit folgendem Befehl

```
npm install sass
```

- Bild

<details>
<summary>Lösung anzeigen</summary>
<p>

**components/ToDoItem/ToDoItem.scss**

```scss
.todoitem {
  line-height: 30px;
  border: 1px solid darkgray;
  padding: 10px;
  margin: 2px 0;
  position: relative;
  height: 40px;

  &__done {
    color: green;
  }

  &__open {
    color: red;
  }

  span {
    font-height: 20px;
  }

  button {
    position: absolute;
    right: 15px;
  }

}
```

**components/ToDoItem/ToDoItem.tsx**

```tsx
import React from 'react';
import './ToDoItem.scss';

export default function ToDoItem(props: any) {

    return (
        <div className="todoitem">
            <span className={props.completed ? 'todoitem__done' : 'todoitem__open'}>{props.title}</span>
            {!props.completed && <button className="btn btn-success">Erledigt?</button>}
        </div>
    );

};
```

**components/EditToDo/EditToDo.scss**

```scss
$main-color: blue;

div.EditToDo {
  margin: 50px;
  padding: 25px;
  border: 1px solid #ced4da;
}

h1 {
  color: $main-color;
  font-size: 20px;
}

.form-group {
  margin-bottom: 3px;
}

.form-label {
  margin-bottom: .5rem;
  display: inline-block;
}

.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
```

**components/EditToDo/EditToDo.tsx**

```tsx
import React, { useState } from "react";
import './EditToDo.scss';
import {Todo} from "../../models/todo";

export default function EditToDo(props: any) {

    const [todo, setTodo] = useState<Todo>({
        title: '',
        completed: false
    });

    const saveToDo = (event: React.FormEvent) => {

        event.preventDefault();

        props.todosaved(todo);

    };

    const handleChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setTodo((todo) => ({
            ...todo,
            completed: checked
        }));
    }
    
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo((todo) => ({
            ...todo,
            title: value
        }));
    }

    const handleCancelClicked = (event: React.MouseEvent) => {

    }

    return (
        <div className="EditToDo">
            <h1>Neue Aufgabe</h1>
            <form onSubmit={saveToDo}>

                <div className="form-group">
                    <label htmlFor="title" className="form-label">Titel</label>
                    <input type="text" name="title" id="title" className="form-control" value={todo?.title} onChange={handleChangeTitle} />
                </div>

                <div className="form-group">
                    <label htmlFor="completed" className="form-label">Abgeschlossen?</label>
                    <input type="checkbox" name="completed" id="completed" checked={todo?.completed} onChange={handleChangeCompleted} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Speichern
                </button>

                <button onClick={handleCancelClicked} className="btn btn-secondary">
                    Abbrechen
                </button>

            </form>
            <div>
                <pre>
                    {JSON.stringify(todo)}
                </pre>
            </div>
        </div>
    )
};
```

</p>
</details>
