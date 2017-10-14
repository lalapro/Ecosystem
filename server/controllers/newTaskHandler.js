const express = require('express');
const db = require('../../db/index.js');

const handlenNewTask = (req, res) => {
  let Title = req.body.title;
  let Description = req.body.description;
  let Date = req.body.date;
  let Start = req.body.startTime;
  let End = req.body.endTime;
  let Frequency = req.body.frequency;
  let Days = req.body.days;
  //pull category_ID and marker_ID
  let Category = req.body.category;
  let Marker = req.body.location;
  let Username = req.body.username;
  let selectUsername = `SELECT ID FROM User WHERE Username = '${Username}'`;
  let selectCategory = `SELECT ID FROM CategoryDeets WHERE Category = '${Category}'`;
  let selectMarker = `SELECT ID FROM Marker WHERE Title = '${Marker}'`;

  db.query(selectUsername, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up your information ${err}`);
    } else {
      let User_ID = 2;
      // results[0].ID || 
      db.query(selectCategory, null, (err, results) => {
        if (err) {
          res.status(404).send(`We encountered an error looking up the category ${err}`);
        } else {
          let Category_ID;
          results[0] ? Category_ID = results[0].ID : Category_ID = 'undefined';
          db.query(selectMarker, null, (err, results) => {
            if (err) {
              res.status(404).send(`We encountered an error looking up the location ${err}`);
            } else {
              let Marker_ID;
              results[0] ? Marker_ID = results[0].ID : Marker_ID = 'undefined';
              let insert = `INSERT INTO Tasks (ID, Title, Description, Completion, Start, End, Frequency, Days, User_ID, Category_ID, Marker_ID) VALUES (null, '${Title}', '${Description}', null, '${Start}', '${End}', '${Frequency}', '${Days}', '${User_ID}', '${Category_ID}', '${Marker_ID}')`
              db.query(insert, null, (err, results) => {
                if (err) {
                  res.status(404).send(`We encountered an error creating the task ${err}`);
                } else {
                  res.status(201).send(results);
                }
              })
            }
          })
        }
      });
    }
  })  
}

module.exports = handlenNewTask;