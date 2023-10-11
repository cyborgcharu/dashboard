import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import StatusIndicator from './StatusIndicator';

const User = ({ user, userId }) => {
    return (
      <div>
        <span>User: {userId} </span>
        <StatusIndicator status={user.status} />
        <span>Status: {user.status} </span>
        <span>Last Active: {new Date(user.lastActive).toLocaleTimeString()}</span>
      </div>
    );
}

function App() {
    const [users, setUsers] = useState({});
    const [socket, setSocket] = React.useState(null);

    useEffect(() => {
        // Establish a socket connection.
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        // Listen to the 'reply' event from the server.
        newSocket.on('reply', (message) => {
            console.log(message);
        });

        newSocket.on('userStatus', (data) => {
            setUsers(prevState => ({
                ...prevState,
                [data.userId]: {
                    status: data.status,
                    lastActive: data.lastActive
                }
            }));
        });

        // Clean up the effect by disconnecting the socket when the component is unmounted.
        return () => newSocket.disconnect();
    }, []);

    const completeTask = () => {
        if (socket) {
            const fakeData = { text: "Operator completed task!" };
            socket.emit('message', fakeData);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <a href="https://www.getox.com" target="_blank" rel="noopener noreferrer">
                    <img src="logo.png" alt="Ox Logo" width="100" height="100"/>
                </a>
                <button onClick={completeTask}>Complete Task</button>
                {Object.keys(users).map(userId => (
                    <User key={userId} userId={userId} user={users[userId]} />
                ))}
            </header>
        </div>
    );
}

export default App;