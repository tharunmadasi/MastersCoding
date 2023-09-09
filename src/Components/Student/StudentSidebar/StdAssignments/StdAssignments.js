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
  let [stdName,setStdName] = useState('')
  let [stdRoll,setStdRoll] = useState('')
  let [stdBatch,setStdBatch] = useState('')
  let [stdSection,setStdSection] = useState('')

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3500/assignments/AllAssignments")
      .then((res) => {
        const sortedAssignments = res.data.assignments.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampB - timestampA;
        });
        setLinks(sortedAssignments);
      })
      .catch((err) => console.log(err));
  }, []);

  const submitModalButton = (data) => {
    const submissionData = {
      assignmentId: selectedAssignment.assignmentId,
      submissionUrl: data.url,
      date: new Date().toISOString(),
      status: "Submitted",
    };

    const token = localStorage.getItem('token');
    if(token){
      axios
      .post('http://localhost:3500/verifyLoginToken',{token})
      .then((res)=>{
        setStdName(res.data.payload.name);
        setStdRoll(res.data.payload.roll);
        setStdBatch(res.data.payload.batch);
        setStdSection(res.data.payload.section);
        console.log('response in profile ~',res.data.payload)
      })
      .catch((err)=>{console.log('error in profile ~' , err)})
    }


    submissionData.rollno=stdRoll
    submissionData.section=stdSection
    submissionData.batch=stdBatch

    axios
      .post("http://localhost:3500/submissions/upload", submissionData)
      .then((res) => {
        console.log(res.data);
        alert("Assignment Submitted Successfully");
        setSelectedAssignment(null);
        setSubmissionUrl("");
        setShowModal(false);
        reset(); // Reset the form fields
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
    reset(); // Reset the form fields
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="Links">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment</th>
                    <th scope="col">Assignment #</th>
                    <th scope="col">Submission</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((data, index) => (
                    <tr key={data._id}>
                      <th scope="row">{index + 1}</th>
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
                        <span>{data.assignmentId}</span>
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
