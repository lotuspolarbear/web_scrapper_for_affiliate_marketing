const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (typeof password !== "string") {
			throw new Error("Password must be a string.");
		}
		const user = await User.findOne({ username });

		if (user) {
			throw new Error("User already exists.");
		}
		const new_user = new User({ username, password });

		const persistedUser = await new_user.save();

		res.json({
			success: true,
			title: "Notification",
			detail: "You are registered successfully."
		});
	} catch (err) {
		res.json({
			success: false,
			errors: [
				{
					title: "Registration Error",
					detail: err.message,
					errorMessage: err.message
				}
			]
		});
	}
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
						detail: "Password must be a string."
					}
				]
			});
		}
		//queries database to find a user with the received username
		const user = await User.findOne({ username });
		if (!user) {
			throw new Error("No user exists.");
		}

		//using bcrypt to compare passwords
		const passwordValidated = await bcrypt.compare(password, user.password);
		if (!passwordValidated) {
			throw new Error("Password is incorrect.");
		}

		res.json({
			success: true,
			title: "Notification",
			detail: "Login successfully."
		});
	} catch (err) {
		console.log(err);
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

module.exports = router;
