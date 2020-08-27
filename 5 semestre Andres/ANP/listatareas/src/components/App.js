import React, {useState} from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import UserList from "./UserList";


const App = (props) => {
    return <UserList users={props.users}/>
}

export default App;
