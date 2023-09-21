import React, { useState, useEffect } from "react";
import "./StdAssignments.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StdAssignments() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loggedInUser, setLoggedInUser] = useState();
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [unSubmittedAssigns, setUnSubmittedAssigns] = useState([]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");

  const submitModalButton = (data) => {
    const submissionData = {
      assignmentId: selectedAssignment.assignmentId,
      assignmentTitle: selectedAssignment.title,
      assignmentUrl: selectedAssignment.url,
      submissionUrl: data.url,
    };

    submissionData.roll = loggedInUser.roll.toLowerCase();
    submissionData.section = loggedInUser.section;
    submissionData.batch = loggedInUser.batch;
    console.log(submissionData);

    axios
      .post("http://localhost:3500/submissions/upload", submissionData)
      .then((res) => {
        console.log("Fetched Submitted Assignments:", res.data);

        setSelectedAssignment(null);
        setSubmissionUrl("");
        setShowModal(false);
        reset();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleRowClick = (data) => {
    window.open(data.url, "_blank");
    setSelectedAssignment(data);
  };

  const handleModalClose = () => {
    setSelectedAssignment(null);
    setShowModal(false);
    setSubmissionUrl("");
    reset();
  };

  //decode the student details from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3500/verifyLoginToken", { token })
      .then((res) => {
        if (res.data.valid === false) {
          localStorage.removeItem("token");
          navigate("/Login");
        } else setLoggedInUser(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch user all Assignments & submission Assignments details
  useEffect(() => {
    if (loggedInUser) {
      //fetch all assignments
      axios
        .post("http://localhost:3500/assignments/AllAssignments", loggedInUser)
        .then(async (res) => {
          console.log("all assignments :", res);
          setAssignments(res.data.assignments);
        })
        .catch((err) => {
          console.log(err);
        });
      //fetch all submmision assignments
      axios
        .post("http://localhost:3500/submissions/AllSubmissions", loggedInUser)
        .then((res) => {
          // console.log("all submissions:",res)
          setSubmittedAssignments(res.data.submissions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedInUser, showModal]);
  //remove the submitted assignments from the
  useEffect(() => {
    console.log(submittedAssignments, assignments);
    const notSubmitted = assignments.filter(
      (assign) =>
        !submittedAssignments.some(
          (obj) => obj.assignmentId === assign.assignmentId
        )
    );
    // console.log("not submitted :",notSubmitted)
    setUnSubmittedAssigns(notSubmitted);
  }, [submittedAssignments, assignments]);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h4 className="text-success mb-4">Assignments</h4>
            <div className="Links">
              {unSubmittedAssigns.length === 0 ? (
                <h3>No Assignments</h3>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Assignment</th>
                      <th scope="col">Submission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unSubmittedAssigns.map((data, index) => (
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
                          <button
                            className="btn btn-outline-success p-1"
                            onClick={() => {
                              setSelectedAssignment(data);
                              setShowModal(true);
                            }}
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="text-success mb-4">Submissions</h4>
            <div className="Links">
              {submittedAssignments.length === 0 ? (
                <h3>No Submissions</h3>
              ) : (
                <table className="table ms-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Assignment</th>
                      <th scope="col">Submission</th>
                      <th scope="col">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submittedAssignments.map((data, index) => (
                      <tr key={data._id}>
                        <td>
                          <span>{data.assignmentId}</span>
                        </td>
                        <td>
                          <span
                            className="title"
                            onClick={() => {
                              window.open(data.submissionUrl, "_blank");
                              setSelectedAssignment(data);
                            }}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              textDecorationColor: "green",
                            }}
                          >
                            {data.assignmentTitle}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-success p-1"
                            onClick={() => {
                              // setSelectedAssignment(data.assignmentId);
                              // setShowModal(true);
                              window.open(data.submissionUrl, "_blank");
                            }}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          {/* if no remarks field display - else data.remarks */}
                          {data.remarks ? ( 
                            <span>{data.remarks}</span>
                          ) : (
                            <span>-</span>
                          )}
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Submit Assignment - {selectedAssignment?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(submitModalButton)}>
            <div className="mb-3">
              <label htmlFor="url" className="mb-2">
                Codepen URL:
              </label>
              <input
                type="text"
                id="url"
                className="form-control"
                {...register("url", { required: true })}
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
              />
              {errors.url?.type === "required" && (
                <p className="text-danger">* URL is required</p>
              )}
            </div>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StdAssignments;
