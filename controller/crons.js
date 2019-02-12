var schedule = require('node-schedule');
const Subaccount = require("../models/Subaccount");
const Statistic = require("../models/Statistic");
const Referral = require("../models/Referral");
const Visit = require("../models/Visit");
const Payout = require("../models/Payout");
const Scrapper = require("./scrapper");

getAllSubAccounts = function() {
	Subaccount.getSubAccounts((err, accounts) => {
		var k = schedule.scheduleJob(accounts[1].cronSched, function(){		
			console.log("Cron schedule is working for" + accounts[1].username);
		});
		if (err) {
			console.log("Can't get sub accounts to scrap.");
		} else {
			//Scrapper.doScrape(accounts[0]);
			for (var i = 0; i < accounts.length; i++) {
				console.log(accounts[i].cronSched);
				var h = schedule.scheduleJob(accounts[i].cronSched, function(){		
					console.log("Cron schedule is working for" + accounts[i].username);
				});
				//Scrapper.doScrape(accounts[i]);
			}
		}
	});
};

module.exports.prepareCron = function() {
	// Statistic.deleteStatistics();
	// Referral.deleteReferrals();
	// Visit.deleteVisits();
	// Payout.deletePayouts();
	getAllSubAccounts();
};
