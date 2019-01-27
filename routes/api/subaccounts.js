const express = require('express');
const router = express.Router();

// Sub Account Model
const Subaccount = require('../../models/Subaccount');

//Register New Sub Account
router.post('/register', (req, res, next) => {
    let newSubaccount = new Subaccount({
        merchantId: req.body.merchantId,
        subAcctId: req.body.subAcctId,
        websiteUrl: req.body.websiteUrl,
        name: req.body.name,
        affUrl: req.body.affUrl,
        loginUrl: req.body.loginUrl,
        username: req.body.username,
        password: req.body.password,
        cronSched: req.body.cronSched
    });
    Subaccount.addSubaccount(newSubaccount, (err, subaccount) => {
        if(err){
            return res.json({success: false, msg: err});
        } else {
            return res.json({success: true, msg: 'New sub account is registered successfully.'});
        }
    })
});

router.post('/reSchedule', (req, res, next) => {
    let schedule = {
        accountId: req.body.accountId,
        cronSched: req.body.newCronSched
      };
    Subaccount.reSchedule(schedule, (err, subaccount) => {
        if(err){
            return res.json({success: false, msg: "Can not change the cron schedule unexpectedly. Please try again later."});
        } else {
            return res.json({success: true, msg: 'You changed cron schedule successfully.', newCronSched: subaccount.cronSched});
        }
    })
});

router.get('/getAllSubAccounts', (req, res) => {
    Subaccount.find().sort({subAcctId: -1}).then(accounts => res.json(accounts));
})
module.exports = router;