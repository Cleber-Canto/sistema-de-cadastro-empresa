import { Request, Response, NextFunction } from 'express';
import Usuarios from '../../models/usuarios.models';

const usuarios = new Usuarios();

export async function getOneUsuario(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    if (!id) {
      throw new Error('ID is required');
    }

    const __data = await usuarios.selectOne({ id: parseInt(id), nome: '' });
    if (!__data) {
      console.log(`Usuario with ID: ${id} not found`);
      return response.status(404).send({ message: "Usuario not found" });
    }

    console.log(`GET One Usuario - ID: ${id}, Response:`, __data);
    response.status(200).send(__data);
  } catch (error) {
    console.error(`Error in GET One Usuario - ID: ${request.params.id}`, error);
    next(error);
  }
}

export async function listUsuarios(request: Request, response: Response, next: NextFunction) {
  try {
    const __data = await usuarios.selectAll();
    console.log(`List Usuarios - Response:`, __data);
    response.status(200).send(__data);
  } catch (error) {
    console.error('Error in List Usuarios', error);
    next(error);
  }
}

export async function createUsuario(request: Request, response: Response, next: NextFunction) {
  try {
    const { nome, email, senha, id_perfil, id_unidade } = request.body;

    // Basic validation
    if (!nome || !email || !senha || !id_perfil || !id_unidade) {
      return response.status(400).send({ message: 'Nome, Email, Senha, id_perfil e id_unidade são obrigatórios' });
    }

    const __data = await usuarios.create({ nome, email, senha, id_perfil, id_unidade });
    console.log(`Create Usuario - Data:`, request.body, `Response:`, __data);
    response.status(201).send(__data);
  } catch (error) {
    console.error('Error in Create Usuario', error);
    next(error);
  }
}

export async function deleteUsuario(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    if (!id) {
      throw new Error('ID is required');
    }

    const __data = await usuarios.deleteOne({ id: parseInt(id), nome: '' });
    if (!__data) {
      console.log(`Usuario with ID: ${id} not found for deletion`);
      return response.status(404).send({ message: "Usuario not found" });
    }

    console.log(`Delete Usuario - ID: ${id}, Response:`, { deleted: true, row: __data });
    response.status(200).send({ deleted: true, row: __data });
  } catch (error) {
    console.error(`Error in Delete Usuario - ID: ${request.params.id}`, error);
    next(error);
  }
}

export async function editUsuario(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    if (!id) {
      throw new Error('ID is required');
    }

    const __data = await usuarios.editOne(request.body, { id: parseInt(id) });
    if (!__data) {
      console.log(`Usuario with ID: ${id} not found for editing`);
      return response.status(404).send({ message: "Usuario not found" });
    }

    console.log(`Edit Usuario - ID: ${id}, Data:`, request.body, `Response:`, __data);
    response.status(200).send(__data);
  } catch (error) {
    console.error(`Error in Edit Usuario - ID: ${request.params.id}`, error);
    next(error);
  }
}
