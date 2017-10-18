const express = require('express');
const db = require('../../db/index.js');
var Promise = require("bluebird");


const getMapMarkers = (req, res) => {
  let userID = req.query.userID;

  console.log('gget map maerksers 1!!')

  // `SELECT * FROM Marker m JOIN Tasks t WHERE m.User_ID = t.User_ID AND m.User_ID = ${userID}`
  let query = `SELECT * FROM Marker WHERE User_ID = ${userID}`;
  let innerQuery = `SELECT * FROM Tasks WHERE User_ID = ${userID}`;
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the locations ${err}`);
    } else {
      // console.log(results)
      let length = results.length;
      let count = 0;
      if (length === 0 ) {
        res.send();
      } 
      for (let i = 0; i < results.length; i++) {
        let marker = results[i]
        db.query(innerQuery, null, (err, tasks) => {
          if (err) {
            res.status(404).send(`We encountered an error looking up the tasks ${err}`);
          } else {
            tasks.forEach(task => {
              if(task.Marker_ID === marker.Marker_ID) {
                marker.tasks = marker.tasks || [];
                marker.tasks.push(task)
              }
            })
            count++;
            console.log('count')
            if (count === length) {
              res.send(results)
            }
          }
        });
      }
    }
  })

}



module.exports = getMapMarkers;
