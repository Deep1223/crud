import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect} from "react";
import {Icon} from 'react-icons-kit';
import {trash} from 'react-icons-kit/feather/trash';
import {edit} from 'react-icons-kit/feather/edit';
import {check} from 'react-icons-kit/feather/check';
import {eye} from 'react-icons-kit/feather/eye';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const View = ({data,deleteData,query}) => {
    const nevigate = useNavigate();

    const handleView=(data)=>{
        const viewnumber=data.number;
        const viewname=data.name;
        const viewemail=data.email;
        
        nevigate('/viewform',{state : {number : viewnumber, name : viewname, email : viewemail}});
    }

    const handleEdit = (number, name, email) => {
        localStorage.setItem('number',number);
        localStorage.setItem('name',name);
        localStorage.setItem('email',email);
        nevigate('/editform');
    }

    // start status code
    const [member, setStatus] = useState([data]);

    const hendlememberData = (cruddata, index) => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your Data has been updated successfully.',
            }).then((result) => {
            if (result.isConfirmed) {
                cruddata.member = '1';

                let datastatus = [...data]
        
                localStorage.setItem('data',JSON.stringify(datastatus))
        
                setStatus(datastatus);
            }
        })
    }
    // end status code

    return (
        (data.length > 0 ? data.filter((cruddata,index) => {
            if (query === "") {
              return cruddata;
            } else if (cruddata.number == query) {
              return cruddata;
            } else if (cruddata.name.toLowerCase().includes(query.toLowerCase())) {
                return cruddata;
            } else if (cruddata.email.toLowerCase().includes(query.toLowerCase())) {
                return cruddata;
            } else if (cruddata.member == 0 && "Pending".toLowerCase().includes(query.toLowerCase()) || cruddata.member == 1 && "Success".toLowerCase().includes(query.toLowerCase())) {
                return cruddata;
            } else if (cruddata.member == 0 && "All".toLowerCase().includes(query.toLowerCase()) || cruddata.member == 1 && "All".toLowerCase().includes(query.toLowerCase())) {
                return cruddata;
            }
        }).map((cruddata,index)=>{
            
                return (
                <tr key={cruddata.number}>
                    {/* <td>{index+1}</td> */}
                    <td>{cruddata.number}</td>
                    <td>{cruddata.name}</td>
                    <td>{cruddata.email}</td>
                    <td className={cruddata.member == "0" ? "text-warning" : "text-success"}>{cruddata.member == "0" ? "Pending" : "Success"}</td>
                    <td className="delete-btn" >
                        <Icon class="btnpointer" icon={trash} onClick={()=>deleteData(cruddata.number)} />
                    </td>
                    <td className="edit-btn" >
                        <Icon class="btnpointer" icon={edit} onClick={()=>handleEdit(cruddata.number,cruddata.name,cruddata.email)} />
                    </td>
                    <td className="view-btn" >
                        <Icon class="btnpointer" icon={eye} onClick={()=> handleView(cruddata, index)} />
                    </td>
                    <td className="member-btn">
                        {cruddata.member==0 && <Icon class="btnpointer" icon={check} onClick={()=>hendlememberData(cruddata, index)} />}
                    </td>
                </tr>)
            } 
        ) : <tr><td colSpan="5"><center>Data Not Found</center></td></tr>  
        ) 
    )
    
}

export default View;