import { useState } from "react";
import { AssignmentContext } from "./AssignmentContext";

function AssignmentStore({children}){

    let [assignmentCounter,setAssignmentCounter]=useState(1);

    const assignmentNo=()=>{
        setAssignmentCounter(assignmentCounter+1);
    }

    return(
        <AssignmentContext.Provider value={[assignmentCounter,assignmentNo]}>
            {children}
        </AssignmentContext.Provider>
    )
}

export default AssignmentStore;