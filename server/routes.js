const routes = require('express').Router();
const handleSignup = require('./controllers/signupHandler.js');
const handleLogin = require('./controllers/loginHandler.js');
const handlenNewTask = require('./controllers/newTaskHandler.js');
const {handleCategories, handleNewCategories} = require('./controllers/categoriesHandler');
const handleMarkers = require('./controllers/markerHandler.js');
const handleNewLocation = require('./controllers/newLocationHandler.js')
const getMapMarkers = require('./controllers/getMapMarkers')

routes.post('/signup', handleSignup);
routes.get('/login', handleLogin);
routes.post('/newTask', handlenNewTask);
routes.get('/categories', handleCategories);
routes.post('/categories', handleNewCategories);
routes.get('/markers', handleMarkers);
routes.post('/newLocation', handleNewLocation);
routes.get('/mapMarkers', getMapMarkers);

module.exports = routes;
