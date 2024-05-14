import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import validation from "./validation";
import Swal from 'sweetalert2';

function Edit(){
    const nevigate = useNavigate();

     // getting value from localstorage
     const getDataFormLS=()=>{
        const LSdata = localStorage.getItem('data');
        if(LSdata){
            return JSON.parse(LSdata);
        }
        else{
            return []
        }
    }

    // main array of objects state || data state || data array
    const [data, setData]=useState(getDataFormLS());
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState({})

    useEffect(() => { 
        setNumber(localStorage.getItem('number'));
        setName(localStorage.getItem('name'));
        setEmail(localStorage.getItem('email'));
    },[]);

    const handleEditSubmit = (e) => {
        e.preventDefault();

        if(number!="" && name!="" && email!="") {

        Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your Data has been Update successfully.',
        }).then((result) => {
            nevigate('/');
        })

        let details = [...data];
        let detail = details[number-1];
        detail.number = number;
        detail.name = name;
        detail.email = email;

        details[number-1] = detail;
        setData(details);
        setNumber('');
        setName('');
        setEmail('');
        }
        else{
            setError(validation(data));
        }
    } 

     // data save in local storage
    useEffect(()=>{
        localStorage.setItem('data',JSON.stringify(data))
    },[data])

    const setNameAlert = (event) => { 
        const inutText = event.replace(/[^a-zA-Z]/g, '');
        setName(inutText); 
    };

    const setEmailAlert = (event) => { 
        // alert(event); 
        setEmail(event);
    };

    return(
        <div>
            <form className="form-group" onSubmit={(e) => handleEditSubmit(e)}>
            <input type="text" readonly="readonly" className="form-control" name="number" onChange={(e)=>setNumber(e.target.value)} value={number} /> 
                <lable>Name</lable>
                <input type="text" className="form-control" name="name" onChange={(e)=>setName(e.target.value)} value={name} onKeyUp={(e)=>setNameAlert(e.target.value)} />
                {name=="" && <p style={{color: "red", fontSize: "13px"}}>{error.name}</p>}
                <lable>email</lable>
                <input type="email" className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} onKeyUp={(e)=>setEmailAlert(e.target.value)} />
                {email=="" && <p style={{color: "red", fontSize: "13px"}}>{error.email}</p>}
                <br></br>
                <button type="submit" className="btn btn-success btn-md">Update</button>
                <button type="submit" className="btn btn-success btn-md backbtn" onClick={()=>nevigate('/')}>Back</button>
            </form>
        </div>
    )
}  

export default Edit;



