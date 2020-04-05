import axios from "axios";

export default {
  // Gets all tables
  getTables: function() {
    return axios.get("/api/table");
  },
  // Gets the table with the given id
  getTable: function(id) {
    return axios.get("/api/table/" + id);
  },
  // Gets all items from Menu collection
  getMenu: function(){
    console.log("go to axios")
      return axios.get("/api/menu")
  },
  
  findTableHistoryById: function(id){
    return axios.get("/api/tablehistory/" + id);
  },
  
  // Create new table in diningroom
  createNewTable: function(tableData){
      console.log("call axios")
      return axios.post("/api/table", tableData)
  },

  // Create new dish
  createNewDish: function(newDish){
      console.log("start create new dish")
      return axios.post("/api/menu", newDish)
  },

  // Create new table data if change to occupied
  createTableHistory: function(newCustomer){
    console.log("newCustomer: ",newCustomer)
      return axios.post("/api/tablehistory", newCustomer)
  },

  // Change table status
  changeTableStatus: function(id, newStatus){
      return axios.put("api/tablehistory/" + id, newStatus)
  },

  // Deletes the book with the given id
  deleteDish: function(id) {
    return axios.delete("/api/menu/" + id);
  },
  // Deletes the existing table with the given id
  deleteTable: function(id) {
      return axios.delete("/api/table/" + id)
  },

  getEmployees: function(){
    return axios.get("/api/employee")
  },
  

  createEmployee: function(employee){
    return axios.post("/api/employee", employee)
  },

  removeEmployee: function(id) {
    return axios.delete("/api/employee/" + id)
  },

  changeEmployeeInfo: function(id, employee){
    return axios.put("/api/employee/" +id, employee)

  }

};