import { Request, Response } from "express";
import { compraRepository } from "../repositories/CompraRepository";

export const compraController = {
  listar(req: Request, res: Response): void {
    try {
      const compras = compraRepository.buscarTodas();
      res.json(compras);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar compras" });
    }
  },

  buscarPorUsuario(req: Request, res: Response): void {
    try {
      const usuario_id = Number(req.params.usuario_id);
      const compras = compraRepository.buscarPorUsuario(usuario_id);
      res.json(compras);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar compras do usuário" });
    }
  },

  criar(req: Request, res: Response): void {
    try {
      const { usuario_id, forma_pagamento, endereco, itens } = req.body;

      if (!usuario_id || !forma_pagamento || !endereco || !itens || !Array.isArray(itens) || itens.length === 0) {
        res.status(400).json({
          erro: "Campos obrigatórios: usuario_id, forma_pagamento, endereco, itens (array não vazio)",
        });
        return;
      }

      for (const item of itens) {
        if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
          res.status(400).json({ erro: "Cada item deve ter produto_id e quantidade (> 0)" });
          return;
        }
      }

      const compra = compraRepository.criar({
        usuario_id,
        forma_pagamento,
        endereco,
        total: 0, // será recalculado no repository
        itens,
      });

      res.status(201).json(compra);
    } catch (err: any) {
      if (err?.message?.includes("não encontrado") || err?.message?.includes("insuficiente")) {
        res.status(400).json({ erro: err.message });
        return;
      }
      res.status(500).json({ erro: "Erro ao realizar compra" });
    }
  },
};