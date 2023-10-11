import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import './fonts.css';
import theme from './theme.js'
import StatusIndicator from './StatusIndicator';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';


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

    function App() {
        return (
          <ThemeProvider theme={theme}>
          </ThemeProvider>
        );
      }
      

    const [users, setUsers] = useState({});
    const [socket, setSocket] = React.useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'userId', direction: 'asc' });

    const requestSort = key => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }
    
      const sortedUsers = Object.keys(users).sort((a, b) => {
        if (sortConfig === null) {
            return 0;  // Don't sort if sortConfig is not set
          }
          
        if (sortConfig.key === 'userId') {
          return sortConfig.direction === 'asc'
            ? a.localeCompare(b)
            : b.localeCompare(a);
        } else if (sortConfig.key === 'status') {
          return sortConfig.direction === 'asc'
            ? users[a].status.localeCompare(users[b].status)
            : users[b].status.localeCompare(users[a].status);
        } else {
          return sortConfig.direction === 'asc'
            ? new Date(users[a].lastActive).getTime() - new Date(users[b].lastActive).getTime()
            : new Date(users[b].lastActive).getTime() - new Date(users[a].lastActive).getTime();
        }
      });
    

    useEffect(() => {
        // Establish a socket connection.
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        // Listen to the 'reply' event from the server.
        newSocket.on('reply', (message) => {
            console.log(message);
        });

        newSocket.on('userStatus', (data) => {
            setUsers(prevState => {
                // Check if the user already exists and if their status is the same
                if (prevState[data.userId] 
                    && prevState[data.userId].status === data.status 
                    && prevState[data.userId].lastActive === data.lastActive) {
                    return prevState; // return the previous state unchanged
                }
                return {
                    ...prevState,
                    [data.userId]: {
                        status: data.status,
                        lastActive: data.lastActive
                    }
                };
            });
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
                    <img src="logo.png" alt="Ox Logo" width="150" height="150"/>
                </a>
                <button onClick={completeTask}>Complete Task</button>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className="headerBackground">
                            <TableRow>
                                <TableCell> User ID 
                                    <IconButton size="small" onClick={() => requestSort('userId')}>
                                        {sortConfig.key === 'userId' ? 
                                            (sortConfig.direction === 'asc' ? <ArrowDownwardIcon fontSize="inherit" /> : <ArrowUpwardIcon fontSize="inherit" />)
                                            : null}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    Status 
                                    <IconButton size="small" onClick={() => requestSort('status')}>
                                        {sortConfig.key === 'status' ? 
                                            (sortConfig.direction === 'asc' ? <ArrowDownwardIcon fontSize="inherit" /> : <ArrowUpwardIcon fontSize="inherit" />)
                                            : null}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    Last Active 
                                    <IconButton size="small" onClick={() => requestSort('lastActive')}>
                                        {sortConfig.key === 'lastActive' ? 
                                        (sortConfig.direction === 'asc' ? <ArrowDownwardIcon fontSize="inherit" /> : <ArrowUpwardIcon fontSize="inherit" />)
                                        : null}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    Status Indicator
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedUsers.map(userId => (
                                <TableRow key={userId} className="rowBackground">
                                    <TableCell className="textColor">{userId}</TableCell>
                                    <TableCell className="textColor">{users[userId].status}</TableCell>
                                    <TableCell className="textColor">
                                        {new Date(users[userId].lastActive).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell className="textColor">
                                        <StatusIndicator status={users[userId].status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </header>
        </div>
    );
    
}

export default App;