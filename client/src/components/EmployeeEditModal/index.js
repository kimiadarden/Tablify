import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import API from '../../utils/API'

function EmployeeModal(props) {
    const [show, setShow] = useState(false); 

    const employeeIdRef = useRef()
    const nameRef = useRef()
    const positionRef = useRef()
    const phonenumberRef = useRef()
    const emailRef = useRef()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit (event){
      event.preventDefault();
      const newEmployee = {
        employeeId: parseInt(employeeIdRef.current.value),
        name: nameRef.current.value,
        position: positionRef.current.value,
        phonenumber: parseInt(phonenumberRef.current.value),
        email: emailRef.current.value
      }

      console.log(newEmployee)
      API.createEmployee(newEmployee)
        .then( res => {
          console.log(res)
        })
      handleClose()
    }

    return (
      <>
        <Button variant="primary" className="mt-4" onClick={handleShow}>
          Edit {props.employee.name}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add an employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group text-center">
                <input
                style={{marginTop: "5%"}}
                className="input"
                ref={employeeIdRef}
                type="text"
                value = {props.employee.employeeId}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                ref={nameRef}
                type="text"
                value = {props.employee.name}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                ref={positionRef}
                type="text"
                value = {props.employee.position}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                ref={phonenumberRef}
                type="text"
                value = {props.employee.phonenumber}
                />
              </div>
              <div className="form-group text-center">
                <input
                style={{marginBottom: "5%"}}
                className="input"
                ref={emailRef}
                type="text"
                value = {props.employee.email}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Update Employee
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default EmployeeModal;