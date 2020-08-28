import React, {useEffect, useState} from 'react';
import '../components/Spinner'
import '../styles/todo-list.css'
import Spinner from "./Spinner";

const TodoList = () => {

    const [task, setTask] = useState([]);
    const [complete, setComplete] = useState([]);
    const [darkMode, setDarkMode] = React.useState(false);
    const [userinfo, setUserInfo] = React.useState(null);

    useEffect(() => {
        console.log('SE MONTO');
        const getData = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/users/1');
            const dataJason = await data.json();
            setUserInfo(dataJason);
        };
        getData();
    }, []);

    useEffect(() => {
        console.log('efecto', task.length);
        if (task.length > 0) {
            document.title = `${task.length}tareas pendientes`;
        } else {
            document.title = `No tienes tareas pendientes`;
        }
    }, [task]);

    useEffect(() => {
        console.log('El nuevo estado es:', darkMode ? 'DARK MODE' : 'LIGH MODE')
    }, [darkMode]);

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

    const handleAddMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    }

    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <div>
                {
                    userinfo ?
                        <ul>
                            <li>{userinfo.name}</li>
                            <li>{userinfo.email}</li>
                            <li>{userinfo.website}</li>
                            <li>{userinfo.phone}</li>
                        </ul>
                        : < Spinner/>
                }
            </div>

            <button onClick={handleAddMode}>Cambia modo {darkMode ? 'Claro' : 'Oscuro'}</button>
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
        </div>
    );
}

export default TodoList;