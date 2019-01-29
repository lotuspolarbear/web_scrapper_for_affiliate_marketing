const Subaccount = require("../models/Subaccount");
const Referral = require("../models/Referral");
const Statistic = require("../models/Statistic");
const Scrapper = require("./scrapper");
getAllSubAccounts = function() {
	Subaccount.getSubAccounts((err, accounts) => {
		if (err) {
			console.log("Can't get sub accounts to scrap.")
		} else {
			Scrapper.doScrape(accounts[0]);
			// for (var i = 0; i < accounts.length; i++) {
			// 	Scrapper.doScrape(accounts[i]);
			// }
		}
	});
};

module.exports.prepareCron = function() {
	//Referral.deleteReferrals();
	//Statistic.deleteStatistics();
	getAllSubAccounts();
};
