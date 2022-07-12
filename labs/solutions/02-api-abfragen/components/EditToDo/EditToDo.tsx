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
