import express from 'express';
import cors from 'cors';
import PostRouter from './router/PostsRouter.js';
import userRouter from './router/userRouter.js'
import { config } from 'dotenv';
config();
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/',PostRouter)
app.use('/',userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`server running at port ${PORT}`);
    
})