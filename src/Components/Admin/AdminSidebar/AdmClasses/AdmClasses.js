import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Classes() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  let submitLink = (data) => {
    axios
      .post("http://localhost:3500/classes/upload", data)
      .then((res) => {
        console.log(res.data);
        reset()
      })
      .catch((err) => console.log("Error in uploading assignment link", err));
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "70px"}}>
      <form onSubmit={handleSubmit(submitLink)}>
        <div className="card" style={{ width: "600px" }}>
        <h3 className="text-success mt-2">Upload class links</h3>
          <div className="card-body">
            <div className="mb-3 row">
              <label htmlFor="topic" className="col-form-label col-sm-3">
                Topic :
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  {...register("topic", {
                    required: "Assignment topic is required.",
                  })}
                />
                {errors.topic && (
                  <p className="text-danger">{errors.topic.message}</p>
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="url" className="col-form-label col-sm-3">
                Class link :
              </label>
              <div className="col-sm-8">
                <input
                  type="url"
                  className="form-control"
                  id="url"
                  {...register("url", {
                    required: "Assignment Link is required.",
                  })}
                />
                {errors.url && (
                  <p className="text-danger">{errors.url.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ fontWeight: "600" }}
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Classes;
