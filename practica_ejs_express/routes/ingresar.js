import { Router } from "express";
const router = Router();

router.get("/", (req,res) => {
    res.render("ingresar", { error: null })
})

export default router;