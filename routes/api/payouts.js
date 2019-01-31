const express = require("express");
const router = express.Router();

// Payout Model
const Payout = require("../../models/Payout");

router.post("/getPayouts", (req, res, next) => {
	let subAcctId = req.body.subAcctId;
	Payout.getPayouts(subAcctId, (err, payouts) => {
		if (err) {
			return res.json({ success: false });
		} else {
			return res.json({ success: true, payouts: payouts });
		}
	});
});
module.exports = router;
