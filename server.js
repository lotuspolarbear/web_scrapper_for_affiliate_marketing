const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const crons = require("./controller/crons");
const merchants = require("./routes/api/merchants");
const subaccounts = require("./routes/api/subaccounts");
const statistics = require("./routes/api/statistics");
const referrals = require("./routes/api/referrals");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
//const db = require('./config/db').mongoURI;
const db = require("./config/key").mongoURI;

// Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected..."))
	.catch(err => console.log(err));

// Use Routes
app.use("/api/merchants", merchants);
app.use("/api/subaccounts", subaccounts);
app.use("/api/statistics", statistics);
app.use("/api/referrals", referrals);

crons.prepareCron();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
