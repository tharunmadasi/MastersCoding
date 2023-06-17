import React from "react"
import {useState} from "react"
import {useForm} from "react-hook-form"
import './Admin.css'
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailid, setemailid] = useState('');
  let {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();

   const handleUsernameChange = (event) => {
     setUsername(event.target.value);
  };

   const handlePasswordChange = (event) => {
     setPassword(event.target.value);
   };
   const handleemailidChange = (event) => {
     setemailid(event.target.value);
  };
  const Navigate=useNavigate();
  const formsubmit=()=>{
    Navigate('/Student');
  }

  const handleSubmit1 = (event) => {
    event.preventDefault();
    // Here, you can perform the login logic, such as sending the username and password to an API for authentication.
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
    <div className="form-main bg-info">
    <form onSubmit={handleSubmit1}>
      <div className="mb-3">
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          id="username"
          {...register("username",{required:true})}
        />
        {errors.username?.type==="required" && <p className="text-danger">*Username is required</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="emailid" >Email Id :</label>
        <input
          type="text"
          id="emailid"
           className="email"
          {...register("emailid",{required:true})}
        />
        {errors.emailid?.type==="required" && <p className="text-danger">*Email Id is required</p>}

      </div>
      <div className="mb-3">
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          id="password"
          
          {...register("password",{required:true})}
        />
        {errors.password?.type==="required" && <p className="text-danger">*Password is required</p>}

      </div>
      <br></br>
      <a href="#" >Forgot password ?</a>
      
      <button type="submit" className="loginbtn" onClick={formsubmit}>Log In</button>
      
      
    </form>
    </div>
    
</div>
  );
};



export default Admin;