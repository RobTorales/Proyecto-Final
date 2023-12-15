import { Router } from "express";
import { createSession } from "../controllers/payments.controller.js";

const router = Router();

router.get("/create-checkout-session", createSession);
router.get("/succes", (req, res) => res.send("succes"));
router.get("/cancel", (req, res) => res.send ("calcel"));

export default router;