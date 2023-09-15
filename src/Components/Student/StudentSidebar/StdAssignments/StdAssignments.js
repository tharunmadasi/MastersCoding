import React, { useState, useEffect } from "react";
import "./StdAssignments.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";

function StdAssignments() {
  const [links, setLinks] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //studentDetails
  let [stdName, setStdName] = useState("");
  let [stdRoll, setStdRoll] = useState("");
  let [stdBatch, setStdBatch] = useState("");
  let [stdSection, setStdSection] = useState("");
  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  const unsubmittedLinks = links.filter(
    (link) =>
      submittedAssignments && !submittedAssignments.includes(link.assignmentId)
  );
  const submittedLinks = links.filter(
    (link) =>
      submittedAssignments && submittedAssignments.includes(link.assignmentId)
  );

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");

  const submitModalButton = (data) => {
    const submissionData = {
      assignmentId: selectedAssignment.assignmentId,
      submissionUrl: data.url,
      date: new Date().toISOString(),
      status: "Submitted",
    };

    submissionData.roll = stdRoll.toLowerCase();
    submissionData.section = stdSection;
    submissionData.batch = stdBatch;

    axios
      .post("http://localhost:3500/submissions/upload", submissionData)
      .then((res) => {
        console.log(res.data);
        console.log("Fetched Submitted Assignments:", res.data.submittedAssignments);
        const updatedAssignments = [
          ...submittedAssignments,
          selectedAssignment.assignmentId,
        ];
        setSubmittedAssignments(updatedAssignments);
        console.log("Fetched Submitted Assignments:", res.data.submittedAssignments);

        setSelectedAssignment(null);
        setSubmissionUrl("");
        setShowModal(false);
        reset();

        return axios.post("http://localhost:3500/student/submitted", {
          roll: stdRoll.toLowerCase(),
          submitted: updatedAssignments,
        });
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3500/verifyLoginToken", { token })
        .then((response) => {
          const { name, roll, batch, section } = response.data.payload;

          setStdName(name);
          setStdRoll(roll);
          setStdBatch(batch);
          setStdSection(section);

          return {
            roll: roll,
            batch: batch,
            promise: axios.get(
              "http://localhost:3500/assignments/AllAssignments"
            ),
          };
        })
        .then(({ roll, batch, promise }) => {
          return promise.then((response) => ({
            data: response.data,
            batch: batch,
            roll: roll,
          }));
        })
        .then(({ data, batch, roll }) => {
          const assignments = data.assignments;
          const filtered = assignments.filter(
            (assignment) => assignment.batch === batch
          );

          const sortedAssignments = filtered.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampB - timestampA;
          });
          setLinks(sortedAssignments);
          return axios.get(
            `http://localhost:3500/student/submittedAssignments/${roll}`
          );
        })
        .then((res) => {
          if (res.data && res.data.submittedAssignments) {
              setSubmittedAssignments(res.data.submittedAssignments);
          } else {
              console.error("Unexpected server response:", res.status, res.data);
          }
      })
      .catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error response:", error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
    });
    }
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h4 className="text-success mb-4">Assignments</h4>
            <div className="Links">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment</th>
                    <th scope="col">Submission</th>
                  </tr>
                </thead>
                <tbody>
                  {unsubmittedLinks.map((data, index) => (
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
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="text-success mb-4">Submissions</h4>
            <div className="Links">
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
                  {submittedLinks.map((data, index) => (
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
                          View
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
