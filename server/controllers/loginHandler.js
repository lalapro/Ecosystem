const express = require('express');
const db = require('../../db/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleLogin = (req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  let select = `SELECT * FROM User WHERE Username ='${username}'`;
  db.query(select, null, (err, users) => {
    if (err) {
      res.send('error in login query', err);
    } else {
      if (users[0]) {
        bcrypt.compare(password, users[0].Hash_Password, function(err, result) {
          if (result === true) {
            delete users[0].Hash_Password;
            res.send(users[0]);
          } else {
            res.send('error in bcrypcompare');
          }
        })
      }
    }
  })
}

module.exports = handleLogin;
