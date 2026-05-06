import { Request, Response } from "express";
import { suporteRepository } from "../repositories/SuporteRepository";

export const suporteController = {
  // ─── Mensagens ──────────────────────────────────────────────────────────────

  listarMensagens(req: Request, res: Response): void {
    try {
      const mensagens = suporteRepository.buscarMensagens();
      res.json(mensagens);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar mensagens de suporte" });
    }
  },

  enviarMensagem(req: Request, res: Response): void {
    try {
      const { usuario_id, mensagem } = req.body;
      if (!mensagem) {
        res.status(400).json({ erro: "Campo obrigatório: mensagem" });
        return;
      }
      const resultado = suporteRepository.enviarMensagem({ usuario_id, mensagem });
      res.status(201).json(resultado);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao enviar mensagem de suporte" });
    }
  },

  // ─── FAQ ────────────────────────────────────────────────────────────────────

  listarFaq(req: Request, res: Response): void {
    try {
      const faq = suporteRepository.buscarFaq();
      res.json(faq);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar FAQ" });
    }
  },

  criarFaq(req: Request, res: Response): void {
    try {
      const { pergunta, resposta } = req.body;
      if (!pergunta || !resposta) {
        res.status(400).json({ erro: "Campos obrigatórios: pergunta, resposta" });
        return;
      }
      const faq = suporteRepository.criarFaq({ pergunta, resposta });
      res.status(201).json(faq);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar FAQ" });
    }
  },

  atualizarFaq(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      suporteRepository.atualizarFaq(id, req.body);
      res.json({ mensagem: "FAQ atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar FAQ" });
    }
  },

  deletarFaq(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      suporteRepository.deletarFaq(id);
      res.json({ mensagem: "FAQ deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar FAQ" });
    }
  },
};