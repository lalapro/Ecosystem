const express = require('express');
const db = require('../../db/index.js');

const getMapMarkers = (req, res) => {
  let userID = req.query.user;

  console.log('gget map maerksers 1!!')

  let query = `SELECT * FROM Marker WHERE User_ID = ${userID}`;
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the locations ${err}`);
    } else {
      console.log(results[0]);
      res.status(201).send(results);
    }
  })
}


module.exports = getMapMarkers;
