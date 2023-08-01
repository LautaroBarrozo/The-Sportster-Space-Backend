import  express from "express"
import {z} from "zod"

export const validateSchema = (schema: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors.map(error => error.message.toUpperCase())})
        }
    }      
}