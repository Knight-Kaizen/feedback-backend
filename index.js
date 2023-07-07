const express = require('express');
const cors = require('cors');

const connectDB = require('./configs/connectDB');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/product', productRoutes);

const port = process.env.PORT || 8000;
connectDB();

app.listen(port, () => {
    console.log('listening to port:', port);
})
