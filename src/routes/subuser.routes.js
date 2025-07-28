import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getSubUsers,
    createSubUser,
    getSubUser,
    updateSubUser,
    deleteSubUser
} from "../controllers/subuser.controller.js";

const router = Router();

router.get('/subusers', authRequired, getSubUsers);
router.get('/subusers/:id', authRequired, getSubUser);
router.post('/subusers', authRequired, createSubUser);
router.delete('/subusers/:id', authRequired, deleteSubUser);
router.put('/subusers/:id', authRequired, updateSubUser);

export default router;