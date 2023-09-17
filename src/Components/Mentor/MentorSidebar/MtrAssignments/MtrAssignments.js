import React, { useState, useEffect, useContext } from "react";
import "./MtrAssignments.css";
import axios from "axios";
import Select from 'react-select' 
import { AssignmentContext } from "../../../../Contexts/AssignmentContext";
import { useForm } from "react-hook-form";

function MtrAssignments(props) {

  //form to select the assignment
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.assignmentID == "select assignmentID") setAssignmentError(true);
    else {
      setAssignmentError(false);
      console.log("Assignment no.:",data);
    }
  };

  //states
  const [links, setLinks] = useState([]);
  const [assignmentCounter] = useContext(AssignmentContext);

  //state to check the errors in the batch  select input
  const [assignmentError, setAssignmentError] = useState(false);
  const [assignmentOptions , setAssignmentOptions] = useState([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:3500/assignments/AllAssignments")
    //   .then((res) => {
    //     const sortedAssignments = res.data.assignments.sort((a, b) => {
    //       const timestampA = new Date(a.timestamp).getTime();
    //       const timestampB = new Date(b.timestamp).getTime();
    //       return timestampB - timestampA;
    //     });
    //     setLinks(sortedAssignments);
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get("http://localhost:3500/submissions/AllSubmissions")
    //   .then((res) =>
    //     console.log(res.data)
    //   )
    //   .catch((err) => console.log(err));

  }, []);

  useEffect(()=>{
    setAssignmentOptions(['1','2','3','4','5','6','7','8','9' ])
  },[])

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };
  
  return (
    <div className="container">
     
      <form  className="mb-4 " onSubmit={handleSubmit(onSubmit)}>
        {/* select batch */}
        <div className="row gap-4">
          <div className="col-md-2 border-success border rounded bg-success    pt-1">Select Assignment</div>
          <select
              className="mt-1 col-md-8 "
              name="assignmentID"
              id="assignmentID"
              {...register("assignmentID", {
                required: "assignmentID is required",
              })}
            >
              <option disabled selected value="select assignmentID">
                Select assignmentID
              </option>
              {assignmentOptions?.map((value,ind) => (
                <option key={ind} value={value}>{value} </option>
              ))}
            </select>
            

            <button type="submit" className="btn btn-success col-md-1" >Get</button>
          </div>
          {assignmentError == true && (
              <p className="text-danger">{"assignmentID is required"}</p>
            )}
        </form>

      <div className="row">
        <div className="col-md-6">
          <div className="Links">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Assignment</th>
                  <th scope="col">Assignment #</th>
                  <th scope="col">Review</th>
                </tr>
              </thead>
              <tbody>
                {links.map((data, index) => (
                  <tr key={data._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <span
                        className="title"
                        onClick={() => handleCardClick(data.url)}
                        style={{ cursor: "pointer" }}
                      >
                        {data.title}
                      </span>
                    </td>
                    <td>
                      <span>{data.assignmentId}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleCardClick(data.url)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="Links">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Assignment</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((data, index) => (
                  <tr key={data._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <span
                        className="title"
                        onClick={() => handleCardClick(data.url)}
                        style={{ cursor: "pointer" }}
                      >
                        {data.title}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleCardClick(data.url)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
    </div>
  );
}

export default MtrAssignments;
