import { Router } from "express";
import join from "./auth.ctrl/join";
import login from "./auth.ctrl/login";

const router = Router();

router.post("/join", join);
router.post("/login", login);

export default router;