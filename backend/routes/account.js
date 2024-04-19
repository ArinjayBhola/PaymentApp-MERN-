const express = require('express');
const zod = require('zod');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance', async (req, res) => {
    const accounts = await Account.find({});
    res.json({
        accounts
    })
});

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number()
});
router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { success } = transferBody.safeParse(req.body);
    const { to, amount } = req.body
    if (!success) {
        return res.status(411).json({
            message: "Invalid inputs",
        });
    };

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);
    if (account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    };

    const toAccount = await Account.findOne({
        userId: to,
    }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    };

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        },
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        },
    }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;