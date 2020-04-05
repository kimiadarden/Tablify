import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import EmployeeModal from "../EmployeeModal"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function EmployeeList() {
  const [show, setShow] = useState(false); 
  const [employees, setEmployees] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getEmployees() {
    API.getEmployees()      
      .then(results => {
        setEmployees(results.data)
      })
      .catch(err => console.log(err))
  }
  
  function removeEmployee(id){
    API.removeEmployee(id)
      .then(results =>{
        getEmployees()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getEmployees()
  }, [])

  console.log(employees)
  return(
    <div>
      {employees.length ? (
        <div>
          {employees.map( employee => (
            <>
              <ul className="list-group mt-3" key={employee._id}>
                <li className="list-group-item">{employee.employeeId}</li>
                <li className="list-group-item">{employee.name}</li>
                <li className="list-group-item">{employee.position}</li>
                <li className="list-group-item">{employee.phonenumber}</li>
                <li className="list-group-item">{employee.email}</li>
              </ul>
              <Button variant="danger" onClick={() => removeEmployee(employee._id)}>Remove Employee</Button>{' '}
              <Button variant="primary" className="mt-4" onClick={handleShow}>
                    Edit {employee.name}
              </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add an employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      hello
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Add Employee
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
          ))}
          <div>
            <EmployeeModal />
          </div>
        </div>    
      ) : (
        <div>
            <h1>No current employees in the database, please add some people!</h1>
            <EmployeeModal />
        </div>
      )}
    </div>
  )
}

export default EmployeeList;