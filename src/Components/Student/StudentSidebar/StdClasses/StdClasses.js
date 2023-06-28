import React ,{useState,useEffect}from 'react'

function Classes() {
  let [Links,setLinks]=useState([])
  let [err,setErr]=useState("")
  useEffect(()=>{
    fetch("http://localhost:8000/posts")
    .then(response=>response.json())
    .then(Links=>setLinks(Links))
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
  })
    const handleCardClick = (url) => {
      window.open(url, "_blank");
    };
  return (
    <div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          Links.map((data)=>(
            <div
              className="col"
              key={data._id}
              onClick={() => handleCardClick(data.url)}
            >
            <div className="card" style={{width:"300px",marginLeft:"10px"}}>
                <div className="card-body">
                  <p className="display-3 fw-bold" >Class 1</p>
                  <p className='display-5'> Topic Name - {data.text}</p>
                </div>
              </div>
            </div>))}
      </div>
    </div>
  )
}

export default Classes