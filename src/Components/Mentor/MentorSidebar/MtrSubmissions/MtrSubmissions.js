import React,{useState,useEffect} from 'react'
import {useForm} from "react-hook-form"
function BatchReport1() {
  
  const [slinks,setslinks] = useState([]);
  const [err,setErr]=useState("");
  const [show,setShow]=useState(true)
  let {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm()
  useEffect(()=>{
    fetch("http://localhost:4000/posts")
    .then(response=>response.json())
    .then(slinks=>setslinks(slinks))
    .catch(err=>{
      if(err.response){
          setErr(err.message)
      }
      else if(err.request){
          setErr(err.message)
      }
      else{
          setErr(err.message)
      }
      
  });
},[]);
const submitReview=(data)=>{
    setShow(false)
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
      <h3>Assignments Submission</h3>
      <br />
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          slinks.map((data)=><div>
            <div className='card'>
              <div className='card-body'>
                <div className='col' >
                <h3 onClick={() => handleCardClick(data.text)}>Assignment No - {data.number}</h3>
                    {show &&
                        <div className='row'>
                        <div className='col-11.col-sm-8.col-md-6 mx-auto '>
                            <form onSubmit={handleSubmit(submitReview)}>
                            <div className='mb-3 text-center'>
                                <label htmlFor="name" style={{marginRight:"5px",marginLeft:"37px"}}>Marks</label>
                                <input type="number" id="number" {...register("number",{required:true})}/>
                                {errors.number?.type==="required" && <p className="text-danger">*marks are required</p>}
                            </div>
                            <div style={{marginTop:"5px"}}>
                                <label htmlFor="name" style={{marginRight:"5px"}}>Suggestion</label>
                                <input type="text" id="text"/>
                            </div>
                            <br />
                            <button className='btn btn-secondary' >Submit</button>
                            </form>
                        </div>
                        </div>
                    }
                    <br />
                    </div>
                    <button className='btn btn-secondary' onClick={()=>setShow(!show)}>Submit Review</button>
                </div>
              </div>
            </div>)
        }
      </div>

    </div>
  )
}

export default BatchReport1