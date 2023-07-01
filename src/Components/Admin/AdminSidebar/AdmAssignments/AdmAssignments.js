import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AssignmentContext } from "../../../../Contexts/AssignmentContext";

function Assignments() {
  const [assignmentCounter,assignmentNo] = useContext(AssignmentContext)
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  let [counter, setCounter] = useState(1);

  let [assignLink, setAssignLink] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    assignmentNo();
    setAssignLink(data.url);
    axios
      .post("http://localhost:3500/assignments/upload", data)
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch((err) => console.log("Error in uploading assignment link", err));
  };

  return (
    <div>
      <h2 className="text-success mb-5">Assignments</h2>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 row">
                    <label htmlFor="batch" className="col-form-label col-sm-4">
                      Batch :
                    </label>
                    <div className="col-sm-8">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="batch"
                          value="Batch-1"
                          id="batch1"
                          {...register("batch", {
                            required: "Batch is required.",
                          })}
                        />
                        <label className="form-check-label me-5" htmlFor="batch1">
                          Batch-1
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="batch"
                          value="Batch-2"
                          id="batch2"
                          {...register("batch", {
                            required: "Batch is required.",
                          })}
                        />
                        <label className="form-check-label me-5" htmlFor="batch2">
                          Batch-2
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="both"
                          value="Both"
                          id="both"
                          {...register("batch", {
                            required: "Batch is required.",
                          })}
                        />
                        <label className="form-check-label me-5" htmlFor="both">
                          Both
                        </label>
                      </div>
                      {errors.batch && (
                        <p className="text-danger">{errors.batch.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="year"
                      className="col-form-label col-sm-4"
                    >
                      Year :
                    </label>
                    <div className="col-sm-8">
                      <input 
                        type="number"
                        className="form-control"
                        id="year"
                        {...register("year", {
                          required: "Year is required.",
                        })}
                      />
                      {errors.year && (
                        <p className="text-danger">{errors.year.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 row">
                    <label
                      htmlFor="assignmentNo"
                      className="col-form-label col-sm-4"
                    >
                      Assignment no :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        id="assignmentNo"
                        {...register("assignmentNo", {
                          required: "Assignment Number is required.",
                        })}
                      />
                      {errors.assignmentNo && (
                        <p className="text-danger">
                          {errors.assignmentNo.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="title" className="col-form-label col-sm-4">
                      Assignment title :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        {...register("title", {
                          required: "Assignment Title is required.",
                        })}
                      />
                      {errors.title && (
                        <p className="text-danger">{errors.title.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="url" className="col-form-label col-sm-4">
                      Assignment link :
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
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-5 mb-3">
            Upload
          </button>
        </form>
      </div>
      <hr />
      <h3 className="text-secondary">Previous Assignments</h3>
      <p>{assignLink}</p>
    </div>
  );
}

export default Assignments;
