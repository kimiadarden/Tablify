const db = require("../models");

module.exports = {
  findAllEmployee: function(req, res) {
    db.Employee
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeEmployeeById: function(req, res) {
    db.Employee
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  findAllDishes: function(req, res) {
    console.log("star finding all dish")
    db.Menu
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllTables: function(req, res) {
    db.Diningroom
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  findTableById: function(req, res) {
    db.Diningroom
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
 
  findTableHistoryById: function(req,res){
    db.TableHistory
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  // createNewTable here means the tables be created by user should store in here
  createNewTable: function(req, res) {
    console.log("in the createNewTable function create dininiroom")
    db.Diningroom
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  // createTable here means the table be occupied by customer and finished the order
  createTableHistoryData: function(req, res) {
    db.TableHistory
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createNewDish: function(req, res) {
    console.log("in createDish finction")
    db.Menu
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  

  updateTableHistory: function(req, res) {
    db.TableHistory
      .findOneAndUpdate({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  removeDishById: function(req, res) {
    db.Menu
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  removeTableById: function(req,res) {
    db.Diningroom
    .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
