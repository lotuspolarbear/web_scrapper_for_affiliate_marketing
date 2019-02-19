const express = require("express");
const Crypto = require("../../controller/crypto");
const router = express.Router();

// Sub Account Model
const Subaccount = require("../../models/Subaccount");

//Register New Sub Account
router.post("/register", (req, res, next) => {
	var password = Crypto.encrypt(req.body.password);
	let newSubaccount = new Subaccount({
		merchantId: req.body.merchantId,
		subAcctId: req.body.subAcctId,
		websiteUrl: req.body.websiteUrl,
		name: req.body.name,
		affUrl: req.body.affUrl,
		loginUrl: req.body.loginUrl,
		username: req.body.username,
		password: password,
		cronSched: req.body.cronSched
	});
	Subaccount.addSubaccount(newSubaccount, (err, subaccount) => {
		if (err) {
			return res.json({ success: false, msg: err });
		} else {
			return res.json({ success: true, msg: "New sub account is registered successfully." });
		}
	});
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (typeof password !== "string") {
			return res.json({
				success: false,
				errors: [
					{
						title: "Bad Request",
						detail: "Password must be a string"
					}
				]
			});
		}
		//queries database to find a user with the received username
		const user = await Subaccount.findOne({ username });
		if (!user) {
			throw new Error("No user exists.");
		}
		var decryptedPass = Crypto.decrypt(user.password);
		
		if (password!=decryptedPass) {
			throw new Error("Password is incorrect.");
		}
		res.json({
			success: true,
			title: "Login Successful",
			detail: "Successfully validated user credentials"
		});
	} catch (err) {
		res.json({
			success: false,
			errors: [
				{
					title: "Invalid Credentials",
					detail: err.message,
					errorMessage: err.message
				}
			]
		});
	}
});

router.post("/reSchedule", (req, res, next) => {
	let schedule = {
		accountId: req.body.accountId,
		cronSched: req.body.newCronSched
	};
	Subaccount.reSchedule(schedule, (err, subaccount) => {
		if (err) {
			return res.json({
				success: false,
				msg: "Can not change the cron schedule unexpectedly. Please try again later."
			});
		} else {
			return res.json({
				success: true,
				msg: "You changed cron schedule successfully.",
				newCronSched: subaccount.cronSched
			});
		}
	});
});

router.get("/getAllSubAccounts", (req, res) => {
	Subaccount.find()
		.sort({ subAcctId: -1 })
		.then(accounts => res.json(accounts));
});

module.exports = router;
