// import React, { useEffect } from "react";
// import { AuthUserContext, withAuthorization } from '../../components/Session';
// // import { useEmployeeContext } from "../../utils/GlobalState";
// import API from "../../utils/API";

// // import Jumbotron from '../../components/Jumbotron'
// // import EmployeeList from '../../components/EmployeeList'

// const EmployeePage = () => (
//   <AuthUserContext.Consumer>
//     {authUser => (
//       <EmployeesPage />
//     )}
//   </AuthUserContext.Consumer>
// );

// function EmployeesPage(){
    
//   // const [state, dispatch] = useEmployeeContext()
//   state = {
//     employees: []
//   }
//   const getEmployees = () => {
//     // dispatch({type: "LOADING"});
//     API.getEmployees()      
//       .then(results => {
//         // dispatch({
//         //   type: "UPDATE_EMPLOYEES",
//         //   employees: results.data
//         // })
//         this.setstate({ employees: results.data })
//       })
//       .catch(err => console.log(err))
//   }

//   useEffect( () => {
//     getEmployees()
//   }, []);

//   return(
//     <div>
//       {state.employees.length ? (
//         <div>
//           {state.employees.map( employee => (
//             <ul class="list-group">
//               <li className="list-group-item">{employee._id}</li>
//               <li className="list-group-item">{employee.name}</li>
//               <li className="list-group-item">{employee.position}</li>
//               <li className="list-group-item">{employee.phonenumber}</li>
//               <li className="list-group-item">{employee.email}</li>
//             </ul>
//           ))}
//         </div>    
//       ) : (
//         <div>
//             <h1>No current employees in the database, please add some people!</h1>
//         </div>
//       )}
//     </div>
//   )


// }


// const condition = authUser => !!authUser;

// export default withAuthorization(condition)(EmployeePage);

  
import React from 'react';
import { AuthUserContext, withAuthorization } from '../../components/Session';
import Jumbotron from '../../components/Jumbotron'
import EmployeeList from '../../components/EmployeeList'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <EmployeePage />
    )}
  </AuthUserContext.Consumer>
);

function EmployeePage() {
  


  return(
    <div>
      <Jumbotron>
        Welcome to the EmployeePage
        <EmployeeList />
      </Jumbotron>
    </div>
  )
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);