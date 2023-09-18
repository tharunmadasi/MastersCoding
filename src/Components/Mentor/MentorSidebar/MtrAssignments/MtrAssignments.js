import React, { useState, useEffect, useContext } from "react";
import "./MtrAssignments.css";
import axios from "axios";
import { AssignmentContext } from "../../../../Contexts/AssignmentContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function MtrAssignments(props) {
  
  const navigate = useNavigate();

  //form to select the assignment
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
 
  //states
  const [links, setLinks] = useState([]);
  const [loggedInUser,setLoggedInUser] = useState();
  const [submittedAssignments,setSubmittedAssignments]=useState();
  const [verifiedAssignments,setVerifiedAssignments] = useState();
  //selected assigns
  const [selectedSubmittedAssigns,setSelectedSubmittedAssigns] = useState();
  const [selectedVerifiedAssigns,setSeletedVerifiedAssigns] = useState();
  
  
  //state to check the errors in the batch  select input
  const [assignmentError, setAssignmentError] = useState(false);
  const [assignmentOptions , setAssignmentOptions] = useState([]);
  
  
//handle submission
const onSubmit = (data) => {
  if (data.assignmentID === "select assignmentID") setAssignmentError(true);
  else { 
      setAssignmentError(false);     
      console.log("Assignment no.:",data);
      // console.log('Logged in User',loggedInUser)
      const selectedSubmmitedAssigns = submittedAssignments.filter((assign)=>(assign.assignmentId /*int*/  == data.assignmentID /*string*/))
      const selectedVerifiedAssigns = verifiedAssignments.filter((assign)=>(assign.assignmentId == data.assignmentID))
      console.log('selected Submitted assigns :',selectedSubmmitedAssigns, '\nselected verified assigns : ',selectedVerifiedAssigns);
      
      setSelectedSubmittedAssigns(selectedSubmittedAssigns);
      setSeletedVerifiedAssigns(selectedVerifiedAssigns);
    }
  };


//get all Assignments
  useEffect(() => {
    //Fetch All assignments based on batch!
    axios.post('http://localhost:3500/submissions/sectionSubmitted',loggedInUser)
    .then((res)=>{
      // console.log(res)

      //if err occurs
      if(res.data.message === 'error'){
        console.log('Error in the submmsions Assignments fetching',res.data.err)
        localStorage.clear();
        navigate('/login')
      }
      //if error not occurs
      else{
        const allSubmissions = res.data.submissions
        setSubmittedAssignments(allSubmissions)
        // console.log('All Submissions :',allSubmissions)
        
        //filter the verified and non verified submissions
        const verifiedSubmissions = allSubmissions.filter(submission => submission.status === 'verified');
        setVerifiedAssignments(verifiedSubmissions);
        // console.log('verified :' , verifiedSubmissions);
      }

    })
    .catch((err)=>{console.log("Error in the assignments fetcing : ",err)})
    

  }, [loggedInUser]);

//Set User Details in local storage
  useEffect(()=>{
    setAssignmentOptions(['1','2','3','4','5','6','7','8','9' ]);
     //verify token and get details
     const token = localStorage.getItem('token');
     axios
       .post('http://localhost:3500/verifyLoginToken',{token})
       .then((res)=>{
         
        //  console.log('logged in user :',res.data.payload);

         //if token is invalid
         if(res.data.valid === false){
           setLoggedInUser();
           localStorage.clear();
           navigate('/login');
         }
         //if Token is valid
         setLoggedInUser(res.data.payload);
       })
       .catch((err)=>{console.log("Error in Mentor token Verification ",err)});
  },[])

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };
  
  return (
    <div className="container">
     
      <form  className="mb-4 " onSubmit={handleSubmit(onSubmit)}>
        {/* select batch */}
        <div className="row gap-4">
          <div className="col-md-2 border-success border rounded bg-success    pt-1">Select Assignment</div>
          <select
              className="mt-1 col-md-8 "
              name="assignmentID"
              id="assignmentID"
              {...register("assignmentID", {
                required: "assignmentID is required",
              })}
            >
              <option disabled selected value="select assignmentID">
                Select assignmentID
              </option>
              {assignmentOptions?.map((value,ind) => (
                <option key={ind} value={value}>{value} </option>
              ))}
            </select>
            

            <button type="submit" className="btn btn-success col-md-1" >Get</button>
          </div>
          {assignmentError == true && (
              <p className="text-danger">{"assignmentID is required"}</p>
            )}
        </form>

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
