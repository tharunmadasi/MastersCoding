import axios from 'axios'
import React ,{useState,useEffect}from 'react'

function Classes() {

  let [Links,setLinks]=useState([])
  let [err,setErr]=useState("")
  useEffect(()=>{
    axios
      .get("http://localhost:3500/classes/AllClasses")
      .then((res) => {
        setLinks(res.data.classes);
      })
      .catch((err) => console.log(err));
  }, []);
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
                  <p className='display-5'> Topic Name - {data.topic}</p>
                </div>
              </div>
            </div>))}
      </div>
    </div>
  )
}

export default Classes