import React, { useState, useEffect, useContext } from "react";
import "./MtrAssignments.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function MtrAssignments() {
  const navigate = useNavigate();

  //form to select the assignment
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //states
  const [inputValue, setInputValue] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState();
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [verifiedAssignments, setVerifiedAssignments] = useState([]);
  // //selected assigns
  const [selectedSubmittedAssigns, setSelectedSubmittedAssigns] = useState();

  //state to check the errors in the batch  select input
  const [assignmentError, setAssignmentError] = useState(false);
  const [assignmentOptions, setAssignmentOptions] = useState([]);

  // //handle submission
  const onSubmit = (data) => {
    if (data.assignmentID === "select assignmentID") setAssignmentError(true);
    else {
      setAssignmentError(false);
      setSelectedAssignment(data.assignmentID);
      data.section = loggedInUser.section;
      console.log(data);
      axios
        .post("http://localhost:3500/submissions/sectionSubmitted", data)
        .then((res) => {
          console.log(res);
          //if err occurs
          if (res.data.message === "error") {
            console.log(
              "Error in the submmsions Assignments fetching",
              res.data.err
            );
            localStorage.clear();
            navigate("/login");
          }
          //if error not occurs
          else {
            // get all submissions whose status is sumbitted
            const submissions = res.data.submissions;
            console.log("Submissions :", submissions);
            const allSubmissions = submissions.filter((submission) => {
              return submission.status !== "verified";
            });
            setSubmittedAssignments(allSubmissions);
            console.log("All Submissions :", allSubmissions);

            const verifiedAssignments = submissions.filter((submission) => {
              return submission.status === "verified";
            });
            setVerifiedAssignments(verifiedAssignments);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (i) => {
    setInputValue(i.target.value);
  };

  const handleInput = (i, submissionId) => {
    i.preventDefault();
    console.log(inputValue);
    console.log(submissionId);
    // update the submission status and add remarks
    axios
      .post(`http://localhost:3500/submissions/updateStatus/${submissionId}`, {
        remarks: inputValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get all Assignments
  useEffect(() => {
    //Fetch All assignments based on batch!
    axios
      .post("http://localhost:3500/submissions/sectionSubmitted", loggedInUser)
      .then((res) => {
        // console.log(res)

        //if err occurs
        if (res.data.message === "error") {
          console.log(
            "Error in the submmsions Assignments fetching",
            res.data.err
          );
          localStorage.clear();
          navigate("/login");
        }
        //if error not occurs
        else {
          const allSubmissions = res.data.submissions;
          setSubmittedAssignments(allSubmissions);
          console.log("All Submissions :", allSubmissions);

          //filter the verified and non verified submissions
          const verifiedSubmissions = allSubmissions.filter(
            (submission) => submission.status === "verified"
          );
          setVerifiedAssignments(verifiedSubmissions);
          console.log("verified :", verifiedSubmissions);
        }
      })
      .catch((err) => {
        console.log("Error in the assignments fetcing : ", err);
      });
  }, [loggedInUser]);

  // //Set User Details in local storage
  useEffect(() => {
    setAssignmentOptions(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    //verify token and get details
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3500/verifyLoginToken", { token })
      .then((res) => {
        //  console.log('logged in user :',res.data.payload);

        //if token is invalid
        if (res.data.valid === false) {
          setLoggedInUser();
          localStorage.clear();
          navigate("/login");
        }
        //if Token is valid
        setLoggedInUser(res.data.payload);
      })
      .catch((err) => {
        console.log("Error in Mentor token Verification ", err);
      });
  }, []);

  return (
    <div className="container">
      <form className="mb-4 " onSubmit={handleSubmit(onSubmit)}>
        {/* select batch */}
        <div className="row gap-4">
          <div className="col-md-2 border-success border rounded bg-success text-white pt-1">
            Select Assignment
          </div>
          <select
            className=" col-md-8 "
            name="assignmentID"
            id="assignmentID"
            {...register("assignmentID", {
              required: "assignmentID is required",
            })}
          >
            <option disabled selected value="select assignmentID">
              Select assignmentID
            </option>
            {assignmentOptions?.map((value, ind) => (
              <option key={ind} value={value}>
                {value}{" "}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-success col-md-1">
            Get
          </button>
        </div>
        {assignmentError == true && (
          <p className="text-danger">{"assignmentID is required"}</p>
        )}
      </form>

      <div className="row">
        <div className="col-md-5">
          <h4 className="text-success mb-4 mt-4">Assignments</h4>
          <div className="Links">
            {submittedAssignments.length === 0 ? (
              <h3>No Submissions to verify</h3>
            ) : (
              <table className="table ms-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment</th>
                    <th scope="col">Review</th>
                    <th scope="col">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedAssignments?.map((data, index) => (
                    <tr key={data._id}>
                      <td>
                        <span>{data.assignmentId}</span>
                      </td>
                      <td>
                        <span className="title" style={{ cursor: "pointer" }}>
                          {data.assignmentTitle}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          // onClick={() => handleCardClick(data.assignmentUrl)}
                        >
                          Open
                        </button>
                      </td>
                      <td>
                        <form
                          className="row no-gutters"
                          onSubmit={(i) => handleInput(i, data._id)}
                        >
                          <div className="col-6">
                            <input
                              type="number"
                              className="form-control"
                              min="1"
                              max="5"
                              name="inputNumber"
                              value={inputValue}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-4">
                            <button
                              type="submit"
                              className="btn btn-outline-success"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="col-md-5 ms-5">
          <h4 className="text-success mb-4 mt-4">Verified Assignments</h4>
          <div className="Links">
            {verifiedAssignments.length === 0 ? (
              <h3>No submissions verified</h3>
            ) : (
              <table className="table ms-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedAssignments?.map((data, index) => (
                    <tr key={data._id}>
                      <td>
                        <span>{data.assignmentId}</span>
                      </td>
                      <td>
                        <span className="title" style={{ cursor: "pointer" }}>
                          {data.assignmentTitle}
                        </span>
                      </td>
                      <td>
                        <span>{data.remarks}</span>
                      </td>
                      <td>
                        <button className="btn btn-secondary">Open</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MtrAssignments;
