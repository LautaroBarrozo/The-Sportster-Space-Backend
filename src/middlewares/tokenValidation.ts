import express from "express"
import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../index"


export const tokenAuth = (req: express.Request, res: express.Response, next: express.NextFunction) =>{
    const {token} = req.cookies

    if (!token) {
        return res.status(401).json({message: "TOKEN NOT PRESSENT"})
    }

    jwt.verify(token, TOKEN_SECRET, (err : any, user : any) => {
        if (err) {
            return res.status(403).json({message: "INVALID TOKEN"})
        }

        req.user = user

        next()
    })
}