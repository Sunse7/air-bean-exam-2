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
    const body = req.body;

    //TODO: Make middleware
    if(body.hasOwnProperty('title') && body.hasOwnProperty('desc') && body.hasOwnProperty('price')) {

        if(body.title.length > 3 && body.desc.length > 3 && body.price > 0){
            const menuItem = {
                title: body.title,
                desc: body.desc,
                price: body.price,
                createdAt: new Date().toISOString()
            }
            const data = await addNewMenuItem(menuItem);
            res.status(201).json({ success: true, data: data });
        } else {
            res.status(400).json({ success: false, message: 'Fields can not be empty' });
        }

    } else {
        res.status(400).json({ success: false, message: 'Must contain title, desc and price' });
    }

});

router.put('/update/:id', async (req, res) => {

});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const foundItem = await findMenuItemById(id); // Gets one item

    if(foundItem) { 
        await deleteMenuItemById(id);
        res.json({ success: true, message: 'Deleted item' });
    }
    else {
        res.status(404).json({ success: false, message: 'Id not found' });
    }
});

module.exports = router;