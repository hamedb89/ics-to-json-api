var express = require("express");
var app = express();
var serverless = require('serverless-http');
var bodyParser = require('body-parser');
var axios = require('axios');
var cors = require('cors');
var moment = require('moment');

var ICalParser = require("ical-js-parser");

app.use(express.json());
app.use(cors());


var router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.get('/api/:url', (req, res, next) => {
	
	var icsUrl = "https://www.trainingpeaks.com/ical/" + req.params.url;
	axios
		.get(icsUrl)
		.then(function(result){

			res.json(ICalParser.default.toJSON(result.data));
			res.end();
		})
});

router.post('/api', (req, res, next) => {

	const fields = req.body;
	const friends = fields.friends;

	let eventsArray = [];
	let requests = [];

	let urlFriendDict = [];

	friends.map(function(friend, index){

		const icsUrl = "https://www.trainingpeaks.com/ical/" + friend.ics;

		requests.push(axios.get(icsUrl));

		urlFriendDict[icsUrl] = friend;

	});

	axios.all(requests).then(axios.spread((...responses) => {

		responses.map(function(response) {
			const jsonFriend = ICalParser.default.toJSON(response.data);
			const events = jsonFriend.events.map(function(event){
				event.friend = urlFriendDict[response.config.url];

				return event;
			});

			eventsArray = eventsArray.concat(events);

		})

		res.write(JSON.stringify(eventsArray));
		res.end();

	}));

});

router.post('/api/grouped', (req, res, next) => {

	const fields = req.body;
	const friends = fields.friends;

	let eventsArray = [];
	let requests = [];

	let urlFriendDict = [];

	friends.map(function(friend, index){

		const icsUrl = "https://www.trainingpeaks.com/ical/" + friend.ics;

		requests.push(axios.get(icsUrl));

		urlFriendDict[icsUrl] = friend;

	});

	axios.all(requests).then(axios.spread((...responses) => {

		responses.map(function(response) {
			const jsonFriend = ICalParser.default.toJSON(response.data);
			const events = jsonFriend.events.map(function(event){
				event.friend = urlFriendDict[response.config.url];

				return event;
			}).filter(event => moment(event.dtstart.value).isAfter(moment()));

			eventsArray = eventsArray.concat(events);

		});

		
		const hash = eventsArray.reduce((p,c) => {
			const day = moment(c.dtstart.value).format("DD.MM.YYYY");
			return (p[day] ? p[day].push(c) : p[day] = [c],p)
		}, {});

		const newData = Object.keys(hash).map(k => ({ title: k, data: hash[k] }));

		res.write(JSON.stringify(newData));
		res.end();

	}));

});

app.use('/.netlify/functions/server', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);