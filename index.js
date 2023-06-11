const express = require('express');

const connectDB = require('./configs/connectDB');
const userController = require('./controllers/userController');


const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;
connectDB();

app.get('/', (req, res) => res.send('Backend working'));

app.post('/register', async (req, res)=>{
    // console.log();
    const {name, email, mobile, password} = req.body;
    const {registerUser} = userController;
    const result  = await registerUser({name, email, mobile, password});
    if(result.success){
        res.send({
            success: true,
            message: result.message
        });
    }
    else{
        res.status(400).send({
            success: false,
            message: result.message
        });
    }

})

app.post('/login', async(req, res)=>{
    const {name, email} = req.body;
    const {loginUser} = userController;

    const result = await loginUser(req.body);
    if(result.success){
        res.send({
            success: true,
            token: result.token
        })
    }
    else{
        res.status(400).send({
            success: false,
            message: result.message
        })
    }
})


app.listen(port, () => {
    console.log('listening to port:', port);
})
