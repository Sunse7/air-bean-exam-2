const { Router } = require('express');
const router = Router();
const { getAllMenuItems } = require('../models/menu');

// /api/menu
router.get('/', async (req, res) => {
    const menuList = await getAllMenuItems();
    console.log('menuRouter, menu', menuList);
});

router.post('/add', async (req, res) => {

});

router.put('/update/:id', async (req, res) => {

});

router.delete('/delete/:id', async (req, res) => {

});