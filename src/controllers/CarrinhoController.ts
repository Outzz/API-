import { app } from "../server";
import { carrinhoRepository } from "../repositories/CarrinhoRepository";

export function CarrinhoController() {
  app.get("/carrinhos/:usuario_id", (req, res) => {
    const usuario_id = Number(req.params.usuario_id);
    const carrinho = carrinhoRepository.buscarPorUsuario(usuario_id);
    if (!carrinho) return res.status(404).json({ erro: "Carrinho não encontrado para este usuário" });
    res.json(carrinho);
  });

  app.post("/carrinhos/:usuario_id/itens", (req, res) => {
    const usuario_id = Number(req.params.usuario_id);
    const { produto_id, quantidade } = req.body;
    if (!produto_id || !quantidade || quantidade <= 0)
      return res.status(400).json({ erro: "Campos obrigatórios: produto_id, quantidade (> 0)" });
    const carrinho_id = carrinhoRepository.criarOuBuscarCarrinho(usuario_id);
    const item = carrinhoRepository.adicionarItem(carrinho_id, { produto_id, quantidade });
    res.status(201).json(item);
  });

  app.delete("/carrinhos/:usuario_id/itens/:item_id", (req, res) => {
    const item_id = Number(req.params.item_id);
    carrinhoRepository.removerItem(item_id);
    res.json({ mensagem: "Item removido do carrinho" });
  });

  app.delete("/carrinhos/:usuario_id", (req, res) => {
    const usuario_id = Number(req.params.usuario_id);
    const carrinho = carrinhoRepository.buscarPorUsuario(usuario_id);
    if (!carrinho || !carrinho.id) return res.status(404).json({ erro: "Carrinho não encontrado" });
    carrinhoRepository.limparCarrinho(carrinho.id);
    res.json({ mensagem: "Carrinho limpo com sucesso" });
  });
}
