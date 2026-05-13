import { app } from "../server";
import { suporteRepository } from "../repositories/SuporteRepository";

export function SuporteController() {
  // ─── Mensagens ──────────────────────────────────────────────────────────────

  app.get("/suporte/mensagens", (req, res) => {
    const mensagens = suporteRepository.buscarMensagens();
    res.json(mensagens);
  });

  app.post("/suporte/mensagens", (req, res) => {
    const { usuario_id, mensagem } = req.body;
    if (!mensagem)
      return res.status(400).json({ erro: "Campo obrigatório: mensagem" });
    const resultado = suporteRepository.enviarMensagem({ usuario_id, mensagem });
    res.status(201).json(resultado);
  });

  // ─── FAQ ────────────────────────────────────────────────────────────────────

  app.get("/suporte/faq", (req, res) => {
    const faq = suporteRepository.buscarFaq();
    res.json(faq);
  });

  app.post("/suporte/faq", (req, res) => {
    const { pergunta, resposta } = req.body;
    if (!pergunta || !resposta)
      return res.status(400).json({ erro: "Campos obrigatórios: pergunta, resposta" });
    const faq = suporteRepository.criarFaq({ pergunta, resposta });
    res.status(201).json(faq);
  });

  app.put("/suporte/faq/:id", (req, res) => {
    const id = Number(req.params.id);
    suporteRepository.atualizarFaq(id, req.body);
    res.json({ mensagem: "FAQ atualizado com sucesso" });
  });

  app.delete("/suporte/faq/:id", (req, res) => {
    const id = Number(req.params.id);
    suporteRepository.deletarFaq(id);
    res.json({ mensagem: "FAQ deletado com sucesso" });
  });
}
