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
	refDate: {
		type: String
	},
	scrappedDate: {
		type: Date
	}
});

const Referral = (module.exports = mongoose.model("Referral", ReferralSchema));

module.exports.addReferral = function(newReferral) {
	var data = new Referral({
		subAcctId: newReferral.subAcctId,
		refferId: newReferral.refferId,
		amount: newReferral.amount,
		variationId: newReferral.variationId,
		description: newReferral.description,
		status: newReferral.status,
		refDate: newReferral.refDate,
		scrappedDate: newReferral.scrappedDate
	});
	data.save();
};

module.exports.getReferrals = function(subAcctId, callback) {
	Referral.find({ subAcctId: subAcctId })
		.sort({ _id: -1 })
		.exec(callback);
};
