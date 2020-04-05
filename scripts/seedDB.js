const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/tablify"
);

const MenuSeed = [
  {
    item:'wagyu meatballs',
    category:'Appetizer',
    price:'23.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'pan seared scallops',
    category:'Appetizer',
    price:'24.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'Lobster risotto',
    category:'Appetizer',
    price:'25.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'beef wellington',
    category:'Entre',
    price:'49.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'roasted rack of lamb',
    category:'Entre',
    price:'39.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'crispy skin salmon',
    category:'Entre',
    price:'37.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'sticky toffee pudding',
    category:'Dessert',
    price:'19.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  },
  {
    item:'cranberry souffle',
    category:'Dessert',
    price:'17.99',
    cook_time:'10',
    createdAt:Date(),
    upDatedAt:Date()
  }
];

db.Menu
  .remove({})
  .then(() => db.Menu.collection.insertMany(MenuSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
