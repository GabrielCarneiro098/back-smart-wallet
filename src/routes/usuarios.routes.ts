import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class UsuariosRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new UsuariosController();

    router.get("/usuarios", controller.listar); //Listar usuários
    router.get("/usuarios/:id", controller.buscar); //Listar usuário por ID
    router.post("/usuarios", controller.cadastrar); //Cadastrar usuários
    router.patch("/usuarios/:id", [authMiddleware], controller.atualizar); //Cadastrar usuários
    router.delete("/usuarios/:id",[authMiddleware], controller.deletar); //Cadastrar usuários



    return router;
  }
}