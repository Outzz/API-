import express from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { ProdutoController } from "./controllers/ProdutoController";
import { CarrinhoController } from "./controllers/CarrinhoController";
import { CompraController } from "./controllers/CompraController";
import { QuizController } from "./controllers/QuizController";
import { RotuloController } from "./controllers/RotuloController";
import { SuporteController } from "../controllers/SuporteController";

const app = express();
app.use(express.json());

// ─── Usuários ────────────────────────────────────────────────────────────────
app.get("/usuarios", UsuarioController.listar);
app.get("/usuarios/:id", UsuarioController.buscarPorId);
app.post("/usuarios", UsuarioController.criar);
app.put("/usuarios/:id", UsuarioController.atualizar);
app.delete("/usuarios/:id", UsuarioController.deletar);

// ─── Produtos ────────────────────────────────────────────────────────────────
// GET /produtos?nome=xyz  → busca por nome (opcional)
app.get("/produtos", ProdutoController.listar);
app.get("/produtos/:id", ProdutoController.buscarPorId);
app.post("/produtos", ProdutoController.criar);
app.put("/produtos/:id", ProdutoController.atualizar);
app.patch("/produtos/:id/estoque", ProdutoController.atualizarEstoque);
app.delete("/produtos/:id", ProdutoController.deletar);

// ─── Rótulo / Bula ───────────────────────────────────────────────────────────
app.get("/produtos/:produto_id/rotulo", RotuloController.buscarRotulo);
app.get("/produtos/:produto_id/bula", RotuloController.buscarBula);

// ─── Carrinho ────────────────────────────────────────────────────────────────
app.get("/carrinhos/:usuario_id", CarrinhoController.buscarPorUsuario);
app.post("/carrinhos/:usuario_id/itens", CarrinhoController.adicionarItem);
app.delete("/carrinhos/:usuario_id/itens/:item_id", CarrinhoController.removerItem);
app.delete("/carrinhos/:usuario_id", CarrinhoController.limparCarrinho);

// ─── Compras ─────────────────────────────────────────────────────────────────
app.get("/compras", CompraController.listar);
app.get("/compras/usuario/:usuario_id", CompraController.buscarPorUsuario);
app.post("/compras", CompraController.criar);

// ─── Quizzes ─────────────────────────────────────────────────────────────────
app.get("/quizzes", QuizController.listar);
app.get("/quizzes/:id", QuizController.buscarPorId);
app.post("/quizzes", QuizController.criar);
app.put("/quizzes/:id", QuizController.atualizar);
app.delete("/quizzes/:id", QuizController.deletar);

// ─── Suporte — Mensagens ─────────────────────────────────────────────────────
app.get("/suporte/mensagens", SuporteController.listarMensagens);
app.post("/suporte/mensagens", SuporteController.enviarMensagem);

// ─── Suporte — FAQ ───────────────────────────────────────────────────────────
app.get("/suporte/faq", SuporteController.listarFaq);
app.post("/suporte/faq", SuporteController.criarFaq);
app.put("/suporte/faq/:id", SuporteController.atualizarFaq);
app.delete("/suporte/faq/:id", SuporteController.deletarFaq);

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;