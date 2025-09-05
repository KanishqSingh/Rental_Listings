import express from 'express';
import { protect } from '../middleware/auth.js';
import {  addProperty, changeRoleToOwner, deleteProperty, getDashBoardData, getOwnerProperty, togglePropertyAvailabilty, updateUserImage } from '../controllers/OwnerController.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/change-role',protect,changeRoleToOwner)
ownerRouter.post('/add-property',upload.single("image"),protect,addProperty)
ownerRouter.get('/properties',protect,getOwnerProperty)
ownerRouter.get('/dashboard',protect,getDashBoardData)
ownerRouter.post('/update-image',upload.single('image'),protect,updateUserImage)
ownerRouter.post('/toggle-property',protect,togglePropertyAvailabilty)
ownerRouter.post('/delete-property',protect,deleteProperty)

// hello there

export default ownerRouter;