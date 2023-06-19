import React from "react"
import {useState} from "react"
import {useForm} from "react-hook-form"
import './Admin.css'

const Admin = () => {
  let {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();

  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);

  const handleLoginClick = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const handleRegisterClick = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };
  

  

  return (
    <div>
      <div className="outsideBtn">
        <a href="/login"><button className="btn btn-info fs-5">Back</button></a>
      </div>
        <button className="btn btn-secondary b1 mx-3" onClick={handleLoginClick}>Login</button>
        <button className="btn btn-secondary b1 mx-3" onClick={handleRegisterClick}>Register</button>
      {isLoginVisible && (
        <div className="form-main bg-info">
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
                            {/*Anwser*/}
                            <div className="mb-3 text-center ">
                                <label htmlFor="name">Email Id :</label>
                                <input type="text"
                                id="EmailId"
                                className="email"
                                {...register("EmailId",{required:true})} 
                                />
                                {errors.EmailId?.type==="required" && <p className="text-danger">*EmailId is required</p>}
                                                      
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
                            <button type="submit" className="loginbtn" >Login</button>
                        </form>
                    </div>
          </div>
        </div>
      )}
      {isRegisterVisible && (
        <div className="form-main regform">
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
                            {/*Anwser*/}
                            <div className="mb-3 text-center ">
                                <label htmlFor="name">Email Id :</label>
                                <input type="text"
                                id="EmailId"
                                className="email"
                                {...register("EmailId",{required:true})} 
                                />
                                {errors.EmailId?.type==="required" && <p className="text-danger">*EmailId is required</p>}
                                                      
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
                            <div className="mb-3 text-center ">
                                <label htmlFor="name">Re-type :</label>
                                <input type="password"
                                id="Password"
                                className="mx-2"
                                {...register("Password",{required:true})} 
                                />
                                {errors.Password?.type==="required" && <p className="text-danger">*Password is required</p>}
                                                      
                            </div>
                            <div className="mb-3 text-center ">
                                <label htmlFor="name">Mobile : </label>
                                <input type="password"
                                id="Password"
                                className="mx-2"
                                {...register("Password",{required:true})} 
                                />
                                {errors.Password?.type==="required" && <p className="text-danger">*Password is required</p>}
                                                      
                            </div>
                            
                            <button type="submit" className="btn btn-secondary" >Create</button>
                        </form>
                    </div>
          </div>
        </div>
      )}
      
    </div>
  );
};



export default Admin;