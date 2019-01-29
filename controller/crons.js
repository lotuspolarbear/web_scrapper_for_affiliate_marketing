// Sub Account Model
const Subaccount = require("../models/Subaccount");
const Scrapper = require("./scrapper");
getAllSubAccounts = function() {
	var query = Subaccount.find().sort({ subAcctId: -1 });
	query.then(function(accounts) {
		//Scrapper.doScrape(accounts[0]);
		for (var i = 0; i < accounts.length; i++) {
			Scrapper.doScrape(accounts[i]);
		}
	});
};

module.exports.prepareCron = function() {
	getAllSubAccounts();
};
