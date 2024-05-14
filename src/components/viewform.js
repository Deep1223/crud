import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Viewform=()=>{
    const nevigate = useNavigate();

    const { state } = useLocation();
    const {number,name,email} = state;

    return( 
        <div>
            <h3>Number : {number}</h3>
            <h3>Name : {name}</h3>
            <h3>Email : {email}</h3>
            <br /><br />
            <button type="submit" onClick={()=>nevigate("/form")} className="btn btn-success btn-md backbtn">Back</button>
        </div>
    )
}


export default Viewform;