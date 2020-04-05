import React, { createContext, useReducer, useContext } from "react";
const EmployeeContext = createContext();
const { Provider } = EmployeeContext;

const reducer = (state, action) => {
  switch (action.type) {
  case "SET_CURRENT_EMPLOYEE":
    return {
      ...state,
      currentEmployee: action.employee,
      loading: false
    };

  case "UPDATE_EMPLOYEES":
    return {
      ...state,
      employees: [...action.employees],
      loading: false
    };

  case "ADD_EMPLOYEE":
    return {
      ...state,
      employees: [action.employee, ...state.employees],
      loading: false
    };

  case "REMOVE_EMPLOYEE":
    return {
      ...state,
      employees: state.employees.filter((employee) => {
        return employee._id !== action._id; 
      })
    };

  case "LOADING":
    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }
};

const EmployeeProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    employees: [],
    currentEmployee: {
      _id: 0,
      employeeid: 0,
      name: "",
      position: "",
      phonenumber: 0,
      startDate: "",
      email: "",
    },
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};

export { EmployeeProvider, useEmployeeContext };
