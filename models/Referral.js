const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ReferralSchema = new Schema({
	subAcctId: {
		type: String,
		required: true
	},
	refferId: {
		type: String
	},
	amount: {
		type: String
	},
	variationId: {
		type: String
	},
	description: {
		type: String
	},
	status: {
		type: String
	},
	date: {
		type: String
	}
});

const Referral = (module.exports = mongoose.model("Referral", ReferralSchema));