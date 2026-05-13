import { app } from "../server";
import { rotuloRepository, bulaRepository } from "../repositories/RotuloRepository";

export function RotuloController() {
  app.get("/produtos/:produto_id/rotulo", (req, res) => {
    const produto_id = Number(req.params.produto_id);
    const rotulo = rotuloRepository.buscarPorProduto(produto_id);
    if (!rotulo) return res.status(404).json({ erro: "Rótulo não encontrado para este produto" });
    res.json(rotulo);
  });

  app.get("/produtos/:produto_id/bula", (req, res) => {
    const produto_id = Number(req.params.produto_id);
    const bula = bulaRepository.buscarPorProduto(produto_id);
    if (!bula) return res.status(404).json({ erro: "Bula não encontrada para este produto" });
    res.json(bula);
  });
}
