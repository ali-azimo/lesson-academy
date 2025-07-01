import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connectedo no MongoDB');
}).catch((err) => {
    console.log(err);
});



const app = express();
app.use(express.json());

app.listen(3000, () => {
        console.log("O server está rodando na porta 3000");
    }

);

