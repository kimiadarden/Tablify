import React, { useEffect } from "react";
import { useEmployeeContext } from "../../utils/GlobalState";
import API from "../../utils/API";

function EmployeeList(){
    
  const [state, dispatch] = useEmployeeContext()

  const getEmployees = () => {
    dispatch({type: "LOADING"});
    API.getEmployees()      
      .then(results => {
        dispatch({
          type: "UPDATE_EMPLOYEES",
          employees: results.data
        })
      })
      .catch(err => console.log(err))
  }

  useEffect( () => {
    getEmployees()
  }, []);

  return(
    <div>
      {state.employees.length ? (
        <div>
          {state.employees.map( employee => (
            <ul class="list-group">
              <li className="list-group-item">{employee._id}</li>
              <li className="list-group-item">{employee.name}</li>
              <li className="list-group-item">{employee.position}</li>
              <li className="list-group-item">{employee.phonenumber}</li>
              <li className="list-group-item">{employee.email}</li>
            </ul>
          ))}
        </div>    
      ) : (
        <div>
            <h1>No current employees in the database, please add some people!</h1>
        </div>
      )}
    </div>
  )


}

export default EmployeeList;