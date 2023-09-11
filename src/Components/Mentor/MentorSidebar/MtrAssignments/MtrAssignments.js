import React, { useState, useEffect, useContext } from "react";
import "./MtrAssignments.css";
import axios from "axios";
import Select from 'react-select' 
import { AssignmentContext } from "../../../../Contexts/AssignmentContext";

function MtrAssignments(props) {
  const [links, setLinks] = useState([]);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [assignmentCounter] = useContext(AssignmentContext);

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
    axios
      .get("http://localhost:3500/submissions/AllSubmissions")
      .then((res) =>
        console.log(res.data)
      )
      .catch((err) => console.log(err));

  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container">
        <Select options={options} />

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
