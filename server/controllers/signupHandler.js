const express = require('express');
const db = require('../../db/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleSignup = (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  let select = `SELECT ID FROM User WHERE Username = '${username}'`;
  
  db.query(select, null, (err, results) => {
    if (err) {
      res.status(404).send(`Encountered error during post ${err}`);
    } else {
      if (results.length > 0) {
        res.status(404).send(`Username already exists.`);
      } else {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            let insert = `INSERT INTO User (ID, Name, Username, Email, Hash_Password, Photo_Url) VALUES (NULL, '${name}', '${username}', '${email}', '${hash}', NULL)`
            db.query(insert, (err, results) => {
              if (err) {
                res.status(404).send(`Encountered error during post ${err}`)
              } else {
                res.status(201).send(results);
              }
            })
          })
        })
      }
    }
  })
}

module.exports = handleSignup;
