import React, {useState} from 'react';
import App from "./App";


const UserList = (props) => {
    const funcioncompleja = () => {
        return [
            {
                firstName: 'Andres',
                lastName: 'Proaño'
            },
            {
                firstName: 'Juan',
                lastName: 'Lopez'
            },
            {
                firstName: 'Marco',
                lastName: 'Paredes'
            }
        ];
    };
    const [users, setUsers] = useState(props.users);

    const formatName = (user) => {
        return user.firstName + ' ' + user.lastName;
    }

    const handleAddUser = () => {
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;

        const newUser = {
            firstName,
            lastName
        };
        setUsers((prevState) => {
            return [
                ...prevState,
                newUser
            ];
        });
    }


    return (
        <>
            <div>
                <label htmlFor='firstName'>Nombre</label>
                <input type='text' id='firstName'/>

                <label htmlFor='lastName'>Apellido</label>
                <input type='text' id='lastName'/>

                <button onClick={handleAddUser}>Agregar</button>
            </div>
            <h1>Numero de usuarios {users.length}</h1>
            <div>
                {
                    users.map((user, index) => {
                        return <li key={`user-${index}`}>{formatName(user)}</li>
                    })
                }
            </div>
        </>
    );
}

export default UserList;
