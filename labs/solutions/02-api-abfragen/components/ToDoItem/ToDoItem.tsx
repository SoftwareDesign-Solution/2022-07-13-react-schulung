import React from 'react';
import PropTypes from 'prop-types';
import './ToDoItem.scss';

export default function ToDoItem(props: any) {

    return (
        <div className="todoitem">
            <span className={props.completed ? 'todoitem__done' : 'todoitem__open'}>{props.title}</span>
            {!props.completed && <button className="btn btn-success">Erledigt?</button>}
        </div>
    );

};

ToDoItem.propTypes = {
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool
};

ToDoItem.defaultProps = {
    title: 'Dies ist ein Titel',
    completed: false
};
