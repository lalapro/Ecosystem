const express = require('express');
const db = require('../../db/index.js');

const handleCategories = (req, res) => {
  let username = req.query.username;
  let selectUserID = `SELECT ID FROM User WHERE Username = '${username}'`;
  db.query(selectUserID, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up your information ${err}`);
    } else {
      let User_ID = results[0].ID;
      let selectCats = `SELECT Category FROM CategoryDeets WHERE User_ID = ${User_ID}`;
      db.query(selectCats, null, (err, results) => {
        if (err) {
          res.status(404).send(`We encountered an error looking up the categories ${err}`);
        } else {
          res.status(201).send(results);
        }
      })
    }
  })
}

const handleNewCategories = (req, res) => {
  let username = req.body.username;
  let category = req.body.category;

  let selectUserID = `SELECT ID FROM User WHERE Username = '${username}'`;
  db.query(selectUserID, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up your information ${err}`);
    } else {
      let User_ID = results[0].ID;
      let insertCategory = `INSERT INTO CategoryDeets (ID, Category, Completion_Points, User_ID, Reward_ID, Marker_ID) VALUES (NULL, '${category}', NULL, '${User_ID}', NULL, NULL)`;
      db.query(insertCategory, null, (err, results) => {
        if (err) {
          res.status(404).send(`We encountered an error creating the category ${err}`);
        } else {
          res.status(201).send(results);
        }
      })
    }
  })
}

module.exports = {
  handleCategories,
  handleNewCategories
}
