function admin(req, res, next) { // Ska ligga på login 
    const role = req.headers.role;
    if(role === 'admin') {
        console.log('You pass');
        next();
    } else {
        console.log('You dont have permission');
        res.status(401).json({ success: false, message: 'You dont have permission' });
    }
}