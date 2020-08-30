import React, {useEffect, useState} from 'react';
import '../components/Spinner'
import '../styles/todo-list.css'
import '../styles/statustask.css'
import Spinner from "./Spinner";
import UserTaskForm from "./UserTaskForm";
import UserTaskList from "./UserTaskList";


const TaskList = () => {

    const [userinfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(1);
    const [userTask, setUserTask] = useState([]);

    useEffect(() => {
        console.log('SE MONTO');
        const getUser = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
            const dataJason = await data.json();
            setUserInfo(dataJason);
        };
        getUser();
        const getTask = async () => {
            const task = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + '/todos');
            const taskJson = await task.json();
            console.log('Tasks', taskJson)
            setUserTask(taskJson);
        };
        getTask();
    }, [userId]);

    const handlebeforeUser = () => {
        setUserId(userId - 1);
    }
    const handlenextUser = () => {

        setUserId(userId + 1);
    }

    const handleAddTask = () => {
        const newTasK = document.querySelector('#newTask').value;

        setUserTask( prevState => [
            ...prevState, {
                newTasK,
                completed: false
            }
        ] );
    }

    const handleDeleteTask = (index) => {
        setUserTask((prevState) => {
            return prevState.filter((userTask, i) => i !== index);
        });
    };

    const handleCompleteTask = (index) => {
        setUserTask((prevState) => {
            const TaskUpdate = [...prevState];
            TaskUpdate[index].completed = true;
            return TaskUpdate;
        });
    };


    return (
        <div>
            <div>
                {
                    userId > 1 &&
                    <button onClick={handlebeforeUser}>Anterior usuario</button>
                }
                {
                    userId < 10 &&
                    <button onClick={handlenextUser}>Siguiente usuario</button>
                }
            </div>
            <h1>Informacion del Usuario</h1>
            <div>
                {
                    userinfo ?
                        <ul>
                            <li><strong>Nombre:</strong> {userinfo.name}</li>
                            <li><strong>Usuario: </strong> {userinfo.username}</li>
                            <li><strong>Email: </strong> {userinfo.email}</li>
                            <li><strong>Web: </strong> {userinfo.website}</li>
                            <li><strong>Teléfono: </strong> {userinfo.phone}</li>
                        </ul>
                        : < Spinner/>
                }
            </div>
            <UserTaskForm onAddTask={handleAddTask}/>
            <br/>
            <br/>
            <h1>Tienes ({userTask.length}) tareas en total</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>
                {
                    userTask.map((userTask, index) => (
                            <tr key={index}>
                                <td>{userTask.title}{userTask.newTasK}</td>
                                <td className={userTask.completed
                                    ? 'complete'
                                    : 'incomplete'}>
                                    {
                                        userTask.completed
                                            ? 'Completada'
                                            : <button onClick={() => handleCompleteTask(index)}>Marcar como
                                                completada</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;