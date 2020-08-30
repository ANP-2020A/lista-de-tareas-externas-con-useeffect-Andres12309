import React from "react";
import '../styles/NewTask.css'

const UserTaskForm = ({onAddTask}) => (
    <div className="add-task">
        <label htmlFor="newTask">Nueva Tarea</label>
        <input type="text" id='newTask'/>
        <button onClick={onAddTask}>Agregar</button>
    </div>
)

export default UserTaskForm;