const { Router } = require('express');
const { checkProducts } = require('../middlewares/checkProducts');
const { saveCampaign } = require('../models/campaign');
const router = Router();

router.post('/add', checkProducts, async (req, res) => {
    try {
        const campaignProducts = req.body.products;
        const campaignPrice = req.body.price;
    
        const newCampaign = {
            products: campaignProducts,
            price: campaignPrice
        }
    
        await saveCampaign(newCampaign);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error occurred while adding campaign", error: err.code,});
    }
});

module.exports = router;