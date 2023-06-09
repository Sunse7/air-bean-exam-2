const {
    checkUsernameMatch,
    checkPasswordMatch,
    checkUsernameAvailabilitiy,
    checkPasswordSecurity,
} = require("./middlewares/auth");
const {
    validateUserId,
    validateUserIdOrGuest,
} = require("./middlewares/validateUser");
const { checkProducts } = require("./middlewares/checkProducts");
const { validateOrderNr } = require("./middlewares/validateOrderNr");
const { calcDeliveryTime } = require("./middlewares/calcDeliveryTime");
const { calculateTotalPrice } = require("./middlewares/calculateTotalPrice");
const { createUser, findUserByUsername } = require("./models/users");
const { saveToOrders, findOrdersByUserId } = require("./models/orders");
const { uuid } = require("uuidv4");
const express = require("express");
const app = express();
const menuRouter = require('./routes/menuRoute');
const campaignRouter = require('./routes/campaignRoute');
const { generateToken } = require("./middlewares/jwt");

const port = 5000;

app.use(express.json());

app.use('/api/menu', menuRouter);

app.use('/api/campaign', campaignRouter)

app.post(
    "/api/order/:userId",
    validateUserIdOrGuest,
    checkProducts,
    calculateTotalPrice,
    async (req, res) => {
        const order = {
            userId: req.params.userId,
            orderNr: uuid(),
            orderTime: new Date(),
            deliveryTime: new Date(new Date().getTime() + 20 * 60000), // 20 minutes
            totalPrice: res.locals.totalPrice,
            products: res.locals.products,
        };

        try {
            await saveToOrders(order); // Adds order to database
            res.json({
                success: true,
                message: "Order placed successfully",
                eta: 20,
                orderNr: order.orderNr,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Could not fetch from database",
                error: err.code,
            });
        }
    }
);

app.post(
    "/api/user/signup",
    checkUsernameAvailabilitiy,
    checkPasswordSecurity,
    async (req, res) => {
        try {
            const user = {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                userId: uuid(),
            };
            await createUser(user); // Adds user to database
            res.status(201).json({ success: true });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Error occurred while creating user",
                error: err.code,
            });
        }
    }
);

app.post(
    "/api/user/login",
    checkUsernameMatch,
    checkPasswordMatch,
    async (req, res) => {
        try {
            console.log('Inside login');
            const username = req.body.username;
            console.log(username);
            const user = await findUserByUsername(req.body.username);
            console.log('USER: ', user);
            const payload = {
                id: user._id,
                username: user.username,
                role: user.role
            }
            console.log('payload', payload);
            const token = generateToken(payload);
            console.log('token', token);
            res.json({ success: true, isLoggedIn: true, token });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Error occurred while logging in user",
                error: err.code,
            });
        }
    }
);

app.get("/api/user/:userId/history", validateUserId, async (req, res) => {
    const userId = req.params.userId;

    try {
        const orderHistory = await findOrdersByUserId(userId);
        res.json({ success: true, orderHistory });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error occurred while getting orderHistory",
            error: err.code,
        });
    }
});

app.get(
    "/api/order/status/:ordernr",
    validateOrderNr,
    calcDeliveryTime,
    async (req, res) => {
        try {
            res.json({
                success: true,
                timeLeft: res.locals.timeLeft,
                isDelivered: res.locals.timeLeft <= 0 ? true : false,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Error occurred while getting status of order",
                code: err.code,
            });
        }
    }
);

app.listen(port, () => {
    console.log("Server listening on port", port);
});
