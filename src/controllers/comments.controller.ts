import express from "express"
import Comments from "../models/comments.model"

export const getProductComments = async (req: express.Request, res: express.Response) =>{
    const {productId} = req.body
    const comments = await Comments.find({productId: productId})

    res.json(comments)
}

export const createComment = async (req: express.Request, res: express.Response) =>{
    const {comment, userName, productId} = req.body

    const newComment = new Comments({
        comment,
        userName,
        productId,
    })

    const savedComment = await newComment.save()
    res.json(savedComment)
}
