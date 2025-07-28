import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import subUserRoutes from './routes/subuser.routes.js';
import cookieParser from 'cookie-parser';
const app = express(); // servidor de express mongodb

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api',authRoutes);
app.use('/api',subUserRoutes);

export default app;