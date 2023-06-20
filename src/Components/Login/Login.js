import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import './Login.css'

  function Login() {
    const navi=useNavigate()
    let navigatetos=()=>{
      navi('/Student')
    }
    let navigatetoa=()=>{
      navi('/Admin')
    }
    let navigatetom=()=>{
      navi('/Mentor')
    }
    let {
      register,
      handleSubmit,
      formState:{errors},
    }=useForm();
  const [studentVisible, setStudentVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const [mentorVisible, setMentorVisible] = useState(false);
  const [selectRole,setSelectRole]=useState("Select your role to login");

  const role=()=>{
    setSelectRole("")
  }
  const handleStudentLogin = () => {
    setStudentVisible(true);
    setAdminVisible(false);
    setMentorVisible(false);
    role();
  };
  const handleAdminLogin = () => {
    setStudentVisible(false);
    setAdminVisible(true);
    setMentorVisible(false);
    role();
  };
  const handleMentorLogin = () => {
    setStudentVisible(false);
    setAdminVisible(false);
    setMentorVisible(true);
    role();
  };
  const onSubmitStudent=(data)=>{
    console.log(data);
    navigatetos();
  }
  const onSubmitMentor=(data)=>{
    console.log(data);
    navigatetom();
  }
  const onSubmitAdmin=(data)=>{
    console.log(data);
    navigatetoa();
  }
  
    
  return (
    <div>
      <div className="outsideBtn1">
        <a href="/"><button className="btn btn-info fs-5">Back</button></a>
      </div>
      <div className="card border border-info">
          <div className='buttons'>
          <button className='btn btn-info bt1 mx-2' onClick={handleStudentLogin}>Student</button>
          <button className='btn btn-info bt1 mx-2' onClick={handleAdminLogin}>Admin</button>
          <button className='btn btn-info bt1 mx-2' onClick={handleMentorLogin}>Mentor</button>
          </div>
        {/* <nav className="navbar navbar-expand-md bg-info">
        <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavi">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavi">
      <ul className="nav navbar-nav nav-tabs">
        <li className="nav-item ms-4 me-4">
          <Link className="nav-link text-white"  onClick={loginstudent}>Student</Link>
        </li>
        <li className="nav-item ms-4 me-4">
          <Link className="nav-link text-white" to="/Mentor">Mentor</Link>
        </li>
        <li className="nav-item ms-4 me-4">
          <Link className="nav-link text-white" to="/Admin">Admin</Link>
        </li>
      </ul>
    </div>
  </div>
      </nav> */}
        
        <div className="card-body">
            <p className='mt-4 sel'>{selectRole}</p>

         {/* Student Login Form */}
        {studentVisible && (
          <div className="form1 bg-info">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
                                {/*<form onSubmit={handleSubmit(submitForm)}>
                                    <div className="mb-3 text-center form-control">
                                        <label htmlFor="name">Username : </label>
                                        <input type="text"
                                        id="Username"
                                        className="mx-2"
                                        {...register("Username",{required:true})} 
                                        />
                                        {errors.Username?.type==="required" && <p className="text-danger">*Username is required</p>}
                                                              
                                    </div>
                                    
                                    <div className="mb-3 text-center form-control">
                                        <label htmlFor="passw">Password :</label>
                                        <input type="password"
                                        id="Password"
                                        className="mx-2"
                                        {...register("Password",{required:true})} 
                                        />
                                        {errors.Password?.type==="required" && <p className="text-danger">*Password is required</p>}                       
                                    </div>
                                    <a href="#">Forgot Password ?</a>
                                    
                                    <button type="submit" className='loginbtn1' onClick={navigatetos}>Login</button>
                                </form>*/}

<form onSubmit={handleSubmit(onSubmitStudent)}>
        <div className="form-control text-center mb-3">
          <label>Username : </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: true,
              minLength:6,
              maxLength:12
            })}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">Username is required.</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Username should be at-least 6 characters.</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="text-danger">Username should not exceed 12 characters.</p>
          )}
        </div>
        <div className="form-control text-center mb-3">
          <label>Password : </label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
        <a href="#">Forgot Password ?</a>
        <button type="submit" className='loginbtn1'>Login</button>
      </form>

                            </div>
                  </div>
          </div>
        )}
        
        {/* Mentor Login Form */}
        {mentorVisible && (
          <div className="form1 bg-light">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
                                {/*<form onSubmit={handleSubmit}>
                                    <div className="mb-3 text-center ">
                                        <label htmlFor="name">Username : </label>
                                        <input type="text"
                                        id="Username"
                                        className="mx-2"
                                        {...register("Username",{required:true})} 
                                        />
                                        {errors.Username?.type==="required" && <p className="text-danger">*Username is required</p>}
                                                              
                                    </div>
                                    
                                    <div className="mb-3 text-center ">
                                        <label htmlFor="name">Password :</label>
                                        <input type="password"
                                        id="Password"
                                        className="mx-2"
                                        {...register("Password",{required:true})} 
                                        />
                                        {errors.Password?.type==="required" && <p className="text-danger">*Password is required</p>}
                                                              
                                    </div>
                                    <a href="#">Forgot Password ?</a>
                                    <button type="submit" className="loginbtn1" onClick={navigatetom}>Login</button>
        </form>*/}
        <form onSubmit={handleSubmit(onSubmitMentor)}>
        <div className="form-control text-center mb-3">
          <label>Username : </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: true,
              minLength:6,
              maxLength:12
            })}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">Username is required.</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Username should be at-least 6 characters.</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="text-danger">Username should not exceed 12 characters.</p>
          )}
        </div>
        <div className="form-control text-center mb-3">
          <label>Password : </label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
        <a href="#">Forgot Password ?</a>
        <button type="submit" className='loginbtn1'>Login</button>
      </form>
                            </div>
                  </div>
          </div>
        )}

        {/* Admin Login Form */}
        {adminVisible && (
          <div className="form1 bg-secondary">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
                               {/*} <form onSubmit={handleSubmit}>
                                    <div className="mb-3 text-center ">
                                        <label htmlFor="name">Username : </label>
                                        <input type="text"
                                        id="Username"
                                        className="mx-2"
                                        {...register("Username",{required:true})} 
                                        />
                                        {errors.Username?.type==="required" && <p className="text-danger">*Username is required</p>}
                                                              
                                    </div>
                                    
                                    <div className="mb-3 text-center ">
                                        <label htmlFor="name">Password :</label>
                                        <input type="password"
                                        id="Password"
                                        className="mx-2"
                                        {...register("Password",{required:true})} 
                                        />
                                        {errors.Password?.type==="required" && <p className="text-danger">*Password is required</p>}
                                                              
                                    </div>
                                    <a href="#">Forgot Password ?</a>
                                    
                                    <button type="submit" className="loginbtn1" onClick={navigatetoa}>Login</button>
        </form>*/}
        <form onSubmit={handleSubmit(onSubmitAdmin)}>
        <div className="form-control text-center mb-3">
          <label>Username : </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: true,
              minLength:6,
              maxLength:12
            })}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">Username is required.</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Username should be at-least 6 characters.</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="text-danger">Username should not exceed 12 characters.</p>
          )}
        </div>
        <div className="form-control text-center mb-3">
          <label>Password : </label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
        <a href="#">Forgot Password ?</a>
        <button type="submit" className='loginbtn1'>Login</button>
      </form>
                            </div>
                  </div>
          </div>
        )}
</div>
</div>
</div>
  )
}

export default Login