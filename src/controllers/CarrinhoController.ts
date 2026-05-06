import { Request, Response } from "express";
import { carrinhoRepository } from "../repositories/CarrinhoRepository";

export const carrinhoController = {
  buscarPorUsuario(req: Request, res: Response): void {
    try {
      const usuario_id = Number(req.params.usuario_id);
      const carrinho = carrinhoRepository.buscarPorUsuario(usuario_id);
      if (!carrinho) {
        res.status(404).json({ erro: "Carrinho não encontrado para este usuário" });
        return;
      }
      res.json(carrinho);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar carrinho" });
    }
  },

  adicionarItem(req: Request, res: Response): void {
    try {
      const usuario_id = Number(req.params.usuario_id);
      const { produto_id, quantidade } = req.body;

      if (!produto_id || !quantidade || quantidade <= 0) {
        res.status(400).json({ erro: "Campos obrigatórios: produto_id, quantidade (> 0)" });
        return;
      }

      const carrinho_id = carrinhoRepository.criarOuBuscarCarrinho(usuario_id);
      const item = carrinhoRepository.adicionarItem(carrinho_id, { produto_id, quantidade });
      res.status(201).json(item);
    } catch (err: any) {
      if (err?.message === "Produto não encontrado") {
        res.status(404).json({ erro: err.message });
        return;
      }
      res.status(500).json({ erro: "Erro ao adicionar item ao carrinho" });
    }
  },

  removerItem(req: Request, res: Response): void {
    try {
      const item_id = Number(req.params.item_id);
      carrinhoRepository.removerItem(item_id);
      res.json({ mensagem: "Item removido do carrinho" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao remover item do carrinho" });
    }
  },

  limparCarrinho(req: Request, res: Response): void {
    try {
      const usuario_id = Number(req.params.usuario_id);
      const carrinho = carrinhoRepository.buscarPorUsuario(usuario_id);
      if (!carrinho || !carrinho.id) {
        res.status(404).json({ erro: "Carrinho não encontrado" });
        return;
      }
      carrinhoRepository.limparCarrinho(carrinho.id);
      res.json({ mensagem: "Carrinho limpo com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao limpar carrinho" });
    }
  },
};