import React from "react";

const UserTaskList = ({task, handleDeleteTask, handleCompleteTask, complete}) => (
    <>
        <h2>Tareas</h2>
        <table>
            <thead>
            <tr>
                <td><strong>Pendientes</strong></td>
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
)

export default UserTaskList;