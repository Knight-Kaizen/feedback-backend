const express = require('express');
const router = express.Router();

const userActions = require('../actions/user');
const { body, validationResult } = require('express-validator');

const registerValidation = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('mobile').isString().isLength({ min: 10, max: 10 }).withMessage('Mobile must be a 10-digit string'),
    body('email').isString().isEmail().withMessage('Email is invalid'),
];

router.post('/register',
    registerValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0];
            return res.status(400).json({ error: error.msg });
        }
        const { registerUser } = userActions;
        const result = await registerUser(req.body);
        if (result.success) {
            res.send({
                success: true,
                message: result.message
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }

    })

const loginValidation = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

router.post('/login', 
loginValidation, 
async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({ error: error.msg });
    }

    const { loginUser } = userActions;
    const result = await loginUser(req.body);
    if (result.success) {
        res.send({
            success: true,
            token: result.token
        })
    }
    else {
        res.status(400).send({
            success: false,
            message: result.message
        })
    }
})






module.exports = router;