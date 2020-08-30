import React, {useEffect, useState} from 'react';
import App from "./App";
import Spinner from "./Spinner";
import UserTaskForm from "./UserTaskForm";


const UserList = () => {
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


    return (
        <>
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
                            <li><strong>Nombre: </strong> { userinfo.name }</li>
                            <li><strong>Usuario: </strong> { userinfo.username }</li>
                            <li><strong>Email: </strong> { userinfo.email }</li>
                            <li><strong>Web: </strong> { userinfo.website }</li>
                            <li><strong>Teléfono: </strong> { userinfo.phone }</li>
                        </ul>
                        : < Spinner/>
                }
            </div>
            <br/>
            <br/>
            <div>
                {
                    userTask.map((userTask, index) => {
                        return <li key={`_-${index}`}>{userTask.title}</li>
                    })
                }
            </div>

        </>
    );
}

export default UserList;
