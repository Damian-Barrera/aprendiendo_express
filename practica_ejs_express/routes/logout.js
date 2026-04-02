import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    req.session.destroy(()=> {
        res.redirect("/ingresar")
    })

})

export default router;