const express = require('express');
const router = express.Router();

const productActions = require('../actions/product');

router.post('/product/add', async (req, res) => {
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
        res.send({
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
    const {editProductDetails} = productActions;

    const result = await editProductDetails({token, productId,product_name, logo_url, product_link, product_description, product_category });
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