const express = require('express');
const db = require('../../db/index.js');

const handleCategories = (req, res) => {
  let User_ID = req.query.userID;
  console.log(User_ID)
  let selectCats = `SELECT ID, Category FROM CategoryDeets WHERE User_ID = ${User_ID}`;
  db.query(selectCats, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the categories ${err}`);
    } else {
      console.log('cat get', results)
      res.status(201).send(results);
    }
  })
}

const handleNewCategories = (req, res) => {
  let User_ID = req.body.userID;
  let category = req.body.category;

  // let selectUserID = `SELECT ID FROM User WHERE User_ID = '${userID}'`;
  // db.query(selectUserID, null, (err, results) => {
  //   if (err) {
  //     res.status(404).send(`We encountered an error looking up your information ${err}`);
  //   } else {
      // let User_ID = results[0].ID;
  let insertCategory = `INSERT INTO CategoryDeets (ID, Category, Completion_Points, User_ID, Reward_ID, Marker_ID) VALUES (NULL, '${category}', NULL, '${User_ID}', NULL, NULL)`;
  db.query(insertCategory, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error creating the category ${err}`);
    } else {
      console.log('cats', results)
      res.status(201).send(results);
    }
  })
}

module.exports = {
  handleCategories,
  handleNewCategories
}
