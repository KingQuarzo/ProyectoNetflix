import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express(); // servidor de express mongodb

app.use(morgan('dev'));
app.use(express.json());

app.use('/api',authRoutes);

export default app;