import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";

function Login() {
  const navi = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState("");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const isButtonSelected = (buttonRole) => {
    return buttonRole === role ? "btn-success select" : "btn-outline-success not-select";
  };

  const navigateTo = (path) => {
    navi(path);
  };

  const handleLogin = (data) => {
    console.log(data);
    navigateTo(`/${role}`);
  };

  

  return (
    <div className="full" style={{ height: "100vh" }}>
      <h3 className="text-success mb-4" style={{ fontWeight: "600" , paddingTop: "100px"}}>
        Welcome {role}</h3>
      <div className="d-flex justify-content-center">
        <div className="card">
          <div className="card-head justify-content-center">
            <div className="row justify-content-center">
              <div className="col-auto mt-3 mb-3">
                <button
                  className={`btn ${isButtonSelected("Student")}`}
                  onClick={() => handleRoleSelection("Student")}
                >
                  Student
                </button>
              </div>
              <div className="col-auto mt-3 ms-2 mb-3">
                <button
                  className={`btn ${isButtonSelected("Mentor")}`}
                  onClick={() => handleRoleSelection("Mentor")}
                >
                  Mentor
                </button>
              </div>
              <div className="col-auto mt-3 ms-2 mb-3">
                <button
                  className={`btn ${isButtonSelected("Admin")}`}
                  onClick={() => handleRoleSelection("Admin")}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
          <hr className="m-0" style={{ color: "rgb(103, 151, 103)" }} />
          {role === "" ? (
            <div className="text-center mt-3 mb-3">
              <span className="text-success" style={{fontWeight:"600"}}>Select your role</span>
            </div>
          ) : (
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="row ms-3">
                  <div className="col-auto">
                    <div className="mb-1">
                      <label htmlFor="username" className="form-label text-success" style={{ fontWeight: "600" }}>
                        Username:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register("username", {
                          required: "Username is required",
                        })}
                      />
                      {errors.username && (
                        <span className="text-danger">This field is required</span>
                      )}
                      <label htmlFor="password" className="form-label mt-3 text-success" style={{ fontWeight: "600" }}>
                        Password:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password should be at least 6 characters",
                          },
                          maxLength: {
                            value: 12,
                            message: "Password should not exceed 12 characters",
                          },
                        })}
                      />
                      {errors.password && (
                        <span className="text-danger">This field is required</span>
                      )}
                      <div className="row justify-content-center mt-3">
                        <div className="col-auto mt-3">
                          <Link to="/" style={{ textDecoration: "none" }}>
                            <span className="text-success">Forgot Password?</span>
                          </Link>
                        </div>
                        <div className="col-auto mt-3" style={{ marginLeft: "80px" }}>
                          <button type="submit" className="btn btn-success">
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
