import React,{useState} from 'react'
import { useEffect } from 'react'
import './Assignment.css'
function Assignments() {
  let [links,setLinks]=useState([])
  let [show,setShow]=useState(true);
  useEffect(()=>{
    fetch("http://localhost:8000/posts")
    .then(response=>response.json())
    .then(links=>setLinks(links))
  },[]);
  return (
    <div className="Links">
      {   show &&
             <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
                {
                    links.map((data)=><div className='col'>
                        <div className="card">
                            <div className="card-body">
                              <p className='display-3 name'>Assignment - 1:</p>
                              <p className="lead fs-4">{data.url}</p>
                                
                            </div>
                        </div>
                    </div>)
                }
            </div> 
             }
            { <button className='displaylinks' type="button" onClick={()=>setShow(!show)}>Show Links / Hide Links</button> }
    </div>
  )
}

export default Assignments