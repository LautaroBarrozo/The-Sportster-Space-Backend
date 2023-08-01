import { Router} from "express";
import { createComment, getProductComments } from "../controllers/comments.controller";
import { commentValidationSchema } from "../schemas/auth.schema";
import { validateSchema } from "../middlewares/inputDataValidator";

const router = Router()

router.post('/addComment', validateSchema(commentValidationSchema), createComment)

router.post('/getComments', getProductComments)

export default router