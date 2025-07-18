import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUser(){
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const navigate=useNavigate()
   const Submit=(e)=>{
    
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}/createUser`, { name, email })
    .then(result =>{
        console.log(result)
        navigate('/users')

    })
    .catch(err=>console.log(err))
   }



    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Work</h2>
                    <div className="mb-2">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        onChange={(e)=>setName(e.target.value)}/>
                        
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder="Enter Email" className="form-control"
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
           
        </div>
    )
}

export default CreateUser;
