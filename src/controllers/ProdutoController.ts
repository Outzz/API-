import { app } from "../server";
import { produtoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
  app.get("/produtos", (req, res) => {
    const { nome } = req.query;
    const produtos = nome
      ? produtoRepository.buscarPorNome(String(nome))
      : produtoRepository.buscarTodos();
    res.json(produtos);
  });

  app.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const produto = produtoRepository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  });

  app.post("/produtos", (req, res) => {
    const { nome, preco, estoque, especificacoes, composicao, descricao } = req.body;
    if (!nome || preco == null || estoque == null)
      return res.status(400).json({ erro: "Campos obrigatórios: nome, preco, estoque" });
    const produto = produtoRepository.criar({ nome, preco, estoque, especificacoes, composicao, descricao });
    res.status(201).json(produto);
  });

  app.put("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const produto = produtoRepository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    produtoRepository.atualizar(id, req.body);
    res.json({ mensagem: "Produto atualizado com sucesso" });
  });

  app.patch("/produtos/:id/estoque", (req, res) => {
    const id = Number(req.params.id);
    const { estoque } = req.body;
    if (estoque == null || isNaN(Number(estoque)))
      return res.status(400).json({ erro: "Campo obrigatório: estoque (número)" });
    const produto = produtoRepository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    produtoRepository.atualizarEstoque(id, Number(estoque));
    res.json({ mensagem: "Estoque atualizado com sucesso" });
  });

  app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const produto = produtoRepository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    produtoRepository.deletar(id);
    res.json({ mensagem: "Produto deletado com sucesso" });
  });
}
