import { Router } from "express";

import livroController from "../controllers/livroController.js";

const router = Router();

router.get("/", livroController.index);
router.post("/", livroController.cadastrarLivro);

export default router;
