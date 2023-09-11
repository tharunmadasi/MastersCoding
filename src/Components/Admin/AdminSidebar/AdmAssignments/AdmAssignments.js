import React, { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import axios from "axios";

function Assignments() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  //state to check the errors in the batch  select input 
  const [batchError,setBatchError] = useState(false);
  
  const onSubmit = (data) => {
    if(data.batch=='select batch') setBatchError(true);
    else{
      data.uploadTStamp = new Date();
      console.log(data);
      axios 
        .post("http://localhost:3500/assignments/upload", data)
        .then((res) => {
          console.log(res.data);
          //DL  & time  
          reset();
        })
        .catch((err) => console.log("Error in uploading assignment link", err));
        setBatchError(false);
    }
  }; 
  //fetch the batch details from the data base and store in the batchOptions below
  const [batchOptions,setBatchOptions] = useState()
  useEffect(()=>{
    //fetch data from Batches ans store in batchOptions
    setBatchOptions(['VNR_2026_B1','VNR_2026_B2','VNR_2026_B3','VNR_2026_B2','VNR_2026_B3','VNR_2026_B2','VNR_2026_B3','VNR_2026_B2','VNR_2026_B3'])
  },[])
  

  return (
    <div>
      <h2 className="text-success mb-5">Assignments</h2>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">

                  <div className="mb-3 row ">
                    {/* select batch */}
                    <select 
                      className="mt-1 d-block col-md-11 mx-auto form-control"
                      name="batch" 
                      id="batch" 
                      {
                        ...register('batch',{
                          required:"Batch is required"
                        })
                      }
                    >
                    <option disabled selected defaultValue='disabled'>select batch</option>
                    {batchOptions?.map((value)=>(
                      <option value={value}>{value}</option>
                    ))}
                    </select>
                    {batchError==true && (
                        <p className="text-danger">{'batch is required'}</p>
                    )}

                    {/* Select DeadLine */}
                    <div className=" d-block col-md-11 mx-auto mt-3 p-0 row form-control">
                      <label 
                        className=" col-md-4 text-start"
                        htmlFor="deadLine"
                      > Dead Line
                      </label>
                      <input
                        className=" col-md-8"
                        type="date"
                        name="deadLine"
                        id="deadLine"
                        {...register('deadLine',{required:"Dead Line is required"})}
                      />
                    </div>
                    {errors.deadLine && (
                        <p className="text-danger">{errors.deadLine.message}</p>
                    )}

                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 row">
                    <label htmlFor="title" className="col-form-label col-sm-4">
                      Assignment title :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        {...register("title", {
                          required: "Assignment Title is required.",
                        })}
                      />
                      {errors.title && (
                        <p className="text-danger">{errors.title.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="url" className="col-form-label col-sm-4">
                      Assignment link :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="url"
                        className="form-control"
                        id="url"
                        {...register("url", {
                          required: "Assignment Link is required.",
                        })}
                      />
                      {errors.url && (
                        <p className="text-danger">{errors.url.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-5 mb-3">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Assignments;
