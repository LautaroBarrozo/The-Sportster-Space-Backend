import { Router} from "express";
import {getAllProducts, addProduct, updateMinusProduct, updatePlusProduct, checkExistingProduct, deleteUserCart} from "../controllers/cart.controller"


const router = Router()

router.post('/getProducts', getAllProducts)
router.post('/addProduct', addProduct)
router.post('/updateMinProduct', updateMinusProduct)
router.post('/updatePlusProduct', updatePlusProduct)
router.post('/checkExistingProduct', checkExistingProduct)
router.post('/deleteCart', deleteUserCart)

export default router