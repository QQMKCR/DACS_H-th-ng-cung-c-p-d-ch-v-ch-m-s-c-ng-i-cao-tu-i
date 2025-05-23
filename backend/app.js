import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Thay đổi thành địa chỉ frontend của bạn
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Routes
import userRoutes from './routes/userRoutes.js';
app.use('/users', userRoutes);

import employeeRoutes from './routes/employeeRoutes.js';
app.use('/employees', employeeRoutes);

import serviceRouters from './routes/serviceRoutes.js';
app.use('/services', serviceRouters);

import promotionRouters from './routes/promotionRoutes.js';
app.use('/promotions', promotionRouters);

import accountUserRouters from './routes/accountUserRouters.js';
app.use('/accountUsers', accountUserRouters);

import accountEmployeeRouters from './routes/accountEmployeeRouters.js';
app.use('/accountEmployees', accountEmployeeRouters);

import orderRouters from './routes/orderRouters.js';
app.use('/orders', orderRouters);

import orderDetailRoutes from './routes/orderDetailRouters.js';
app.use('/order', orderDetailRoutes);

import invoiceRoutes from './routes/invoiceRouters.js';
app.use('/invoices', invoiceRoutes);

import evaluationRouters from './routes/evaluationRouters.js';
app.use('/evaluations', evaluationRouters);

// Test database connection
try {
  await sequelize.authenticate();
  console.log('Kết nối database thành công.');
} catch (error) {
  console.error('Không thể kết nối database:', error);
}

export default app;