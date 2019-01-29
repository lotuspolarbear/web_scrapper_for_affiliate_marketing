"use strict";
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const Statistic = require("../models/Statistic");
const Referral = require("../models/Referral");

module.exports.doScrape = function(account) {

	async function statisticsScrap(browser, cookies) {
		const statisticsPage = await browser.newPage();
		await statisticsPage.setCookie(...cookies);
		await statisticsPage.goto(account.loginUrl + "?tab=stats", {waitUntil: 'networkidle0', timeout: 0});
		var html = await statisticsPage.content();
		let $ = cheerio.load(html);
		let tds = [];

		$("td").each(function(i, e) {
			tds[i] = $(this).text();
		});
		var unpaidReferrals = tds[0];
		var paidReferrals = tds[1];
		var visits = tds[2];
		var convRate = tds[3];
		var unpaidEarnings = tds[4];
		var paidEarnings = tds[5];
		var commissionRate = tds[6];
		var statisticsTable = [];
		for (var i = 7; i < tds.length; i += 5) {
			var obj = {};
			obj.campaign = tds[i];
			obj.visits = tds[i + 1];
			obj.uniqueLinks = tds[i + 2];
			obj.converted = tds[i + 3];
			obj.convRate = tds[i + 4];
			statisticsTable.push(obj);
		}
		let data = new Statistic({
			subAcctId: account._id,
			unpaidReferrals: unpaidReferrals,
			paidReferrals: paidReferrals,
			visits: visits,
			convRate: convRate,
			unpaidEarnings: unpaidEarnings,
			paidEarnings: paidEarnings,
			commissionRate: commissionRate,
			statisticsTable: statisticsTable
		});
		Statistic.addStatistics(data, (err, changed) => {console.log("Statistics added.")});
	}

	async function referralsScrap(browser, cookies){
		let lastDoc;
		let newDocs = [];

		await Referral.find({ subAcctId: account.subAcctId })
		.sort({ _id: -1 })
		.limit(1)
		.then(doc => lastDoc = doc);

		const referralsPage = await browser.newPage();
		await referralsPage.setCookie(...cookies);
		var pageNumber = 1;
		var scrapFlag = true;

		while(scrapFlag){
			await referralsPage.goto(account.loginUrl + "/page/" + pageNumber.toString() + "?tab=referrals#affwp-affiliate-dashboard-referrals", {waitUntil: 'networkidle0', timeout: 0});
			var html = await referralsPage.content();
			let $ = cheerio.load(html);
			
			var rows = $("tbody tr");
			
			if(rows.length == 1){
				scrapFlag = false;
			} else {
				for (var i = 0; i < rows.length; i++) {
					var current = rows[i];
					var refferId = $(current).children("td.referral-reference").text();
					var amount = $(current).children("td.referral-amount").text();
					var description = $(current).children("td.referral-description").text();
					var status = $(current).children("td.referral-status").text();
					var refDate = $(current).children("td.referral-date").text();
					var variationId = description.lastIndexOf("Variation ID") === -1 ? "none" : description.substring(description.lastIndexOf("Variation ID") + 12, description.length-1);
					
					if((lastDoc.length > 0) && (lastDoc[0].refferId == refferId) && (lastDoc[0].amount == amount) && (lastDoc[0].description == description) && (lastDoc[0].status == status) && (lastDoc[0].refDate == refDate) && (lastDoc[0].variationId == variationId)){
						console.log("Last referral document found.");
						scrapFlag = false;
						break;
					} else {
						var data = {
							subAcctId: account._id,
							refferId: refferId,
							amount: amount,
							variationId: variationId,
							description: description,
							status: status,
							refDate: refDate,
							scrappedDate: new Date()
						}
						newDocs.push(data);
					}
				}
				pageNumber++;
			}			
		}
		for(var i = newDocs.length - 1; i > -1 ; i--){
			Referral.addReferral(newDocs[i]);
		}
		console.log(newDocs.length + " referrals are added to " + account.username);
	}
	async function run() {
		const browser = await puppeteer.launch({ headless: false });
		const loginPage = await browser.newPage();

		await loginPage.goto(account.loginUrl, {waitUntil: 'networkidle0', timeout: 0});

		const USERNAME_SELECTOR = "#affwp-login-user-login";
		const PASSWORD_SELECTOR = "#affwp-login-user-pass";
		const BUTTON_SELECTOR = "#affwp-login-form .button";
		await loginPage.click(USERNAME_SELECTOR);
		await loginPage.keyboard.type(account.username);

		await loginPage.click(PASSWORD_SELECTOR);
		await loginPage.keyboard.type(account.password);

		await loginPage.click(BUTTON_SELECTOR);

		await loginPage.waitForNavigation();

		const cookies = await loginPage.cookies();
		statisticsScrap(browser, cookies);
		referralsScrap(browser, cookies);
	}

	run();
};
