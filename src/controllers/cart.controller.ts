import express from "express"
import Cart from "../models/cartProduct.model"

export const getAllProducts = async (req: express.Request, res: express.Response) =>{
    const {userId} = req.body

    const products = await Cart.find({userId: userId})

    res.json(products)
}

export const addProduct = async (req: express.Request, res: express.Response) =>{
    const {image, name, price, productId, userId} = req.body

    const newProduct = new Cart({
        image,
        name,
        price,
        productId,
        userId
    })

    const savedProduct = await newProduct.save()
    res.json(savedProduct)
}

export const updateMinusProduct = async (req: express.Request, res: express.Response) =>{
    const {userId, productId} = req.body

    const product = await Cart.findOne({productId: productId, userId: userId})

    if (!product) {
        return res.status(401).json({message: "PRODUCT NOT FOUND"})
    }

    const finalQuantity = product.quantity - 1

    if (finalQuantity == 0) {
        const product = await Cart.findOneAndDelete({productId: productId, userId: userId})
        return res.json(product)
    }

    const filter = {productId: productId, userId: userId}
    const update = {quantity: finalQuantity}

    const updatedProduct = await Cart.findOneAndUpdate(filter, update, {new: true})


    res.json(updatedProduct)
}

export const updatePlusProduct = async (req: express.Request, res: express.Response) =>{
    const {userId, productId} = req.body

    const product = await Cart.findOne({productId: productId, userId: userId})

    if (!product) {
        return res.status(401).json({message: "PRODUCT NOT FOUND"})
    }

    const finalQuantity = product.quantity + 1

    const filter = {productId: productId, userId: userId}
    const update = {quantity: finalQuantity}

    const updatedProduct = await Cart.findOneAndUpdate(filter, update, {new: true})


    res.json(updatedProduct)
}

export const checkExistingProduct = async (req: express.Request, res: express.Response) =>{
    const {userId ,productId} = req.body

    const product = await Cart.findOne({userId: userId, productId: productId})

    if (product === null) {
        return res.send(false)
    }

    return res.send(true)
}

export const deleteUserCart = async (req: express.Request, res: express.Response) =>{
    const {userId} = req.body

    const response = await Cart.deleteMany({userId: userId})

    return res.json(response)
}