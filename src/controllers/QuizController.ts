import { app } from "../server";
import { quizRepository } from "../repositories/QuizRepository";

export function QuizController() {
  app.get("/quizzes", (req, res) => {
    const quizzes = quizRepository.buscarTodos();
    res.json(quizzes);
  });

  app.get("/quizzes/:id", (req, res) => {
    const id = Number(req.params.id);
    const quiz = quizRepository.buscarPorId(id);
    if (!quiz) return res.status(404).json({ erro: "Quiz não encontrado" });
    res.json(quiz);
  });

  app.post("/quizzes", (req, res) => {
    const { pergunta, resposta } = req.body;
    if (!pergunta || !resposta)
      return res.status(400).json({ erro: "Campos obrigatórios: pergunta, resposta" });
    const quiz = quizRepository.criar({ pergunta, resposta });
    res.status(201).json(quiz);
  });

  app.put("/quizzes/:id", (req, res) => {
    const id = Number(req.params.id);
    const quiz = quizRepository.buscarPorId(id);
    if (!quiz) return res.status(404).json({ erro: "Quiz não encontrado" });
    quizRepository.atualizar(id, req.body);
    res.json({ mensagem: "Quiz atualizado com sucesso" });
  });

  app.delete("/quizzes/:id", (req, res) => {
    const id = Number(req.params.id);
    const quiz = quizRepository.buscarPorId(id);
    if (!quiz) return res.status(404).json({ erro: "Quiz não encontrado" });
    quizRepository.deletar(id);
    res.json({ mensagem: "Quiz deletado com sucesso" });
  });
}
