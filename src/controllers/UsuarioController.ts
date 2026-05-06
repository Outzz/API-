import { Request, Response } from "express";
import { usuarioRepository } from "../repositories/UsuarioRepository";

export const usuarioController = {
  listar(req: Request, res: Response): void {
    try {
      const usuarios = usuarioRepository.buscarTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  },

  buscarPorId(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const usuario = usuarioRepository.buscarPorId(id);
      if (!usuario) {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  },

  criar(req: Request, res: Response): void {
    try {
      const { nome, email, telefone, cpf } = req.body;
      if (!nome || !email || !telefone || !cpf) {
        res.status(400).json({ erro: "Campos obrigatórios: nome, email, telefone, cpf" });
        return;
      }
      const usuario = usuarioRepository.criar({ nome, email, telefone, cpf });
      res.status(201).json(usuario);
    } catch (err: any) {
      if (err?.message?.includes("UNIQUE")) {
        res.status(409).json({ erro: "Email ou CPF já cadastrado" });
        return;
      }
      res.status(500).json({ erro: "Erro ao criar usuário" });
    }
  },

  atualizar(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const usuario = usuarioRepository.buscarPorId(id);
      if (!usuario) {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }
      usuarioRepository.atualizar(id, req.body);
      res.json({ mensagem: "Usuário atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  },

  deletar(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const usuario = usuarioRepository.buscarPorId(id);
      if (!usuario) {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }
      usuarioRepository.deletar(id);
      res.json({ mensagem: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
  },
};