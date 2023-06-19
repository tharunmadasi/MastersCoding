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
    const [isStudentVisible, setStudentVisible] = useState(false);
  const [isAdminVisible, setAdminVisible] = useState(false);
  const [isMentorVisible, setMentorVisible] = useState(false);

  const handleStudentLogin = () => {
    setStudentVisible(true);
    setAdminVisible(false);
    setMentorVisible(false);
  };
  const handleAdminLogin = () => {
    setStudentVisible(false);
    setAdminVisible(true);
    setMentorVisible(false);
  };
  const handleMentorLogin = () => {
    setStudentVisible(false);
    setAdminVisible(false);
    setMentorVisible(true);
  };
  
    
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
            <p className='mt-4 sel'>Select your role to login </p>
        </div>
        {isStudentVisible && (
          <div className="form1 bg-info">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
                                <form onSubmit={handleSubmit}>
                                    {/*question*/}
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
                                    
                                    <button type="submit" className='loginbtn1' onClick={navigatetos}>Login</button>
                                </form>
                            </div>
                  </div>
          </div>
        )}
        {isAdminVisible && (
          <div className="form1 bg-secondary">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
                                <form onSubmit={handleSubmit}>
                                    {/*question*/}
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
                                </form>
                            </div>
                  </div>
          </div>
        )}
        {isMentorVisible && (
          <div className="form1 bg-light">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
                                <form onSubmit={handleSubmit}>
                                    {/*question*/}
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
                                </form>
                            </div>
                  </div>
          </div>
        )}
</div>
</div>
  )
}

export default Login