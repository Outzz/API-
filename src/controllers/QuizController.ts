import { Request, Response } from "express";
import { quizRepository } from "../repositories/QuizRepository";

export const quizController = {
  listar(req: Request, res: Response): void {
    try {
      const quizzes = quizRepository.buscarTodos();
      res.json(quizzes);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar quizzes" });
    }
  },

  buscarPorId(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const quiz = quizRepository.buscarPorId(id);
      if (!quiz) {
        res.status(404).json({ erro: "Quiz não encontrado" });
        return;
      }
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar quiz" });
    }
  },

  criar(req: Request, res: Response): void {
    try {
      const { pergunta, resposta } = req.body;
      if (!pergunta || !resposta) {
        res.status(400).json({ erro: "Campos obrigatórios: pergunta, resposta" });
        return;
      }
      const quiz = quizRepository.criar({ pergunta, resposta });
      res.status(201).json(quiz);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar quiz" });
    }
  },

  atualizar(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const quiz = quizRepository.buscarPorId(id);
      if (!quiz) {
        res.status(404).json({ erro: "Quiz não encontrado" });
        return;
      }
      quizRepository.atualizar(id, req.body);
      res.json({ mensagem: "Quiz atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar quiz" });
    }
  },

  deletar(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const quiz = quizRepository.buscarPorId(id);
      if (!quiz) {
        res.status(404).json({ erro: "Quiz não encontrado" });
        return;
      }
      quizRepository.deletar(id);
      res.json({ mensagem: "Quiz deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar quiz" });
    }
  },
};