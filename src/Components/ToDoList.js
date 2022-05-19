import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../firebase.init';

const ToDoList = () => {
    const [user] = useAuthState(auth);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch("https://to-do-list-for-me.herokuapp.com/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));
    }, [tasks])
    const handleDelete = taskId => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://to-do-list-for-me.herokuapp.com/tasks/${taskId}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = tasks.filter(task => task._id !== taskId);
                    setTasks(remaining);
                })
        }
    }
    const UpdateStatus = taskId => {
        let UpdatedTask = {
            Status: true
        }
        console.log(UpdatedTask);
        setTasks(UpdatedTask);
        // const url = ;
        fetch(`https://to-do-list-for-me.herokuapp.com/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpdatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast('Updated')
            })
    }
    return (
        <div>
            <ToastContainer />
            <div className="container p-5 my-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th colSpan={ 2 }>Action</th>
                        </tr>
                    </thead>
                    {
                        tasks.filter(task => task.userId === user.uid).map
                            (task =>
                                <tbody>
                                    <tr>
                                        <td style={ { textDecoration: task.Status === true ? 'line-through' : 'none' } }>{ task.TaskName }</td>
                                        <td>{ task.TaskDesc }</td>
                                        <td>
                                            <Button variant="success" onClick={ () => UpdateStatus(task._id) }>Completed</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={ () => handleDelete(task._id) }>Delete</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                    }
                </Table>
            </div>

        </div >
    );
};

export default ToDoList;