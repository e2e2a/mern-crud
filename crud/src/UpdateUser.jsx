import React, {useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

function UpdateUser() {
    const {id} = useParams();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [emailExists, setEmailExists] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/user/'+id)
        .then(user => { console.log(user.data)
            setName(user.data.name)
            setEmail(user.data.email)
            setAge(user.data.age)
        })
        .catch(err => console.log(err))
    }, [])
    const update = async (e) => {
        e.preventDefault();
        axios.put("http://localhost:8080/update/"+id, {name,email,age})
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={update}>
                    <h2>Create User</h2>
                    {emailExists &&
                        <div className="alert alert-danger w-50  p-4 ">
                            <p>Email already exists. Choose a different email.</p>
                        </div>
                    }
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={email}  onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" id="age" className="form-control" value={age}  onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser