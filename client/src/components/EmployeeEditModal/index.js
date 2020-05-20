import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import API from '../../utils/API'
import { set } from 'mongoose';
// import EmployeeContext from '../../utils/EmployeeContext'

function EmployeeModal(props) {
    const [show, setShow] = useState(false); 
    const [checks, setChecks] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [error, setError] = useState("")
    const [employee, setEmployee] = useState({
      _id: props.employee._id,
      employeeId: props.employee.employeeId,
      name: props.employee.name,
      position: props.employee.position,
      phonenumber: props.employee.phonenumber,
      email: props.employee.email
    })


    function handleInputChange(event){
      const { name, value } = event.target;
      setError("");
      setEmployee({...employee, [name]: value})
      if ( name === "employeeId"){
        if(value === ""){
          setError("Employee ID can't be empty")
          setChecks(true)
        }else if (isNaN(value * 1)){
          setError("Employee ID needs to be a number")
          setChecks(true)
        }
        else {
          setError("")
          setChecks(false)
        }
      }
      if(name === "phonenumber"){
        if(value.length === 9 && !isNaN(value * 1)){
          setChecks(false)
          setError("")
        } 
        else if(value.length === 10 && !isNaN(value * 1)){
          setChecks(false)
          setError("")
        }
        else if(value.length < 9 && !isNaN(value * 1)){
          setChecks(true)
          setError("The phone number needs to be at least 9 numbers")
        }  
        else if(value.length > 10 && !isNaN(value * 1)){
          setChecks(true)
          setError("The phone number can't exceed 10 numbers")
        }         
        else{
          setError("Please check your telephone formatting, no hyphens or paranthesis")
          setChecks(true)
        }   
      }
      if(name === "email"){
        if(value.includes("@") && value.includes(".")){
          setChecks(false)
          setError("")
        }
        else{
          setChecks(true)
          setError("Please check the email formatting")
        }
      }
    }

    function handleSubmit (id, employee){
        API.changeEmployeeInfo(id, employee)
          .then(result =>{
          handleClose()
          props.getEmployees()
        })
    }

    return (
      <div>
        <Button variant="primary" className="mt-0" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group text-center">
                <input
                style={{marginTop: "5%"}}
                className="input"
                type="text"
                name= "employeeId"
                value={employee.employeeId}
                onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                type="text"
                name="name"
                value={employee.name}
                onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                type="text"
                name="position"
                value={employee.position}
                onChange={handleInputChange}               
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                type="text"
                name="phonenumber"
                value={employee.phonenumber}
                onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                type="text"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
                />
              </div>
            </form>
            <div>{error}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" disabled={checks} onClick={() => handleSubmit(employee._id, employee)}>
              Update Employee
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default EmployeeModal;