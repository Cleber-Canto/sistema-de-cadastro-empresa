import { Request, Response, NextFunction } from 'express';
import Usuarios from '../../models/usuarios.models';

const usuarios = new Usuarios();

export async function getOneUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }

    console.log(`Buscando usuário com ID: ${id}`);
    const usuario = await usuarios.selectOne({ id: parseInt(id) });

    if (!usuario) {
      console.log(`Usuário com ID: ${id} não encontrado.`);
      return res.status(404).send({ message: 'Usuario not found' });
    }

    console.log(`Usuário encontrado:`, usuario);
    res.status(200).json(usuario);
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID: ${req.params.id}`, error);
    next(error);
  }
}

export async function listUsuarios(req: Request, res: Response, next: NextFunction) {
  try {
    const __data = await usuarios.selectAll();
    console.log(`List Usuarios - Response:`, __data);
    res.status(200).send(__data);
  } catch (error) {
    console.error('Error in List Usuarios', error);
    next(error);
  }
}

export async function createUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome, email, senha, id_perfil, id_unidade } = req.body;

    // Basic validation
    if (!nome || !email || !senha || !id_perfil || !id_unidade) {
      return res.status(400).send({ message: 'Nome, Email, Senha, id_perfil e id_unidade são obrigatórios' });
    }

    const __data = await usuarios.create({ nome, email, senha, id_perfil, id_unidade });
    console.log(`Create Usuario - Data:`, req.body, `Response:`, __data);
    res.status(201).send(__data);
  } catch (error) {
    console.error('Error in Create Usuario', error);
    next(error);
  }
}

export async function deleteUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID is required');
    }

    const __data = await usuarios.deleteOne({ id: parseInt(id), nome: '' });
    if (!__data) {
      console.log(`Usuario with ID: ${id} not found for deletion`);
      return res.status(404).send({ message: "Usuario not found" });
    }

    console.log(`Delete Usuario - ID: ${id}, Response:`, { deleted: true, row: __data });
    res.status(200).send({ deleted: true, row: __data });
  } catch (error) {
    console.error(`Error in Delete Usuario - ID: ${req.params.id}`, error);
    next(error);
  }
}

export async function editUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID is required');
    }

    const __data = await usuarios.editOne(req.body, { id: parseInt(id) });
    if (!__data) {
      console.log(`Usuario with ID: ${id} not found for editing`);
      return res.status(404).send({ message: "Usuario not found" });
    }

    console.log(`Edit Usuario - ID: ${id}, Data:`, req.body, `Response:`, __data);
    res.status(200).send(__data);
  } catch (error) {
    console.error(`Error in Edit Usuario - ID: ${req.params.id}`, error);
    next(error);
  }
}
