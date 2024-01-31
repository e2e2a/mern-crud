import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateUser() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    axios.post("http://localhost:8080/post", {name,email,age})
    .then(result => {
        if(result.data && result.data.message === 'Email is already used'){
            setEmailExists(true);
        }else{
            navigate('/');
        }
    })
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Create User</h2>
          {emailExists && 
          <div className="alert alert-danger w-50  p-4 ">
          <p>Email already exists. Choose a different email.</p>
          </div>
          }
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="form-control" onChange={(e) =>setName(e.target.value)} />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="form-control" onChange={(e) =>setEmail(e.target.value)} />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" id="age" className="form-control" onChange={(e) =>setAge(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
