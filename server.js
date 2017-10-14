const express = require('express');
const db = require('./db/index.js');
const routes = require('./server/routes.js');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(__dirname + '/src'));

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUnitialized: false
// }));

app.listen(app.get('port'), () => {console.log(`Listening on ${app.get('port')}`)});
