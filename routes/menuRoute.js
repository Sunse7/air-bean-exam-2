const { Router } = require('express');
const router = Router();
const { getAllMenuItems, addNewMenuItem, deleteMenuItemById, findMenuItemById } = require('../models/menu');

// /api/menu
router.get('/', async (req, res) => {
    try {
        res.json({ success: true, data: await getAllMenuItems() });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch from database",
            error: err.code,
        });
    }
});

router.post('/add', async (req, res) => {
    const { title, desc, price } = req.body;
    const menuItem = {
        title: title,
        desc: desc,
        price: price,
        createdAt: new Date()
    }
    const data = await addNewMenuItem(menuItem);
    res.json({ success: true, data: data })
});

router.put('/update/:id', async (req, res) => {

});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const foundItem = await findMenuItemById(id); // Gets one item
    // console.log('found item', foundItem);

    if(foundItem) { 
        await deleteMenuItemById(id);
        res.json({ success: true, message: 'Deleted item' });
    }
    else {
        res.status(404).json({ success: false, message: 'Id not found' });
    }
});

module.exports = router;