import { Router } from "express";
import emprestimoController from "../controllers/emprestimoController.js";

const router = Router();

router.get("/", emprestimoController.index);
router.post("/", emprestimoController.cadastrarEmprestimo);

router.delete("/:id", emprestimoController.devolverEmprestimo);
router.get("/:id/editar", emprestimoController.editar);
router.put("/:id", emprestimoController.atualizar);

export default router;
