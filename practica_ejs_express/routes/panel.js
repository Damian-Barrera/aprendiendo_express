import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    if(!req.session.usuario){  // en vez de repetir el if intentar haciendo un middleware 
        return res.redirect("/login");

        }else {
            console.log("Usuario logeado:" , req.session.usuario.nombre);
        }

        res.render("panel", {user : req.session.usuario})
})

export default router;  