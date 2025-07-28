import { Router } from "express";
import {
    getHistories,
    getHistory,
    createHistory,
    updateHistory,
    deleteHistory
} from "../controllers/history.controller.js";

const router = Router();

router.get('/histories', getHistories);
router.get('/histories/:subUserId', getHistory);
router.post('/histories', createHistory);
router.put('/histories', updateHistory);
router.delete('/histories/:subUserId', deleteHistory);

export default router;