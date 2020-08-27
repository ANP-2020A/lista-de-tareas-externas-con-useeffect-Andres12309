import React, {useState} from 'react';


const TodoList = () => {

    const [task, setTask] = useState([]);
    const [complete, setComplete] = useState([]);

    const handleAddTask = () => {
        const newTask = document.querySelector('#newTask').value;

        setTask(prevState => {
            return [
                ...prevState,
                newTask
            ]
        })
    }

    const handleDeleteTask = (index) => {
        setTask((prevState) => {
            return prevState.filter((task, i) => i !== index);
        });
    };


    const handleCompleteTask = (index) => { //Extraido del doc del inge XD
        setComplete((prevState) => [
            ...prevState,
            task[index]
        ])

        handleDeleteTask(index)
    }

    return (
        <>
            <div>
                <label htmlFor="newTask">Nueva Tarea</label>
                <input type="text" id='newTask'/>
                <button onClick={handleAddTask}>Agregar</button>
            </div>
            <h2>Tareas</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Pendientes</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <ul>
                        {
                            task.map((task, index) => {
                                    return (
                                        <li key={`task-${index}`}>{task}
                                            <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
                                            <button onClick={() => handleCompleteTask(index)}>Completada</button>
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                </tr>
                </tbody>
            </table>
            <table className="table">
                <thead>
                <tr>
                    <th>Completadas</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <ul>
                        {
                            complete.map((complete, index) => {
                                    return (
                                        <li key={`task-${index}`}>{complete}</li>
                                    )
                                }
                            )
                        }
                    </ul>
                </tr>
                </tbody>
            </table>
        </>
    );
}

export default TodoList;