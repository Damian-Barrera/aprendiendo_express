import { Router } from "express";
const router = Router();;

router.get('/', (req, res) => {
    res.send(" <h1> Esta es la pagina de usuarios </h1> <br> <a href='/'> Volver </a>");
})

export default router;