const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { User, Account } = require("../db");
const JWT_SECRET = require('../config');
const { authMiddleware } = require('../middleware');

const router = express.Router();

const signupBody = zod.object({
    email: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});

router.post('/signup', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = signupBody.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    };
    const existingUser = await User.findOne({
        email: req.body.email
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    };
    const user = await User.create({
        email: createPayload.email,
        firstname: createPayload.firstname,
        lastname: createPayload.lastname,
        password: createPayload.password
    });
    const account = await Account.create({
        balance: Math.floor(Math.random() * 10000),
        userId: user._id
    });
    const userid = user._id;
    const accBalance = account.balance;
    const token = jwt.sign({
        userid,
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token,
        accBalance
    });
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
router.post('/signin', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = signinBody.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    };
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    };
    const userid = user._id;
    const token = jwt.sign({
        userid
    }, JWT_SECRET);
    res.json({
        message: "User signed in successfully",
        token
    });
});

router.delete('/signin', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = signinBody.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    };
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!user) {
        return res.status(411).json({
            message: "User not found"
        });
    };
    const userid = user._id;
    await User.deleteOne({
        _id: userid
    });
    return res.json({
        message: "User deleted successfully"
    });
});

const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional(),
});

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information",
        });
    };
    await User.updateOne(req.body, {
        id: req.userid
    });
    res.json({
        message: "Update Successful"
    });
});

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ""; // if not this then this ""
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter,
            },
        }, {
            lastname: {
                "$regex": filter,
            },
        }],
    });
    res.json({
        user: users.map((user) => ({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        })),
    });
});

module.exports = router;
