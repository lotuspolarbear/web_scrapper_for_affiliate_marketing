"use strict";
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const Statistic = require("../models/Statistic");

module.exports.doScrape = function(account) {
	async function statistic(browser, cookies) {
		const page2 = await browser.newPage();
		await page2.setCookie(...cookies);
		await page2.goto(account.loginUrl + "?tab=stats");
		var html = await page2.content();
		let $ = cheerio.load(html);
		let hobbies = [];

		$("td").each(function(i, e) {
			hobbies[i] = $(this).text();
		});
		var unpaidReferrals = hobbies[0];
		var paidReferrals = hobbies[1];
		var visits = hobbies[2];
		var convRate = hobbies[3];
		var unpaidEarnings = hobbies[4];
		var paidEarnings = hobbies[5];
		var commissionRate = hobbies[6];
		var statisticsTable = [];
		for (var i = 7; i < hobbies.length; i += 5) {
			var obj = {};
			obj.campaign = hobbies[i];
			obj.visits = hobbies[i + 1];
			obj.uniqueLinks = hobbies[i + 2];
			obj.converted = hobbies[i + 3];
			obj.convRate = hobbies[i + 4];
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
		Statistic.addStatistics(data, (err, changed) => {});
	}

	async function run() {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();

		await page.goto(account.loginUrl);

		// var html = await page.content();
		// console.log(html);

		const USERNAME_SELECTOR = "#affwp-login-user-login";
		const PASSWORD_SELECTOR = "#affwp-login-user-pass";
		const BUTTON_SELECTOR = "#affwp-login-form .button";
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(account.username);

		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(account.password);

		await page.click(BUTTON_SELECTOR);

		await page.waitForNavigation();

		const cookies = await page.cookies();
		statistic(browser, cookies);
	}

	run();
};
