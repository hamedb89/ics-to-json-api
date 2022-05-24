var express = require("express");
var app = express();
var serverless = require('serverless-http');
var bodyParser = require('body-parser');
var axios = require('axios');
var cors = require('cors');

var ICalParser = require("ical-js-parser");
var x = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nMETHOD:PUBLISH\r\nPRODID:-//ddaysoftware.com//NONSGML DDay.iCal 1.0//EN\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\noptional nur Wasser\\, danach Protein-Shake\\\r\n ;\\n\\nin den Hauptteil folgende Technik-Elemente integrieren:\\n\\n5x(1min. l\r\n inks / 1min. rechts) jeweils passives Bein nach hinten ablegen\\; 5min. Pau\r\n se normal\\, danach 10min. hohe Trittfrequenz (>110 U/min.)\\nPlanned Time: \r\n 1:00\\n\r\nDTEND;VALUE=DATE:20220518\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220517\r\nSEQUENCE:0\r\nSUMMARY:Bike: Rad LIT inkl. Technik #1 ILT\r\nUID:942a3b72-79e3-4b15-9944-18ae38eeac38\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Strength\\nRumpf-STABI\\nPlanned Time: 0:20\\n\r\nDTEND;VALUE=DATE:20220518\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220517\r\nSEQUENCE:0\r\nSUMMARY:Strength: STABI 20min.\r\nUID:9e2059d6-8b46-4614-8e39-129fc626ba6b\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Swim\\n200m beliebig Einschwimmen\\n12x50m Kraul mi\r\n t Pull-Buoy 15\"P\\n100m beliebig locker\\n12x50m Kraul mit Paddles 20\"P\\n100\r\n m beliebig locker\\n10x50m Kraul mit Flossen 10\"P\\n100m beliebig locker\\n20\r\n 0m beliebig Ausschwimmen\\nPlanned Time: 1:00\\nDistance Planned: 2500 m\\n\r\nDTEND;VALUE=DATE:20220519\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220518\r\nSEQUENCE:0\r\nSUMMARY:Swim: Schwimmen LIT/KA\r\nUID:512bbbee-7675-421c-99cf-eb82e030b62b\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Other\\nPlanned Time: 0:10\\n\r\nDTEND;VALUE=DATE:20220519\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220518\r\nSEQUENCE:0\r\nSUMMARY:Other: Black-Roll & Stretching\r\nUID:75bf79b8-cdf6-4523-9b8f-ab2d1dd68ee0\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Strength\\nActual Time: 1:06\\nActual Distance: 0 k\r\n m\\nSpeed: 0 km/h\\n\r\nDTEND:20220518T190508\r\nDTSTAMP:20220521T135723Z\r\nDTSTART:20220518T180508\r\nSEQUENCE:0\r\nSUMMARY:Strength: Strength\r\nUID:987af32f-2b3e-49e9-922c-bb0f52828d77\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Run\\nauch nüchtern als Frühlauf möglich\\, dann op\r\n timalerweise mit Koffein vorher versorgen (Wasser auch erlaubt)\\nleichtes \r\n Stretching und Mobilisation vor dem Lauf sinnvoll\\nPlanned Time: 0:40\\nAct\r\n ual Time: 0:49\\nActual Distance: 7.87 km\\nSpeed: 9.56 km/h\\nPace: 6.28 min\r\n /km\\n\r\nDTEND:20220519T223701\r\nDTSTAMP:20220521T135723Z\r\nDTSTART:20220519T215701\r\nSEQUENCE:0\r\nSUMMARY:Run: Laufen LIT\r\nUID:2e44d0f1-e6e2-40ca-ac8d-2730e7e9ce6e\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\n1h GA1 mit 10x6\" Zwischensprints\\; Rest TF:\r\n  85-100 U/min.\\n\\nDiese Einheit ohne Kohlenhydrate absolvieren. Danach Rec\r\n overy-Shake.\\nPlanned Time: 1:00\\n\r\nDTEND;VALUE=DATE:20220521\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220520\r\nSEQUENCE:0\r\nSUMMARY:Bike: 1h LIT mit KP-Sprints\r\nUID:e4e64af3-737b-4316-baf2-f11d9eb68f06\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Swim\\n200m beliebig Einschwimmen\\n12x50m (25m Tec\r\n hnik-Übung / 25m Kraul) 20-30\"P\\n100m beliebig locker\\n2x12x50m Kraul LIT \r\n 15-20\"P SP: 1`\\n200m Ausschwimmen\\nPlanned Time: 1:00\\nActual Time: 0:56\\n\r\n Distance Planned: 2300 m\\nActual Distance: 2975 m\\nSpeed: 3.16 km/h\\n\r\nDTEND:20220521T120746\r\nDTSTAMP:20220521T135723Z\r\nDTSTART:20220521T110746\r\nSEQUENCE:0\r\nSUMMARY:Swim: Schwimmen Te/LIT\r\nUID:d6664482-98ab-46ad-ab18-c5c3cf75af7c\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Strength\\nRumpf-STABI\\nPlanned Time: 0:20\\n\r\nDTEND;VALUE=DATE:20220522\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220521\r\nSEQUENCE:0\r\nSUMMARY:Strength: STABI 20min.\r\nUID:464dbbdb-46ce-4be5-b830-be5d941f57bc\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\nActual Time: 0:08\\nActual Distance: 2.65 km\r\n \\nSpeed: 19.26 km/h\\n\r\nDTEND:20220521T151528\r\nDTSTAMP:20220521T135723Z\r\nDTSTART:20220521T141528\r\nSEQUENCE:0\r\nSUMMARY:Bike: Cycling\r\nUID:bd21df7b-310d-4416-ae1b-b8a66406b529\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Run\\nPlanned Time: 0:11\\n\r\nDTEND;VALUE=DATE:20220523\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220522\r\nSEQUENCE:0\r\nSUMMARY:Run: Laufen TCB Duathlon\r\nUID:5ee82b4d-75f2-4c1c-9ef4-c4fcb7397a17\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\n1h30 GA1\\, TF: 85-100 U/min.\\n\\nmöglichst k\r\n eine Kohlenhydrate vor und während der Einheit aufnehmen (Notfallgel einpa\r\n cken)\\, vorher Koffein (doppelter Espresso) hilfreich\\, nachher Recovery-S\r\n hake sinnvoll\\nPlanned Time: 1:30\\n\r\nDTEND;VALUE=DATE:20220523\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220522\r\nSEQUENCE:0\r\nSUMMARY:Bike: Rad TCB Duathlon\r\nUID:e0982e66-76a8-48db-bdf1-0f6bcd14b825\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Run\\nPlanned Time: 0:24\\n\r\nDTEND;VALUE=DATE:20220523\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220522\r\nSEQUENCE:0\r\nSUMMARY:Run: Laufen TCB Duathlon\r\nUID:c00153ec-9268-4e45-aea7-bb2c08606bd5\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Other\\nPlanned Time: 0:10\\n\r\nDTEND;VALUE=DATE:20220523\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220522\r\nSEQUENCE:0\r\nSUMMARY:Other: Black-Roll & Stretching\r\nUID:0069cec7-af32-4412-90ae-6e690026ede5\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Swim\\n200m beliebig Einschwimmen\\n8x50m Kraul-Bei\r\n ne 20\"P\\n4x50 Kraul Steigerung 30\"P\\n100m beliebig locker\\n2x14x50m Kraul \r\n LIT 15-20\"P SP: 1`\\n200m Ausschwimmen\\nPlanned Time: 1:00\\nDistance Planne\r\n d: 2500 m\\n\r\nDTEND;VALUE=DATE:20220524\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220523\r\nSEQUENCE:0\r\nSUMMARY:Swim: Schwimmen Te/LIT\r\nUID:b0617071-333d-4853-97cd-bcd71e714f4f\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Run\\nNachbereitung:\\n10x20m Lauf-ABC Übungen + 5x\r\n 80m Steigerungslauf (Pause: zurück Gehen)\\nPlanned Time: 0:45\\n\r\nDTEND;VALUE=DATE:20220525\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220524\r\nSEQUENCE:0\r\nSUMMARY:Run: Laufen LIT + Technik\r\nUID:e33b3f52-e9b5-4c56-8f2d-4cbd43974c4a\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Strength\\nRumpf-STABI\\nPlanned Time: 0:20\\n\r\nDTEND;VALUE=DATE:20220525\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220524\r\nSEQUENCE:0\r\nSUMMARY:Strength: STABI 20min.\r\nUID:1ebfbf42-6b81-47c1-ad45-b19788880dc4\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\noptional nur Wasser\\, danach Protein-Shake\\\r\n ;\\n\\nin den Hauptteil folgende Technik-Elemente integrieren:\\n\\n6x6s Sprin\r\n t (maximale Trittfrequenz) Pause 3min.\\; 5min. Pause normal\\, danach 10min\r\n . hohe Trittfrequenz (>100 U/min.)\\nPlanned Time: 1:00\\n\r\nDTEND;VALUE=DATE:20220526\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220525\r\nSEQUENCE:0\r\nSUMMARY:Bike: Rad LIT inkl. Technik #2 KP-Sprints\r\nUID:cb3ff2e6-acb9-44b2-9b31-3a3fcaf18ed7\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Other\\nPlanned Time: 0:10\\n\r\nDTEND;VALUE=DATE:20220526\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220525\r\nSEQUENCE:0\r\nSUMMARY:Other: Black-Roll & Stretching\r\nUID:3e9c63e5-9553-461c-9a32-dbe184a38c08\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Run\\nauch nüchtern als Frühlauf möglich\\, dann op\r\n timalerweise mit Koffein vorher versorgen (Wasser auch erlaubt)\\nleichtes \r\n Stretching und Mobilisation vor dem Lauf sinnvoll\\nPlanned Time: 0:45\\n\r\nDTEND;VALUE=DATE:20220527\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220526\r\nSEQUENCE:0\r\nSUMMARY:Run: Laufen LIT\r\nUID:e69a86d6-c9b6-4619-bde2-3be9f1b62ce1\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Swim\\n200m beliebig Einschwimmen\\n4x50m Kraul Ste\r\n igerung 30\"P\\n100m beliebig locker\\n6x100m Kraul Pull-Buoy + Paddles 20\"P\\\r\n n100m beliebig locker\\n4x50m Kraul mit Band (ohne Pull-Buoy!) 30\"P\\n200m K\r\n raul mit Pull-Buoy\\n8x50m Kraul LIT beste Technik 20\"P\\n5x100m Kraul mit P\r\n ull-Buoy\\n100m beliebig Ausschwimmen\\nPlanned Time: 1:00\\nDistance Planned\r\n : 2700 m\\n\r\nDTEND;VALUE=DATE:20220528\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220527\r\nSEQUENCE:0\r\nSUMMARY:Swim: Schwimmen LIT/KA\r\nUID:e1f075d3-f1f3-452a-8846-e03c7ee029ad\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\n1h30 GA1\\, TF: 85-100 U/min.\\n\\nmöglichst k\r\n eine Kohlenhydrate vor und während der Einheit aufnehmen (Notfallgel einpa\r\n cken)\\, vorher Koffein (doppelter Espresso) hilfreich\\, nachher Recovery-S\r\n hake sinnvoll\\nPlanned Time: 1:30\\n\r\nDTEND;VALUE=DATE:20220529\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220528\r\nSEQUENCE:0\r\nSUMMARY:Bike: 1h30 LIT\r\nUID:2a17bf27-7d30-4305-b88e-5b3c4b33d1da\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Run\\nnicht nüchtern\\, sondern einfach im Laufe de\r\n s Tages und möglichst erholt durchführen\\nPlanned Time: 0:55\\n\r\nDTEND;VALUE=DATE:20220529\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220528\r\nSEQUENCE:0\r\nSUMMARY:Run: Laufen LIT + Progression\r\nUID:43141e4b-87fb-4a4a-8606-95446daf26d7\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Strength\\nRumpf-STABI\\nPlanned Time: 0:20\\n\r\nDTEND;VALUE=DATE:20220529\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220528\r\nSEQUENCE:0\r\nSUMMARY:Strength: STABI 20min.\r\nUID:570a2caa-8d30-48cc-bf96-b744b1588aee\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Bike\\n2h GA1\\, TF: 85-100 U/min.\\n\\nmöglichst kei\r\n ne Kohlenhydrate vor und während der Einheit aufnehmen (Notfallgel einpack\r\n en)\\, vorher Koffein (doppelter Espresso) hilfreich\\, nachher Recovery-Sha\r\n ke sinnvoll\\nPlanned Time: 2:00\\n\r\nDTEND;VALUE=DATE:20220530\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220529\r\nSEQUENCE:0\r\nSUMMARY:Bike: 2h GA1\r\nUID:9598e4cc-bf66-457f-afab-d022ee03a099\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDESCRIPTION:Workout type: Other\\nPlanned Time: 0:10\\n\r\nDTEND;VALUE=DATE:20220530\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220529\r\nSEQUENCE:0\r\nSUMMARY:Other: Black-Roll & Stretching\r\nUID:72b4c0bd-74ac-44b3-9feb-7d958d6301fd\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nDTEND;VALUE=DATE:20220711\r\nDTSTAMP:20220521T135723Z\r\nDTSTART;VALUE=DATE:20220710\r\nSEQUENCE:0\r\nSUMMARY:Triathlon Hamburg Olympisch\r\nUID:ba68fc14-b790-4f3c-9618-3186022ecd83\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n";


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

router.post('/api/', (req, res, next) => {

	const fields = req.body;
	const friends = fields.friends;

	let jsonFriendsArray = [];

	friends.map(function(friend, index){

		const icsUrl = "https://www.trainingpeaks.com/ical/" + friend.ics;

		axios
			.get(icsUrl)
			.then(function(result){

				const jsonFriend = ICalParser.default.toJSON(result.data);
				const events = jsonFriend.events.map(function(event){
					return event.friend = friend;
				});

				jsonFriendsArray = jsonFriendsArray.concat(events);

				if (index == friends.length - 1) {

					res.write(JSON.stringify(jsonFriendsArray));
					res.end();
				}

			});
	});


	

});

app.use('/.netlify/functions/server', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);