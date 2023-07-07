const express = require('express');
const router = express.Router();

const userActions = require('../actions/user');

router.post('/register', async (req, res) => {
    const { registerUser } = userActions;
    const result = await registerUser(req.body);
    if (result.success) {
        res.send({
            success: true,
            message: result.message
        });
    }
    else {
        res.send({
            success: false,
            message: result.message
        });
    }

})

router.post('/login', async (req, res) => {
    const { loginUser } = userActions;
    const result = await loginUser(req.body);
    if (result.success) {
        res.send({
            success: true,
            token: result.token
        })
    }
    else {
        res.send({
            success: false,
            message: result.message
        })
    }
})






module.exports = router;