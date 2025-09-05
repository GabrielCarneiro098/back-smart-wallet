import express from "express";
import cors from "cors";
import { UsuariosRoutes } from "./routes/usuarios.routes";
import { envs } from "./envs";
import { TransacoesRoutes } from "./routes/transacoes.routes";
import { AuthRoutes } from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    sucesso: true,
    mensagem: "API is running",
  });
});

app.use(UsuariosRoutes.bind());
app.use(TransacoesRoutes.bind());
app.use(AuthRoutes.bind());

app.listen(envs.PORT, () => console.log("Server is running"));