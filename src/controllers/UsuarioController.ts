import { app } from "../server";
import { usuarioRepository } from "../repositories/UsuarioRepository";

export function UsuarioController() {
  app.get("/usuarios", (req, res) => {
    const usuarios = usuarioRepository.buscarTodos();
    res.json(usuarios);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarioRepository.buscarPorId(id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  });

  app.post("/usuarios", (req, res) => {
    const { nome, email, telefone, cpf } = req.body;
    if (!nome || !email || !telefone || !cpf)
      return res.status(400).json({ erro: "Campos obrigatórios: nome, email, telefone, cpf" });
    const usuario = usuarioRepository.criar({ nome, email, telefone });
    res.status(201).json(usuario);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarioRepository.buscarPorId(id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    usuarioRepository.atualizar(id, req.body);
    res.json({ mensagem: "Usuário atualizado com sucesso" });
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarioRepository.buscarPorId(id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    usuarioRepository.deletar(id);
    res.json({ mensagem: "Usuário deletado com sucesso" });
  });
}
