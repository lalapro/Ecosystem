const express = require('express');
const db = require('../../db/index.js');

const handleMarkers = (req, res) => {
  let username = req.query.username;
  let selectUserID = `SELECT ID FROM User WHERE Username = '${username}'`;
  db.query(selectUserID, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up your information ${err}`);
    } else {
      let User_ID = results[0].ID;
      let selectCats = `SELECT * FROM Marker WHERE User_ID = ${User_ID}`;
      db.query(selectCats, null, (err, results) => {
        if (err) {
          res.status(404).send(`We encountered an error looking up the locations ${err}`);
        } else {
          res.status(201).send(results);
        }
      })
    }
  })
}


module.exports = handleMarkers;
