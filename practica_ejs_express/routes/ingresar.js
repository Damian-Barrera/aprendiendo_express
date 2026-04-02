import { Router } from "express";
import { authmiddleware } from "../index.js";
const router = Router();

router.get("/", authmiddleware, (req, res) => {
  return res.render("ingresar", { error: null });
});

export default router;
