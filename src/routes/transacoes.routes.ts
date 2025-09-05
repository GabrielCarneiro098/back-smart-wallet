import { Router } from "express";
import { TransacoesController } from "../controllers/transacoes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class TransacoesRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new TransacoesController();

    router.get("/transacoes", [authMiddleware], controller.listar.bind(controller)); //Listar usuários
    router.get("/transacoes/:id", [authMiddleware], controller.buscar.bind(controller)); //Listar usuário por ID
    router.post("/transacoes", [authMiddleware], controller.cadastrar.bind(controller)); //Cadastrar usuários
    router.patch("/transacoes/:id", [authMiddleware], controller.atualizar.bind(controller)); //Cadastrar usuários
    router.delete("/transacoes/:id", [authMiddleware], controller.deletar.bind(controller)); //Cadastrar usuários



    return router;
  }
}