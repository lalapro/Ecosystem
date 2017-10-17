const express = require('express');
const db = require('../../db/firebase.js');

// const pictureHandler = (req, res) => {
//     var picture = req.body.picture;
//     var username = req.body.username;
//     var userRef = db.ref(`users/${username}`);
//     userRef.on('value', function(snapshot) {
//       console.log(snapshot.val())
//         if (snapshot.val().length === 0) {
//                 db.ref(`users/${username}`).set({
//                     username: username,
//                     picture: picture
//                 }).then(res => res.send(res))
//         } else {
//             ref.child(`users/${username}`).putString(picture, 'base64').then(snapshot => {
//                 console.log(snapshot);
//                 res.send(snapshot);
//             })
//         }
//     })
// }


const pictureHandler = (req, res) => {
  console.log(req.body)
    var picture = req.body.picture;
    var username = req.body.username;
    var userRef = db.ref('/users');
    userRef.push().set({ username: username, picture: picture })
        .then(snapshot => {
            console.log(snapshot);
        })
}





module.exports = pictureHandler;
