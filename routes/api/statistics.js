const express = require("express");
const router = express.Router();

// Statistics Model
const Statistic = require("../../models/Statistic");

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
