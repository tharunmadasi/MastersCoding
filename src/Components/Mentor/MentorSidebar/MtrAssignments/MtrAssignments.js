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
  const [remarksValues, setRemarksValues] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState();
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [verifiedAssignments, setVerifiedAssignments] = useState([]);

  //state to check the errors in the batch  select input
  const [assignmentError, setAssignmentError] = useState(false);
  const [assignmentOptions, setAssignmentOptions] = useState([]);

  // //handle submission
  const onSubmit = async (data) => {
    if (data.assignmentId === "select assignmentId") {
      setAssignmentError(true);
    } else {
      setAssignmentError(false);
      setSelectedAssignment(data.assignmentId);

      // Extract numeric assignmentId
      const assignId = parseInt(data.assignmentId, 10);

      try {
        const assignmentRes = await axios.get(
          "http://localhost:3500/submissions/assignmentSubmissions",
          {
            params: { assignmentId: assignId },
          }
        );

        console.log("Assignment Res:", assignmentRes.data);
        const dataToSend = {
          ...data,
          section: loggedInUser.section,
          assignId: assignId,
        };

        if (assignmentRes.data && assignmentRes.status === 200) {
          const sectionRes = await axios.post(
            "http://localhost:3500/submissions/sectionSubmitted",
            dataToSend
          );

          console.log("Section Res:", sectionRes);

          if (sectionRes.data && sectionRes.status === 200) {
            const submissions = sectionRes.data.submissions;
            console.log("AssignId :", assignId);
            console.log("Submissions :", submissions);

            const allSubmissions = submissions.filter(
              (submission) => submission.status === "submitted"
            );
            setSubmittedAssignments(allSubmissions);

            const verifiedAssignments = submissions.filter(
              (submission) => submission.status === "verified"
            );
            setVerifiedAssignments(verifiedAssignments);
          } else {
            console.log(
              "Error in section submissions:",
              sectionRes.data.message
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // Initialize remarks state when assignments are fetched
    const initialRemarks = {};
    submittedAssignments.forEach((assignment) => {
      initialRemarks[assignment._id] = '';
    });
    setRemarksValues(initialRemarks);
  }, [submittedAssignments]);

  const handleInputChange = (assignmentId, value) => {
    setRemarksValues((prevRemarks) => ({
      ...prevRemarks,
      [assignmentId]: value,
    }));
  };

  const handleInput = (e, submissionId) => {
    e.preventDefault();
    const remarks = remarksValues[submissionId];
  
    axios
      .post(`http://localhost:3500/submissions/updateStatus/${submissionId}`, {
        remarks: remarks,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
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
    // set assignment options in the form of array
    setAssignmentOptions([]);

    // verify token and get details
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3500/verifyLoginToken", { token })
      .then((res) => {
        // if token is invalid
        if (res.data.valid === false) {
          setLoggedInUser();
          localStorage.clear();
          navigate("/login");
        } else {
          // if Token is valid
          setLoggedInUser(res.data.payload);

          // fetch assignments from the server
          axios
            .get("http://localhost:3500/assignments/EntireAssignments")
            .then((assignmentRes) => {
              // Assuming assignmentRes.data contains an array of assignments
              console.log(assignmentRes.data.assignments);
              console.log(res.data.payload.batch.slice(-2));
              console.log(assignmentRes.data.assignments[0].batch.slice(-2));
              const filteredAssignments = assignmentRes.data.assignments.filter(
                (assignment) =>
                  assignment.batch.slice(-2) ===
                  res.data.payload.batch.slice(-2)
              );
              setAssignmentOptions(
                filteredAssignments.map((assignment) => (
                  <option key={assignment._id} value={assignment.assignmentId}>
                    {assignment.assignmentId} - {assignment.title} -{" "}
                    {assignment.deadLine}
                  </option>
                ))
              );
            })
            .catch((assignmentErr) => {
              console.log("Error fetching assignments", assignmentErr);
            });
        }
      })
      .catch((err) => {
        console.log("Error in Mentor token Verification ", err);
      });
  }, []);

  // handle card click by opening the new window with the assignment
  const handleCardClick = (submission) => {
    console.log(submission);
    window.open(submission, "_blank");
  };

  return (
    <div className="container">
      <form className="mb-4 " onSubmit={handleSubmit(onSubmit)}>
        {/* select batch */}
        <div className="row gap-4">
          <div className="col-md-2 border-success border rounded bg-success text-white pt-1">
            Select Assignment
          </div>
          <select
            className="col-md-8"
            name="assignmentId"
            id="assignmentId"
            {...register("assignmentId", {
              required: "assignmentId is required",
            })}
          >
            <option disabled selected value="select assignmentId">
              Select assignmentId
            </option>
            {assignmentOptions?.map((optionElement, ind) => (
              <option key={ind} value={optionElement.props.value}>
                {optionElement.props.children}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-success col-md-1">
            Get
          </button>
        </div>
        {assignmentError == true && (
          <p className="text-danger">{"assignmentId is required"}</p>
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
                    <th scope="col">Roll no</th>
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
                        <span>{data.roll}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCardClick(data.submissionUrl)}
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
                              value={remarksValues[data._id]}
                              onChange={(e) =>
                                handleInputChange(data._id, e.target.value)
                              }
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
                    <th scope="col">Roll no</th>
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
                        <span>{data.roll}</span>
                      </td>
                      <td>
                        <span>{data.remarks}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCardClick(data.submissionUrl)}
                        >
                          Open
                        </button>
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
