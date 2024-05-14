import React,{useEffect, useState} from "react";
import { json } from "react-router-dom";
import View from './view';
import appcss from './app.module.css';
import Swal from 'sweetalert2';
import validation from "./validation";
import { useNavigate } from "react-router-dom";

function Form() {
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

    // input fild states
    const [number, setNumber]=useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    
    const [error, setError] = useState({})
    
    // data sav in local storage
    useEffect(()=>{
        localStorage.setItem('data',JSON.stringify(data))
    },[data])

    // delete data from LS
    const deleteData=(number)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
                const filteredData=data.filter((element,index)=>{
                    return element?.number !== number
                })
                setData(filteredData);
            }
          })
    }

    // edit form
    const [editForm,setEditForm]=useState(false);

    // id state
    const [id, setId]=useState();

    // handle edit icon
    const handleEdit=(cruddata, index)=>{
        setEditForm(true);
        setId(index);
        setNumber(cruddata.number);
        setName(cruddata.name);
        setEmail(cruddata.email);
    }

    const handleAddPage=(e)=>{
        e.preventDefault();
        nevigate("/addform");
    }

    // searchbar code
    const [query, setQuery] = useState("");
    // end


    // start filter code
    const [statusFilter, setStatusFilter] = useState('All');

    const handleStatusChange = (e) => {
        setQuery(e.target.value);
        setStatusFilter(e.target.value);
    };
    // end filter code

    return(
        <div>
            <button type="submit" className="btn btn-success btn-md" onClick={handleAddPage}>Add New</button>
            <select value={statusFilter} onChange={handleStatusChange}>
                <option value="All" selected>All</option>
                <option value="Pending" className="text-warning">Pending</option>
                <option value="Success" className="text-success">Success</option>
            </select>
            <input className="search-box search-box-div" placeholder="Enter Data" value={query} onChange={(event) => setQuery(event.target.value)}/>
            <br /><br />
            
            <div className={appcss.viewdiv}>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th colSpan="4" class="actionDiv">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <View data={data} query={query} deleteData={deleteData} handleEdit={handleEdit} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Form;