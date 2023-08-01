import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../index"

export const accesTokenCreation = (payload : any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
                
            }
        )
    })
}