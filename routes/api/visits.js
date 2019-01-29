const express = require("express");
const router = express.Router();

// Visit Model
const Visit = require("../../models/Visit");

router.post("/getVisits", (req, res, next) => {
	let subAcctId = req.body.subAcctId;
	Visit.getVisits(subAcctId, (err, visits) => {
		if (err) {
			return res.json({ success: false });
		} else {
			return res.json({ success: true, visits: visits });
		}
	});
});
module.exports = router;
