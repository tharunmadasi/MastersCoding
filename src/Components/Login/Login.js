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
    reset,
  } = useForm();
  const [role, setRole] = useState("");
  const [loginRes, setLoginRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const isButtonSelected = (buttonRole) => {
    return buttonRole === role
      ? "btn-success select"
      : "btn-outline-success not-select";
  };

  const navigateTo = (path) => {
    navi(path);
  };

  const handleLogin = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post(`http://localhost:3500/${role}/login`, data)
      .then((res) => {
        setLoginRes(res);
        console.log(res.data);
        setIsLoading(false);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          navigateTo(`/${role}`);
        } else {
          alert("Invalid Credentials");
          reset();
        }
      })
      .catch((err) => {
        console.log(err.data?.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="full" style={{ height: "100vh" }}>
      <h3
        className="text-success mb-4"
        style={{ fontWeight: "600", paddingTop: "100px" }}
      >
        Welcome {role}
      </h3>
      <div className="d-flex justify-content-center">
        <div className="card logcard">
          <div className="card-head justify-content-center logcardhead">
            <div className="row justify-content-center">
              <div className="col-auto mt-3 mb-3">
                <button
                  className={`btn ${isButtonSelected("student")}`}
                  onClick={() => handleRoleSelection("student")}
                >
                  Student
                </button>
              </div>
              <div className="col-auto mt-3 ms-2 mb-3">
                <button
                  className={`btn ${isButtonSelected("mentor")}`}
                  onClick={() => handleRoleSelection("mentor")}
                >
                  Mentor
                </button>
              </div>
              <div className="col-auto mt-3 ms-2 mb-3">
                <button
                  className={`btn ${isButtonSelected("admin")}`}
                  onClick={() => handleRoleSelection("admin")}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
          <hr className="m-0" style={{ color: "rgb(103, 151, 103)" }} />
          {role === "" ? (
            <div className="text-center mt-3 mb-3">
              <span className="text-success" style={{ fontWeight: "600" }}>
                Select your role
              </span>
            </div>
          ) : (
            <div className="card-body">
              {loginRes.data?.success === false && (
                <p className="text-danger fw-bold">{loginRes.data.message}</p>
              )}
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="row ms-3">
                  <div className="col-auto">
                    <div className="mb-1">
                      <label
                        className="form-label text-success"
                        style={{ fontWeight: "600" }}
                      >
                        Roll:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="roll"
                        {...register("roll", {
                          required: "roll is required",
                          minLength: {
                            value: 10,
                            message: "roll should exactly be 10 characters",
                          },
                          maxLength: {
                            value: 10,
                            message: "roll should exactly be 10 characters",
                          },
                        })}
                      />
                      {errors.roll && (
                        <p className="text-danger">{errors.roll.message}</p>
                      )}
                      <label
                        className="form-label mt-3 text-success"
                        style={{ fontWeight: "600" }}
                      >
                        Password :
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password should atleast be 6 characters",
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                      <div className="row justify-content-center mt-3">
                        <div className="col-auto mt-3">
                          <Link to="/" style={{ textDecoration: "none" }}>
                            <span className="text-success">
                              Forgot Password?
                            </span>
                          </Link>
                        </div>
                        <div
                          className="col-auto mt-3"
                          style={{ marginLeft: "80px" }}
                        >
                          <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isLoading}
                          >
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
