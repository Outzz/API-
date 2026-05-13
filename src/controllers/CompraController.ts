import { app } from "../server";
import { compraRepository } from "../repositories/CompraRepository";

export function CompraController() {
  app.get("/compras", (req, res) => {
    const compras = compraRepository.buscarTodas();
    res.json(compras);
  });

  app.get("/compras/usuario/:usuario_id", (req, res) => {
    const usuario_id = Number(req.params.usuario_id);
    const compras = compraRepository.buscarPorUsuario(usuario_id);
    res.json(compras);
  });

  app.post("/compras", (req, res) => {
    const { usuario_id, forma_pagamento, endereco, itens } = req.body;
    if (!usuario_id || !forma_pagamento || !endereco || !itens || !Array.isArray(itens) || itens.length === 0)
      return res.status(400).json({
        erro: "Campos obrigatórios: usuario_id, forma_pagamento, endereco, itens (array não vazio)",
      });
    for (const item of itens) {
      if (!item.produto_id || !item.quantidade || item.quantidade <= 0)
        return res.status(400).json({ erro: "Cada item deve ter produto_id e quantidade (> 0)" });
    }
    const compra = compraRepository.criar({ usuario_id, forma_pagamento, endereco, total: 0, itens });
    res.status(201).json(compra);
  });
}
