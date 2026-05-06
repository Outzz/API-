import { Request, Response } from "express";
import { bulaRepository, rotuloRepository } from "../repositories/RotuloRepository";

export const rotuloController = {
  buscarRotulo(req: Request, res: Response): void {
    try {
      const produto_id = Number(req.params.produto_id);
      const rotulo = rotuloRepository.buscarPorProduto(produto_id);
      if (!rotulo) {
        res.status(404).json({ erro: "Rótulo não encontrado para este produto" });
        return;
      }
      res.json(rotulo);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar rótulo" });
    }
  },

  buscarBula(req: Request, res: Response): void {
    try {
      const produto_id = Number(req.params.produto_id);
      const bula = bulaRepository.buscarPorProduto(produto_id);
      if (!bula) {
        res.status(404).json({ erro: "Bula não encontrada para este produto" });
        return;
      }
      res.json(bula);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar bula" });
    }
  },
};