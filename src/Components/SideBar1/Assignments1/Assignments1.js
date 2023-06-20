import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Assignments1() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [counter, setCounter] = useState(1);

  let incrementCounter = () => {
    setCounter(counter + 1);
  };

  const onSubmit = (data) => {
    console.log(data);
    incrementCounter();
  };

  return (
    <div>
      <h1>Review of assignments of students</h1>
     
    </div>
  );
}

export default Assignments1;
