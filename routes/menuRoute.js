const { Router } = require('express');
const router = Router();
const { getAllMenuItems, addNewMenuItem, deleteMenuItemById, findMenuItemById, updateMenuItemById } = require('../models/menu');
const { verifyToken } = require('../middlewares/jwt');

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

router.post('/add', verifyToken, async (req, res) => {
    const body = req.body;

    //TODO: Make middleware, put it on add and update
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

router.put('/update', verifyToken, async (req, res) => {
    try {
        const id = req.body.id;
        const modifiedAt = new Date().toISOString();
        const newValues = {
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
    }

    await updateMenuItemById(id, newValues, modifiedAt);
    res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error occurred while updating menu", error: err.code,})
    }
    
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const foundItem = await findMenuItemById(id); // Gets one item. Change name?

    if(foundItem) { 
        await deleteMenuItemById(id);
        res.json({ success: true, message: 'Deleted item' });
    }
    else {
        res.status(404).json({ success: false, message: 'Id not found' });
    }
});

module.exports = router;