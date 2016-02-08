// Divide all of your modules in different files and
// require them here
module.exports = function(app, settings){
	require('./places_route')(app, settings);
	require('./user_route')(app, settings);
};