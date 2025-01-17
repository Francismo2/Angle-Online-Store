import express from 'express'
import {addProduct, listProducts, updateProduct, removeProduct, singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name: "image_1", maxCount: 1}, {name: "image_2", maxCount: 1}, {name: "image_3", maxCount: 1}, {name: "image_4", maxCount: 1}]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.put('/update',adminAuth, upload.fields([{name: "image_1", maxCount: 1}, {name: "image_2", maxCount: 1}, {name: "image_3", maxCount: 1}, {name: "image_4", maxCount: 1}]), updateProduct);

export default productRouter;