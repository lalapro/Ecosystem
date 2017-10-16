const express = require('express');
const db = require('../../db/index.js');

const getMapMarkers = (req, res) => {
  let userID = req.query.user;

  console.log('gget map maerksers 1!!')

  // `SELECT * FROM Marker m JOIN Tasks t WHERE m.User_ID = t.User_ID AND m.User_ID = ${userID}`
  let innerQuery = `SELECT * FROM Tasks WHERE User_ID = ${userID}`;
  let query = `SELECT * FROM Marker WHERE User_ID = ${userID}`;
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the locations ${err}`);
    } else {
      // console.log(results)

     results.forEach(marker => {
       db.query(innerQuery, null, (err, tasks) => {
          if (err) {
            res.status(404).send(`We encountered an error looking up the tasks ${err}`);
          } else {
            // if(marker.Marker_ID === tasks.Marker_ID) {
            //   marker.tasks = tasks;
            // }
            tasks.forEach(task => {
              if(task.Marker_ID === marker.Marker_ID) {
                marker.tasks = tasks;
              }
            })
          }
        });
      });
      setTimeout(() => res.send(results), 500);
    }
  })
}



module.exports = getMapMarkers;
