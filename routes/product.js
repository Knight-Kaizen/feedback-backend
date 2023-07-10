const express = require('express');
const router = express.Router();

const productActions = require('../actions/product');
const { validationResult, body } = require('express-validator');

const addValidation = [
    body('product_name').isString().notEmpty().withMessage('Product name is required'),
    body('logo_url').isString().notEmpty().withMessage('logo_url name is required'),
    body('product_link').isString().notEmpty().withMessage('product_link name is required'),
    body('product_description').isString().notEmpty().withMessage('product_description name is required'),
    body('product_category').isString().notEmpty().withMessage('product_category name is required')
];

router.post('/product/add', addValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({ error: error.msg });
    }
    let token = req.headers.authorization;
    const { product_name, logo_url, product_link, product_description, product_category } = req.body;

    const { addProduct } = productActions;

    const result = await addProduct({
        token, product_name, logo_url, product_link, product_description, product_category
    });
    console.log(result);
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

router.get('/product/view', async (req, res) => {
    const { sort, product_category } = req.query;
    const { getProducts } = productActions;

    const result = await getProducts(product_category, sort);
    if (result.success) {
        res.send({
            success: true,
            data: result.data
        });
    }
    else {
        res.status(400).send({
            success: false,
            message: result.message
        });
    }
})

router.patch('/product/comment/:id', async (req, res) => {
    const productId = req.params.id;
    const comment = req.body.comment;
    const { addComment } = productActions;

    const result = await addComment({ productId, comment });
    if (result.success) {
        res.send({
            success: true,
            message: result.message
        });
    }
    else {
        res.status(400).send({
            success: false,
            message: result.message
        });
    }
})

router.patch('/product/like/:id', async (req, res) => {
    const productId = req.params.id;
    const { addLike } = productActions;
    const result = await addLike({ productId });
    if (result.success) {
        res.send({
            success: true,
            message: result.message
        })
    } else {
        res.status(400).send({
            success: false,
            message: result.message
        })
    }
})

router.patch('/product/edit/:id', async (req, res) => {
    const productId = req.params.id;
    const token = req.headers.authorization;
    const { product_name, logo_url, product_link, product_description, product_category } = req.body;
    const { editProductDetails } = productActions;

    const result = await editProductDetails({ token, productId, product_name, logo_url, product_link, product_description, product_category });
    if (result.success) {
        res.send({
            success: true,
            message: result.message
        })
    } else {
        res.status(400).send({
            success: false,
            message: result.message
        })
    }
})

module.exports = router;