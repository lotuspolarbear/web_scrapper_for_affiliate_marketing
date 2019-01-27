const express = require("express");
const router = express.Router();

// Statistics Model
const Statistic = require("../../models/Statistic");

router.post("/get", (req, res, next) => {
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

router.post("/getStatistics", (req, res, next) => {
	let subAcctId = req.body.subAcctId;
	Statistic.getStatistics(subAcctId, (err, statistic) => {
		if (err) {
			return res.json({ success: false });
		} else {
			return res.json({ success: true, statistic: statistic });
		}
	});
});
module.exports = router;
