import React, { useState } from "react";
import { useEffect } from "react";
import "./MtrAssignments.css";
import axios from "axios";

function MtrAssignments() {

  let [links, setLinks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/assignments/AllAssignments")
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <h1>Review of assignments of Mentors</h1> */}
      <div className="Links">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
          {links.map((data) => (
            <div className="col">
              <div className="card mtrcard">
                <div className="card-body">
                  <p className="display-3 name">Assignment - 1:</p>
                  <p className="lead fs-4">{data.url}</p>
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
