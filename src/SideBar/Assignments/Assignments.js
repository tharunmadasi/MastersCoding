import React, { useState } from 'react'
import {useForm} from 'react-hook-form'

function Assignments() {

  let {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();

  let [counter,setCounter] = useState(1);

  let incrementCounter=()=>{
    setCounter(counter+1)
  }

  const onSubmit=(data)=>{
    console.log(data);
    incrementCounter()
  }



  return (
    <div>
      <h2 className='text-primary'>Assignments</h2>
      <div className="form1">
                  <div className="row">
                            <div className="col-11.col-sm-8.col-md-6 mx-auto l1">
<form onSubmit={handleSubmit(onSubmit)}>

        <div className='form-control inp'>
          <label>Assignment-{counter} Link : </label>
          <input type='url' id='url' {...register("url",{required:true})} />
          {errors.url?.type === "required" && (
            <p className="text-danger">Assignment-{counter} Link is required.</p>
          )}
        </div>

        <button type='submit' className='btn btn-info mt-3'>Upload</button>

      </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Assignments