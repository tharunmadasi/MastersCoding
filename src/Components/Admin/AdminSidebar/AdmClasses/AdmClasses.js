import React,{useState} from "react";
import {useForm} from "react-hook-form"
import axios from "axios";

function Classes(){
    let [value,setvalue]=useState("")
    let {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();
    let [counter, setCounter] = useState(1);

  let incrementCounter = () => {
    setCounter(counter + 1);
  };
    let submitLink=(data)=>{
        axios.post("http://localhost:3500/classes/upload", data).then((res) => {
            console.log(res.data);
        }).catch
            (err => console.log("Error in uploading assignment link", err));
        incrementCounter();

    };
    return(
        <div>
            <div className="row">
                <div className="col-11.col-sm-8.col-md-6 mx-auto">
                    <form onSubmit={handleSubmit(submitLink)}>
                        <div className="mb-3 text-center display-5" style={{fontFamily:"cursive"}}>
                            <label>Class-{counter} Link : </label>
                            <input
                            type="url"
                            id="url"
                            {...register("url", { required: true })}
                            />
                            {errors.url?.type === "required" && (
                            <p className="text-danger">
                                Class-{counter} Link is required.
                            </p>
                            )}
                        </div>
                        <div className="mb-3 text-center display-5" style={{fontFamily:"cursive"}}>
                            <label>Topic Name :</label>
                            <input
                            type="text"
                            id="text"
                            {...register("text", { required: true })}
                            />
                            {errors.text?.type === "required" && (
                            <p className="text-danger">
                                Topic Name is required.
                            </p>
                            )}
                        </div>
                        <button type="submit" className="btn btn-secondary">Submit Class Link</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Classes;