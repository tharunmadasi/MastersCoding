import React from "react";
import "./Profile1.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Profile1() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  
  
  return (
    <div>
      <h1>Mentor Profile</h1>
      <div className="form1">
        <div className="row">
          <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control text-center mb-3 inp">
                <label>Username : </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                />
                {errors.username?.type === "required" && (
                  <p className="text-danger">Username is required.</p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="text-danger">
                    Username should be at-least 6 characters.
                  </p>
                )}
                {errors.username?.type === "maxLength" && (
                  <p className="text-danger">
                    Username should not exceed 12 characters.
                  </p>
                )}
              </div>
              <div className="form-control text-center mb-3 inp">
                <label>Password : </label>
                <input
                  type="password"
                  id="password"
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

              <div className="form-control inp">
                <label>LinkedIn Profile Link : </label>
                <input
                  type="url"
                  id="url"
                  {...register("url", { required: true })}
                />
                {errors.url?.type === "required" && (
                  <p className="text-danger">LinkedIn Profile is required.</p>
                )}
              </div>

              <div className="form-control inp">
                <label>GitHub Link : </label>
                <input
                  type="url"
                  id="giturl"
                  {...register("giturl", { required: true })}
                />
                {errors.giturl?.type === "required" && (
                  <p className="text-danger">GitHub Link is required.</p>
                )}
              </div>

              <button type="submit" className="btn btn-success mt-3" id="btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Profile1;
