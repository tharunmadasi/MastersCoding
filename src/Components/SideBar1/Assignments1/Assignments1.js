import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { Link } from "react-router-dom";

function Assignments1(props) {

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  let [links,setLinks]=useState([])
  let [show,setShow]=useState(true);
  useEffect(()=>{
    fetch("http://localhost:8000/posts")
    .then(response=>response.json())
    .then(links=>setLinks(links))
  },[]);

  return (
    <div>
      {/* <h1>Review of assignments of students</h1> */}
      <div className="Links">
      {show &&
             <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
                {
                    links.map((data)=><div className='col'>
                        <div className="card">
                            <div className="card-body">
                              <p className='display-3 name'>Assignment - {props.counter}:</p>
                              <Link className="lead fs-4" to={data.url}>{data.url}</Link>   
                            </div>
                        </div>
                    </div>)
                }
            </div> 
             }
            <button className='displaylinks' type="button" onClick={()=>setShow(!show)}>Show Links / Hide Links</button>
    </div>
    </div>
  );
}

export default Assignments1;