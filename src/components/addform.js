import { useForm } from "react-hook-form";
import React,{useEffect, useState} from "react";
import appcss from './app.module.css';
import validation from "./validation";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import validator from "validator";

// start auto increment number
function getLastIdFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    if (storedData.length === 0) {
      return 0; // Return 0 if there are no stored data
    }
    
    // Find the maximum ID value in the stored data
    const maxId = Math.max(...storedData.map(item => item.number));
    return maxId;
}
// end auto increement number

function Addform() {
     
    const { register, handleSubmit, formState: { errors } } = useForm();

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

    // start auto increment number
    useEffect(() => {
        // Retrieve the last ID from localStorage when the component mounts
        const id = getLastIdFromLocalStorage();
        setNumber(id+1);
    }, []);
    // end auto increment number

    // input fild states
    const [number, setNumber]=useState('');
    // const [number, setNumber]=useState(data.length + 1);
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [member, setMember]=useState(0);
    
    const [error, setError] = useState({});

    // form submit event
    const handleAddDataSubmit=(e)=>{
        e.preventDefault();
        
        if(number!="" && name!="" && email!="") {

        Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your Data has been Insert successfully.',
        }).then((result) => {
            nevigate('/');
        })

        // create an object
        let cruddata={
            number,
            name,
            email,
            member
        }

        setData([...data,cruddata]);
        setNumber(number);
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
        setEmail(event);
    };

    return(
        <div>
            <form className="form-group" onSubmit={handleAddDataSubmit}>
                <lable>No</lable>
                <input type="text" readonly="readonly" className="form-control" name="number" onChange={(e)=>setNumber(e.target.value)} value={number} /> 
                <lable>Name</lable>
                <input type="text" className="form-control" name="name" onChange={(e)=>setName(e.target.value)} value={name} onKeyUp={(e)=>setNameAlert(e.target.value)} />
                {name=="" && <p style={{color: "red", fontSize: "13px"}}>{errors.namevalidation && <span>Name is required</span>}</p>}
                <lable>email</lable>
                <input type="email" className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} onKeyUp={(e)=>setEmailAlert(e.target.value)} />
                {email=="" && <p style={{color: "red", fontSize: "13px"}}>{errors.emailvalidation && <span>Email is required</span>}</p>}
                <input type="hidden" name="member" value={member}/>
                <br></br>
                <button type="submit" className="btn btn-success btn-md">submit</button>
                <button type="submit" className="btn btn-success btn-md backbtn" onClick={()=>nevigate('/')}>Back</button>
            </form>

        </div>
    )
}

export default Addform;
