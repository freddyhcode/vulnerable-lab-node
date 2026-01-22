import { Router } from "express";
import { login, register } from "./controllers/user.controller.js";
import { buy } from "./controllers/shop.controller.js";
import { reports } from "./controllers/report.controller.js";

const router = Router();

router.post("/api/user/login", login);
router.post("/api/user/register", register);

router.post("/api/shop/buy", buy);

router.get("/api/reports", reports);

export default router;
