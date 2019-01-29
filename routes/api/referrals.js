const express = require("express");
const router = express.Router();

// Referral Model
const Referral = require("../../models/Referral");

router.post("/getReferrals", (req, res, next) => {
	let subAcctId = req.body.subAcctId;
	Referral.getReferrals(subAcctId, (err, referrals) => {
		if (err) {
			return res.json({ success: false });
		} else {
			return res.json({ success: true, referrals: referrals });
		}
	});
});
module.exports = router;
