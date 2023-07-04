import React, { useState, useEffect, useContext } from "react";
import "./StdAssignments.css";
import axios from "axios";
import { AssignmentContext } from "../../../../Contexts/AssignmentContext";
import {useForm} from "react-hook-form";

function StdAssignments(props) {
  const [links, setLinks] = useState([]);
  const [show,setShow]=useState(true)
  const [assignmentCounter] = useContext(AssignmentContext);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios
      .get("http://localhost:3500/assignments/AllAssignments")
      .then((res) => {
        setLinks(res.data.assignments);
      })
      .catch((err) => console.log(err));
  }, []);
  const submitLink=(data)=>{
    setShow(false)
    console.log(data)
    fetch("http://localhost:4000/posts",{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data)
    })
  }
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
              <div className="card" style={{width:"300px",marginLeft:"10px"}}>
                <div className="card-body">
                  <p className="display-3 fw-bold" >Assignment - {assignmentCounter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br></br>
        <br />
        { show &&
          <div className="row row-cols-1 row-cols-sm-2  row-cols-md-3 g-4">
          <form style={{display:"inline",margin:"auto"}} onSubmit={handleSubmit(submitLink)}>
                      <div className="mb-3 text-center display-5" style={{fontFamily:"cursive"}} >
                          <label htmlFor="name">Assignment No : </label>
                          <input type="number"
                          id="number"
                          className="form-control mb-3"
                          {...register("number",{required:true})} 
                          />
                          {errors.number?.type==="required" && <p className="text-danger">*number is required</p>}
                                                
                      </div>
                      <div className="mb-3 text-center display-5" style={{fontFamily:"cursive"}} >
                          <label htmlFor="name">Submission Link : </label>
                          <input type="text"
                          id="text"
                          className="form-control mb-3"
                          {...register("text",{required:true})} 
                          />
                          {errors.text?.type==="required" && <p className="text-danger">*Link is required</p>}
                                                
                      </div>
                      <button type="submit" className="btn btn-secondary add-card-btn">Submit</button>
                  </form>
          </div>
        }
        <br />
        { <button type="button" className="btn btn-secondary" style={{fontFamily:"cursive"}} onClick={()=>setShow(!show)}>Submit Assignment</button> }

      </div>
    </div>
  );
}

export default StdAssignments;
