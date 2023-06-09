const { Router } = require('express');
const router = Router();
const { getAllMenuItems, addNewMenuItem, deleteMenuItemById, findMenuItemById, updateMenuItemById } = require('../models/menu');
const { verifyToken } = require('../middlewares/jwt');
const { validateProductData } = require('../middlewares/validateProductData');
const allowedRoles = ['admin'];

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

router.post('/add', verifyToken(allowedRoles), validateProductData, async (req, res) => {
    try {
        const body = req.body;
        const menuItem = {
            title: body.title,
            desc: body.desc,
            price: body.price,
            createdAt: new Date().toISOString()
        }
        const data = await addNewMenuItem(menuItem);
        res.status(201).json({ success: true, data: data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error occurred while adding menu item", error: err.code,});
    }
});

router.put('/update', verifyToken(allowedRoles), validateProductData, async (req, res) => {
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
        res.status(500).json({ success: false, message: "Error occurred while updating menu", error: err.code,});
    }
});

router.delete('/delete/:id', verifyToken(allowedRoles), async (req, res) => {
    try {
        const id = req.params.id;
        const foundItem = await findMenuItemById(id);
    
        if(foundItem) { 
            await deleteMenuItemById(id);
            res.json({ success: true, message: 'Deleted item' });
        }
        else {
            res.status(404).json({ success: false, message: 'Id not found' });
        }
        
    } catch (err) {
        res.status(500).json({ success: false, message: "Error occurred while deleting menu item", error: err.code,});
    }
});

module.exports = router;