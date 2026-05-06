import { Request, Response } from "express";
import { produtoRepository } from "../repositories/ProdutoRepository";

export const produtoController = {
  listar(req: Request, res: Response): void {
    try {
      const { nome } = req.query;
      const produtos = nome
        ? produtoRepository.buscarPorNome(String(nome))
        : produtoRepository.buscarTodos();
      res.json(produtos);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar produtos" });
    }
  },

  buscarPorId(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const produto = produtoRepository.buscarPorId(id);
      if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado" });
        return;
      }
      res.json(produto);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar produto" });
    }
  },

  criar(req: Request, res: Response): void {
    try {
      const { nome, preco, estoque, especificacoes, composicao, descricao } = req.body;
      if (!nome || preco == null || estoque == null) {
        res.status(400).json({ erro: "Campos obrigatórios: nome, preco, estoque" });
        return;
      }
      const produto = produtoRepository.criar({ nome, preco, estoque, especificacoes, composicao, descricao });
      res.status(201).json(produto);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar produto" });
    }
  },

  atualizar(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const produto = produtoRepository.buscarPorId(id);
      if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado" });
        return;
      }
      produtoRepository.atualizar(id, req.body);
      res.json({ mensagem: "Produto atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
  },

  atualizarEstoque(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const { estoque } = req.body;
      if (estoque == null || isNaN(Number(estoque))) {
        res.status(400).json({ erro: "Campo obrigatório: estoque (número)" });
        return;
      }
      const produto = produtoRepository.buscarPorId(id);
      if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado" });
        return;
      }
      produtoRepository.atualizarEstoque(id, Number(estoque));
      res.json({ mensagem: "Estoque atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar estoque" });
    }
  },

  deletar(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const produto = produtoRepository.buscarPorId(id);
      if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado" });
        return;
      }
      produtoRepository.deletar(id);
      res.json({ mensagem: "Produto deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar produto" });
    }
  },
};