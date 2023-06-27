import React, { useState, useEffect } from "react";
import "./StdAssignments.css";
import axios from "axios";

function StdAssignments(props) {
  const [links, setLinks] = useState([]);

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
                  <p className="display-3 name">Assignment - {props.counter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StdAssignments;
