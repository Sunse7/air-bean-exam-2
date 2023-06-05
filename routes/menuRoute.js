const { Router } = require('express');
const router = Router();
const { getAllMenuItems, addNewMenuItem, deleteMenuItemById, findMenuItemById } = require('../models/menu');

// /api/menu
router.get('/', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await getAllMenuItems() });
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
    const foundItem = await findMenuItemById(id); // Gets a list of matches
    console.log('found item', foundItem[0]);
    if(foundItem) { // Something else in if
        console.log('FOUND');
    }
    else {
        console.log('NOT FOUND');
    }
    // const data = await deleteMenuItemById(id);
    res.json({ success: true, message: 'Deleted item' });
});

module.exports = router;