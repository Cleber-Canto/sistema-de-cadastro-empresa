import { Request, Response, NextFunction } from 'express';
import Usuarios from '../../models/usuarios.models';

const usuarios = new Usuarios();

export async function registerUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome, email, senha, id_perfil, id_unidade } = req.body;

    if (!nome || !email || !senha || !id_perfil || !id_unidade) {
      return res.status(400).send({ message: 'Nome, Email, Senha, id_perfil e id_unidade são obrigatórios' });
    }

    // Check if the user already exists
    const existingUser = await usuarios.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: 'Email já existe, faça login diretamente.' });
    }

    const usuario = await usuarios.create({ nome, email, senha, id_perfil, id_unidade });
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error in Register Usuario', error);
    next(error);
  }
}

export async function loginUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha } = req.body;
    const token = await usuarios.login({ email, senha });
    res.status(200).json(token);
  } catch (error) {
    console.error('Error in Login Usuario', error);
    next(error);
  }
}
