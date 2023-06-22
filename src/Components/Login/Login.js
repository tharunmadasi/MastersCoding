import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";

function Login() {
  const navi = useNavigate();
  let navigatetos = () => navi("/Student/profile");
  let navigatetoa = () => navi("/Admin/profile");
  let navigatetom = () => navi("/Mentor/profile1");
  const role = () => setSelectRole("");

  let {register,handleSubmit,formState: { errors },} = useForm();

  const [studentVisible, setStudentVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const [mentorVisible, setMentorVisible] = useState(false);

  const [selectRole, setSelectRole] = useState("Select your role to login");


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

  //handling submissions
  //for student
  const [stdLoginRes,setStdLoginRes] = useState({})
  useEffect(()=>{
    if(stdLoginRes.data?.success === true){
      localStorage.setItem('token',stdLoginRes.data.token)
      navigatetos();
    }
  },[stdLoginRes])
  const onSubmitStudent = async(data) => {
    // console.log(data);
    data.position='student';
    let result = await axios.post('http://localhost:3500/student/login',data);
    // console.log(result)
    setStdLoginRes(result);
  };
  //for mentor
  const [mentorLoginRes,setMentorLoginRes] = useState({})
  useEffect(()=>{
    if(mentorLoginRes.data?.success === true){
      localStorage.setItem('token',mentorLoginRes.data.token)
      navigatetom();
    }
  },[mentorLoginRes])
  const onSubmitMentor = async(data) => {
    data.position='mentor'
    console.log(data);
    let result = await axios.post('http://localhost:3500/mentor/login',data);
    console.log(result);
    setMentorLoginRes(result);
  };
  //for admin
  const [adminLoginRes,setAdminLoginRes] = useState({})
  useEffect(()=>{
    if(adminLoginRes.data?.success === true){
      localStorage.setItem('token',adminLoginRes.data.token)
      navigatetoa();
    }
  },[adminLoginRes])
  const onSubmitAdmin = async(data) => {
    data.position='admin'
    console.log(data);
    let result = await axios.post('http://localhost:3500/admin/login',data);
    console.log(result);
    setAdminLoginRes(result);
  };

  

  return (
    <div>
      <div className="outsideBtn1">
        <a href="/">
          <button className="btn btn-info fs-5">Back</button>
        </a>
      </div>
      <div className="card border border-info">
        <div className="buttons">
          <button
            className="btn btn-info bt1 mx-2"
            onClick={handleStudentLogin}
          >
            Student
          </button>
          <button className="btn btn-info bt1 mx-2" onClick={handleAdminLogin}>
            Admin
          </button>
          <button className="btn btn-info bt1 mx-2" onClick={handleMentorLogin}>
            Mentor
          </button>
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
          <p className="mt-4 sel">{selectRole}</p>

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
                  {stdLoginRes.data?.success === false && <p className="text-danger fw-bold">*{stdLoginRes.data?.message}</p> }
                  <form onSubmit={handleSubmit(onSubmitStudent)}>
                    <div className="form-control text-center mb-3">
                      <label>Student Roll : </label>
                      <input
                          type="text"
                          id="roll"
                          {...register("roll", {
                            required: true,
                            maxLength:10,
                            minLength:10
                          })}
                        />
                      {errors.roll?.type === "required" && (
                        <p className="text-danger">*roll shouldn't be empty.</p>
                      )}
                      {errors.roll?.type === "minLength" && (
                        <p className="text-danger">
                          *roll should have length 10.
                        </p>
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
                        <p className="text-danger">Password shouldn't be empty</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-danger">
                          Password should be at-least 6 characters.
                        </p>
                      )}
                    </div>

                    <a href="#">Forgot Password ?</a>

                    <button type="submit" className="loginbtn1">
                      Login
                    </button>
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
                  {mentorLoginRes.data?.success === false && <p className="text-danger fw-bold">*{mentorLoginRes.data?.message}</p> }
                  <form onSubmit={handleSubmit(onSubmitMentor)}>
                    <div className="form-control text-center mb-3">
                      <label>Mentor Roll : </label>
                      <input
                        type="text"
                        id="roll"
                        {...register("roll", {
                          required: true,
                          minLength: 10,
                          maxLength: 10,
                        })}
                      />
                      {errors.roll?.type === "required" && (
                        <p className="text-danger">*roll shouldn't be empty</p>
                      )}
                      {errors.roll?.type === "minLength" && (
                        <p className="text-danger">
                          *roll should have length 10
                        </p>
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
                        <p className="text-danger">*Password is required.</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-danger">
                          Password should be at-least 6 characters.
                        </p>
                      )}
                    </div>
                    <a href="#">Forgot Password ?</a>
                    <button type="submit" className="loginbtn1">
                      Login
                    </button>
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
                  {adminLoginRes.data?.success === false && <p className="text-danger fw-bold">*{adminLoginRes.data?.message}</p> }
                  <form onSubmit={handleSubmit(onSubmitAdmin)}>
                    <div className="form-control text-center mb-3">
                      <label>Admin Roll : </label>
                      <input
                        type="text"
                        id="roll"
                        {...register("roll", {
                          required: true,
                          minLength: 10,
                          maxLength: 10,
                        })}
                      />
                      {errors.roll?.type === "required" && (
                        <p className="text-danger">*roll shouldn't be empty.</p>
                      )}
                      {errors.roll?.type === "minLength" && (
                        <p className="text-danger">
                          *roll should have length 10.
                        </p>
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
                        <p className="text-danger">Password shouldn't be empty.</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-danger">
                          Password should be at-least 6 characters.
                        </p>
                      )}
                    </div>
                    <a href="#">Forgot Password ?</a>
                    <button type="submit" className="loginbtn1">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
