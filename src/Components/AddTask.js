import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../firebase.init';

const AddTask = () => {
    const { register, handleSubmit } = useForm();
    const [user] = useAuthState(auth);
    // console.log(user)
    const AddTaskToDb = data => {
        console.log(data);
        const newtask = {
            TaskName: data.TaskName,
            TaskDesc: data.TaskDesc,
            email: user.email,
            userId: user.uid,
            Status: false
        }
        const url = `https://to-do-list-for-me.herokuapp.com/tasks`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newtask)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    toast(`Task Added`)
                }
                else {
                    toast.error(`Something is Wrong`)
                }
            })
    }
    return (
        <div >
            <ToastContainer></ToastContainer>
            <form onSubmit={ handleSubmit(AddTaskToDb) } className='w-50 mx-auto d-flex flex-column ItemsForm p-5 my-5'>
                <h2>Add to Your To-Do-List</h2>
                <input className='mb-2' placeholder='Task Name' { ...register("TaskName") } />
                <textarea className='mb-2' placeholder='Add description [Not more than 10 words]' { ...register("TaskDesc") } />
                <input type="submit" className="btn btn-secondary" value="Insert" />
            </form>

        </div>
    );
};

export default AddTask;