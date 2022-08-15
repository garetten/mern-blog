import express from 'express';

import mongoose from 'mongoose';

import {registerValidation,loginValidation} from './validations/auth.js';
import { postCreateValidation } from './validations/post.js';

import checkAutch from './utils/checkAuth.js';


import * as UserController from './controllers/UserController.js'

mongoose.connect('mongodb+srv://garetten:admin@cluster0.sxy1kfu.mongodb.net/blog?retryWrites=true&w=majority'
).then(()=>{
    console.log("DB OK")
}).catch((err)=>{console.log("DB error",err)})

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)


app.get('/auth/me',checkAutch,UserController.getMe)




app.listen(4444,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server Ok')
})