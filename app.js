// Dependencies
const express = require("express");
const app = express();
const path = require("path");
const pug = require("pug");
const bodyParser = require('body-parser');

const DBG = false;

// set body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup pug
app.set("views", path.join(__dirname, "/"));
app.set("view engine", "pug");

// set static paths
app.use(express.static('public/'));

// router
app.get("/", (req, res) => {
	const list = [];
	const fullName = req.query.fln || false;
	const description = req.query.des || false;

	for(var a in req.query) {
		if(req.query.hasOwnProperty(a)) {
			var val = parser(a, req.query[a]);
			if(val) list.push(val);
		}
	}
	res.render("public/view", {name: fullName, description: description, links: list});
});

app.get("/gen", (req, res) => {
	res.sendFile("gen.html",{ root: path.join(__dirname, './public') });
})

// listening on port 3000
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on port ${port}.`));

function parser(tag, data) {

	switch (tag) {
		case "fbi": return {name: "Facebook Profile", image: "facebook", url: `facebook.com/profile.php?id=${data}`}; // Facebook Id
		case "fbh": return {name: "Facebook Profile", image: "facebook", url: `facebook.com/${data}`}; // Facebook Handle
		case "fbp": return {name: "Facebook Page", image: "facebook", url: `facebook.com/${data}`}; // Facebook Page
		case "fbg": return {name: "Facebook Group", image: "facebook", url: `facebook.com/groups/${data}`}; // Facebook Group
		case "fbm": return {name: "Facebook Messenger", image: "messenger", url: `facebook.com/messages/t/${data}`}; // Facebook Messenger
		case "ig": return {name: "Instagram", image: "instagram", url: `instagram.com/${data}`}; // Instagram
		case "tw": return {name: "Twitter", image: "twitter", url: `twitter.com/${data}`}; // Twitter
		case "dc": return {name: "Discord Server", image: "discord", url: `discord.gg/${data}`}; // Discord Server
		case "gh": return {name: "Github", image: "github", url: `github.com/${data}`}; // Github
		case "li": return {name: "LinkedIn", image: "linkedin", url: `linkedin.com/in/${data}`}; // Linkedin
		case "lic": return {name: "LinkedIn Company", image: "linkedin", url: `linkedin.com/company/${data}`}; // Linkedin Company
		case "sc": return {name: "Snapchat", image: "snapchat", url: `story.snapchat.com/u/${data}`}; // Snapchat
		case "sd": return {name: "Soundcloud", image: "soundcloud", url: `soundcloud.com/${data}`}; // Soundcloud
		case "me": return {name: "Medium", image: "medium", url: `medium.com/@${data}`}; // Medium
		case "th": return {name: "Twitch", image: "twitch", url: `twitch.tv/${data}`}; // Twitch
		case "yti": return {name: "Youtube", image: "youtube", url: `youtube.com/channel/${data}`}; // Youtube Channel Id
		case "yth": return {name: "Youtube", image: "youtube", url: `youtube.com/user/${data}`}; // Youtube Channel Handle
		case "pin": return {name: "Pinterest", image: "pinterest", url: `pinterest.com/${data}`}; // Pinterest
		case "rd": return {name: "Reddit", image: "reddit", url: `reddit.com/user/${data}`}; // Reddit User Id
		case "srd": return {name: "Subreddit", image: "reddit", url: `reddit.com/r/${data}`}; // Subreddit
		case "tt": return {name: "Tiktok", image: "tiktok", url: `tiktok.com/@${data}`} // Tiktok
		default: return null;
	}
}


// http://localhost:3000/?fln=Ayan&des=This%20is%20a%20brief%20description%20about%20myself&fbp=1abcfbm=d&ig=a&fbi=a&lic=ab&tw=e&dc=a&gh=a&fbg=b&li=2&sc=a&sd=dc&me=pp&th=xyz&yti=a&yth=b&pin=z&rd=bz&fbh=a&srd=a&tt=abc&fbp=1