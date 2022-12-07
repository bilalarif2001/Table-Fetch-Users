import React from "react";
import { useState, useEffect } from "react";
import logo from '../logo.svg';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import warningimg from '../warning.svg'
import bgImg from '../bg.jpeg'

function Form() {

  const [data,setData]= useState([]);
  const [showLoad,setShowLoad]=useState(false);
  const [warning,setWarning]=useState(false);
  var jsondata;
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => jsondata=json)

  function fetchdata() {
    
   setShowLoad(true)

   setTimeout(() => {setData(jsondata)}, 5000)
   
   if (data.length!==0){
    setShowLoad(false);
    setWarning(true);
   }

  }

   useEffect(()=>{
      setShowLoad(false);
   },[data.length])
  function refreshPage() {

   clearTimeout();
    setData([]);
    
    

  }


  return (
   <div>
     <div style={{backgroundImage:`url(${bgImg})`,width:"100%",height:"100%",position:"absolute",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    <div className="container bg-white p-0 shadow-lg rounded-2">
    <table className="table mt-5 shadow-lg table-hover text table-striped text-danger" style={{fontSize: "15px",letterSpacing:"1px", fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif, sans-serif, Arial, sans-serif"}}>
        <thead className=" text-white bg-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Company</th>
            <th scope="col">View Profile</th>
          </tr>
        </thead>
        <tbody id="table" style={{fontWeight:"500"}}>
          {data.length===0?<tr>
            <td>No ID</td>
            <td>No Name</td>
            <td>No Email</td>
            <td>No Address</td>
            <td>No Company</td>
            <td>No Profile</td>
          </tr>:
          data.map(data=>(
      <tr key={data.id}>
       <th scope="row">{data.id}</th>
       <td>{data.name}</td>
       <td>{data.email}</td>
       <td>{data.address.street}, {data.address.city}, {data.address.zipcode}</td>
       <td>{data.company.name}</td>
       <td><a href="https://github.com/bilalarif2001" className="btn btn-secondary px-2 rounded-0" target="_blank" rel="noreferrer">View Profile</a></td>
     </tr>))}
  
     
        </tbody>
      </table>
    {/* Modal for Fetching data */}
    <div>
    <Modal show={showLoad} style={{letterSpacing:"0.5px"}}>
      <Modal.Header>
        <Modal.Title>Fetching Data...</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
      <h6 className="my-3">Please wait while we fetch data from the server 😉</h6>
        <img src={logo} className="App-logo" alt="logo" />
      </Modal.Body>
    </Modal>
  </div>


{/* Modal for Displaying error if data is already fetched */}
  <div>
    <Modal show={warning} style={{letterSpacing:"0.5px"}}>
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img src={warningimg} alt="logo" className="col-3"></img>
        <h6 className="mb-3">Data has been already fetched!</h6>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={()=>setWarning(false)}>Close</button>
      </Modal.Footer>
    </Modal>
  </div>
     
    
      <button className="btn btn-warning m-3" onClick={fetchdata}>Fetch Data</button>
      <button className="btn btn-danger " onClick={refreshPage}>Remove Data</button>
     
</div>
   </div>
   </div>
  )
}


export default Form
