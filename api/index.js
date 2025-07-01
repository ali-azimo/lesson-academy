import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/usuario.route.js';
import cadastroRoutes from './routes/cadastro.route.js';
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

//importar as rotas
app.use('/api/usuario', userRoutes);
app.use('/api/cadastro', cadastroRoutes);


//Erros para o servidor
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Algo deu errado!";
    return res.status(errorStatus).json({
        success: false,
        errorStatus,
        errorMessage,
        stack: err.stack,
    });
}); 