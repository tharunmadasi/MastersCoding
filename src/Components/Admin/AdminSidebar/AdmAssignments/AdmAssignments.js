import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Assignments() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //state to check the errors in the batch  select input
  const [batchError, setBatchError] = useState(false);
  const [assignments, setAssignments] = useState([]);

  const onSubmit = (data) => {
    if (data.batch == "select batch") setBatchError(true);
    else {
      console.log(data);
      axios
        .post("http://localhost:3500/assignments/upload", data)
        .then((res) => {
          console.log(res.data);
          reset();
        })
        .catch((err) => console.log("Error in uploading assignment link", err));
      setBatchError(false);
    }
  };

  const handleRowClick = (data) => {
    window.open(data.url, "_blank");
  };

  //fetch the batch details from the data base and store in the batchOptions below
  const [batchOptions, setBatchOptions] = useState();
  useEffect(() => {
    //fetch data from Batches ans store in batchOptions
    setBatchOptions(["VNR_2025_B1"]);
    //fetch all assignments from the database and store in assignments
    axios
      .get("http://localhost:3500/assignments/EntireAssignments")
      .then((res) => {
        setAssignments(res.data.assignments);
        console.log(res.data);
      })
      .catch((err) => console.log("Error in fetching assignments", err));
  }, []);

  return (
    <div>
      <h2 className="text-success mb-5">Assignments</h2>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="mb-2 row p-1">
                    {/* select batch */}
                    <select
                      className="mt-1 col-md-11 form-control"
                      name="batch"
                      id="batch"
                      {...register("batch", {
                        required: "Batch is required",
                      })}
                    >
                      <option disabled selected value="select batch">
                        Select Batch
                      </option>
                      {batchOptions?.map((value) => (
                        <option value={value}>{value}</option>
                      ))}
                    </select>
                    {batchError == true && (
                      <p className="text-danger">{"batch is required"}</p>
                    )}

                    {/* Select DeadLine */}
                    <div className="mt-1 col-md-11 mx-auto mt-3 p-1 row form-control">
                      <label
                        className=" col-md-4 text-start"
                        htmlFor="deadLine"
                      >
                        {" "}
                        Deadline :
                      </label>
                      <input
                        className=" col-md-8"
                        type="date"
                        name="deadLine"
                        id="deadLine"
                        {...register("deadLine", {
                          required: "Dead Line is required",
                        })}
                      />
                    </div>
                    {errors.deadLine && (
                      <p className="text-danger">{errors.deadLine.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Assignment</th>
            <th scope="col">Batch</th>
            <th scope="col">DeadLine</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((data, index) => (
            <tr key={data._id}>
              <td>
                <span>{data.assignmentId}</span>
              </td>
              <td>
                <span
                  className="title"
                  onClick={() => handleRowClick(data)}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    textDecorationColor: "green",
                  }}
                >
                  {data.title}
                </span>
              </td>
              <td>
                <span>{data.batch}</span>
              </td>
              <td>
                <span>{data.deadLine}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
