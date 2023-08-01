import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {accesTokenCreation} from "../utils/jwt"
import User from "../models/user.model"
import {TOKEN_SECRET} from "../index"



export const register = async (req: express.Request, res: express.Response) =>{
    const {userName, userEmail, userPassword, confirmPassword} = req.body

    try {

        if (userPassword !== confirmPassword) {
           return res.status(500).json({message: "ERROR CREATING USER"}) 
        }

        const hash = await bcrypt.hash(userPassword, 10)

        const newUser = new User({
            userName,
            userEmail,
            userPassword: hash
        })

        const userSaved = await newUser.save()
        const token = await accesTokenCreation({id: userSaved._id})
        
        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            userName: userSaved.userName,
            userEmail: userSaved.userEmail,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: "ERROR CREATING USER"})
    }


}

export const login = async (req: express.Request, res: express.Response) =>{
    const {userEmail, userPassword} = req.body

    try {
        const userFound = await User.findOne({userEmail})

        if(!userFound){
            return res.status(400).json({message: "USER NOT FOUND"})
        }

        const passwordResult = await bcrypt.compare(userPassword, userFound.userPassword)

        if(!passwordResult){
            return res.status(400).json({message: "INCORRECT PASSWORD"})
        }

        const token = await accesTokenCreation({id: userFound._id})
        
        // res.cookie("token", token)
        res.json({
            token: token,
            id: userFound._id,
            userName: userFound.userName,
            userEmail: userFound.userEmail,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: "ERROR CREATING USER"})
    }

}

export const logout = (req: express.Request, res: express.Response) =>{
    res.cookie("token", "",{expires: new Date(0)})
    return res.sendStatus(200)
}


export const verifyToken = async (req: express.Request, res: express.Response) => {
    const {token} = req.body

    if (!token) {
        // return res.send(false)
        const message = "!token"
        return res.send(message)
    }

    jwt.verify(token, TOKEN_SECRET, async (err : any, user : any) => {
        if (err) {
            const message = "err"
            // return res.send(false)
            return res.send(message)
        }

        const userFound = await User.findById(user.id)

        if (!userFound) {
            const message = "!userfound"
            return res.send(message)
            // return res.send(false)
        }



        res.send(true)
        // return res.json({
        //     id: userFound._id,
        //     userName: userFound.userName,
        //     userEmail: userFound.userEmail
        // })
    })
}