import React, { useState, useEffect, useContext } from "react";
import "./MtrAssignments.css";
import axios from "axios";
import { AssignmentContext } from "../../../../Contexts/AssignmentContext";

function MtrAssignments(props) {
  const [links, setLinks] = useState([]);

  const [assignmentCounter]=useContext(AssignmentContext);

  useEffect(() => {
    axios
      .get("http://localhost:3500/assignments/AllAssignments")
      .then((res) => {
        setLinks(res.data.assignments);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="Links">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
          {links.map((data) => (
            <div
              className="col"
              key={data._id}
              onClick={() => handleCardClick(data.url)}
            >
              <div className="card">
                <div className="card-body">
                  <p className="display-3 name">Assignment - {assignmentCounter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MtrAssignments;
