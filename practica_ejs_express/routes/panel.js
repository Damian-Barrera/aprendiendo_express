import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    if(!req.session.usuario){
        return res.redirect("/login");

        }

        res.render("panel", {user : req.session.usuario})
})

export default router;  