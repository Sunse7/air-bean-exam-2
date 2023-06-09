function validateProductData(req, res, next) {
    const body = req.body;

    if(body.hasOwnProperty('title') && body.hasOwnProperty('desc') && body.hasOwnProperty('price')) {
        if(body.title.length > 3 && body.desc.length > 3 && body.price > 0) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Fields can not be empty' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Must contain title, desc and price' });
    }
}

module.exports = { validateProductData }