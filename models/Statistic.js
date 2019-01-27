const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const StatisticSchema = new Schema({
	subAcctId: {
		type: String,
		required: true
	},
	unpaidReferrals: {
		type: String
	},
	paidReferrals: {
		type: String
	},
	visits: {
		type: String
	},
	convRate: {
		type: String
	},
	unpaidEarnings: {
		type: String
	},
	paidEarnings: {
		type: String
	},
	commissionRate: {
		type: String
	},
	statisticsTable: {
		type: []
	}
});

const Statistic = (module.exports = mongoose.model("Statistic", StatisticSchema));

module.exports.addStatistics = function(data, callback) {
	Statistic.findOne(
		{
			subAcctId: data.subAcctId,
			unpaidReferrals: data.unpaidReferrals,
			paidReferrals: data.paidReferrals,
			visits: data.visits,
			convRate: data.convRate,
			unpaidEarnings: data.unpaidEarnings,
			paidEarnings: data.paidEarnings,
			commissionRate: data.commissionRate,
			statisticsTable: data.statisticsTable
		},
		function(err, record) {
			if (!record) {
				data.save(callback);
			}
		}
	);
	// find().sort({_id:1}).limit(50)
};
module.exports.getStatistics = function(subAcctId, callback) {
	Statistic.find({ subAcctId: subAcctId })
		.sort({ _id: 1 })
		.exec(callback);
};
