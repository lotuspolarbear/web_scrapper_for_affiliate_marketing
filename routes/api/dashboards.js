const express = require('express');
const router = express.Router();

// Merchant Model
// const Merchant = require('../../models/Merchant');

router.get('/getOverview', (req, res) => {
    let data = {
        'realComm': 63385.44,
        'allComm': 65052.23,
        'disputedComm': 1666.79,
        'EPC': 0.79,
        'clicks': 96452,
        'sales': 2549,
        'AOV': 46.50,
        'commRate': 3.49
    }
    res.json(data);
})
router.get('/getPersonalOverview', (req, res) => {
    let data = [
        {
            'profileId': '',
            'profileName': 'BestVPNReview',
            'info': [{
                'subAcctId': '',
                'name': 'BestVPNReview',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]            
        },
        {
            'profileId': '',
            'profileName': 'TopStreamingServices',
            'info': [{
                'subAcctId': '',
                'name': 'TopStreamingServices',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]            
        },
        {
            'profileId': '',
            'profileName': 'BestElectronicReviews',
            'info': [
                {
                    'subAcctId': '',
                    'name': 'MediaMeister',
                    'commNet': 605.04,
                    'commGross': 605.04,
                    'sales': 26,
                    'clicks': 484,
                    'EPC': 2.14,
                    'commRate': 13.4
                },
                {
                    'subAcctId': '',
                    'name': 'Social Empire',
                    'commNet': 3251.52,
                    'commGross': 3342.01,
                    'sales': 105,
                    'clicks': 420,
                    'EPC': 2.14,
                    'commRate': 13.4
                },
                {
                    'subAcctId': '',
                    'name': 'Audience Gain',
                    'commNet': 2180.06,
                    'commGross': 2180.06,
                    'sales': 96,
                    'clicks': 622,
                    'EPC': 2.14,
                    'commRate': 13.4
                }
            ]
        },        
        {
            'profileId': '',
            'profileName': 'NebulousReviewClub',
            'info': [{
                'subAcctId': '',
                'name': 'NebulousReviewClub',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]
        },
        {
            'profileId': '',
            'profileName': 'RetailReviews',
            'info': [{
                'subAcctId': '',
                'name': 'RetailReviews',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]
        },
        {
            'profileId': '',
            'profileName': 'VPNReviewHub',
            'info': [{
                'subAcctId': '',
                'name': 'VPNReviewHub',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]
        },
        {
            'profileId': '',
            'profileName': 'ViewReviews',
            'info': [{
                'subAcctId': '',
                'name': 'ViewReviews',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]
        },
        {
            'profileId': '',
            'profileName': 'BuyViewsReview',
            'info': [{
                'subAcctId': '',
                'name': 'BuyViewsReview',
                'commNet': 8953.48,
                'commGross': 9042.62,
                'sales': 241,
                'clicks': 1241,
                'EPC': 2.14,
                'commRate': 13.4
            }]
        }
    ]
    res.json(data);
})
module.exports = router;