import express from 'express';
import {placeOrder, allOrders, userOrders, updateStatus, cancelOrder, userOrderInfo, admDeleteOrder, deleteOrder} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// THIS IS FOR THE ADMIN
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.post('/remove-adm', adminAuth, admDeleteOrder);




// THIS IS FOR THE PAYMENT
orderRouter.post('/place-order', authUser, placeOrder); // COD
// USER ORDERS
orderRouter.post('/user-order', authUser, userOrders);
orderRouter.post('/order-info', authUser, userOrderInfo);
orderRouter.post('/cancel', authUser, cancelOrder);
orderRouter.post('/remove', authUser, cancelOrder);

export default orderRouter;
