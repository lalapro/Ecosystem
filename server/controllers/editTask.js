const express = require('express');
const db = require('../../db/index.js');

const handleEditTask = (req, res) => {
  console.log('EDIT TASK', req.body)
  let Title = req.body.title;
  let Description = req.body.description;
  let Date = req.body.date;
  let Start = req.body.startTime;
  let End = req.body.endTime;
  let Frequency = req.body.frequency;
  let Days = req.body.days;
  //pull category_ID and marker_ID
  let Category = req.body.category;
  let Marker = req.body.markerID;
  let User_ID = req.body.userID;
  let Task_ID = req.body.taskID;

  // let selectCategory = `SELECT ID FROM CategoryDeets WHERE Category = '${Category}'`;
  let updateTask = `UPDATE Tasks SET Task_Title='${Title}', Task_Description='${Description}', Start='${Start}', End='${End}', Frequency='${Frequency}', Days ='${Days}', Category_ID='${Category}', Marker_ID='${Marker}', User_ID='${User_ID}' WHERE Task_ID = '${Task_ID}'`;

  db.query(updateTask, null, (err, results) => {
    if (err) {
      console.log(err)
      res.status(404).send(`We encountered an error looking up the category ${err}`);
    } else {
      console.log('task updated')
      res.send(200)
    }
  })
}


module.exports = handleEditTask;
