import express from "express";
import "./database/database";

export const app = express();
app.use(express.json());

import { UsuarioController } from "./controllers/UsuarioController";
import { ProdutoController } from "./controllers/ProdutoController";
import { CarrinhoController } from "./controllers/CarrinhoController";
import { CompraController } from "./controllers/CompraController";
import { QuizController } from "./controllers/QuizController";
import { RotuloController } from "./controllers/RotuloController";
import { SuporteController } from "./controllers/SuporteController";

UsuarioController();
ProdutoController();
CarrinhoController();
CompraController();
QuizController();
RotuloController();
SuporteController();

app.get("/", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT ?? 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
