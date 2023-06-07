const { Router } = require('express');
const { checkProducts } = require('../middlewares/checkProducts');
const { saveCampaign } = require('../models/campaign');
const router = Router();
// {
//     "products": 
//     [
//         "Bryggkaffe", // id?
//         "Gustav Adolfsbakelse" // id?
//     ],
//     "price": 40
// }

// /api/campaign
router.post('/add', checkProducts, async (req, res) => {
    const campaignProducts = req.body.products;
    const campaignPrice = req.body.price;

    const newCampaign = {
        products: campaignProducts,
        price: campaignPrice
    }

    await saveCampaign(newCampaign);
    res.json({ success: true });
   
});

module.exports = router;