import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Cria um novo Role no banco de dados.
 * @param req Request do Express.
 * @param res Response do Express.
 * @param next NextFunction para tratamento de erros.
 */
export async function createRole(req: Request, res: Response, next: NextFunction) {
  const { id, descricao } = req.body;

  console.log(`[CREATE ROLE] Tentando criar um role com ID: ${id}, Descrição: ${descricao}`);

  try {
    const role = await prisma.role.create({
      data: { id, descricao },
    });

    console.log(`[CREATE ROLE] Role criado com sucesso:`, role);
    res.status(201).json({
      message: "Role criado com sucesso.",
      data: role,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[CREATE ROLE] Erro ao criar role:`, error.message);
    next(error);
  }
}

/**
 * Lista todos os Roles do banco de dados.
 * @param req Request do Express.
 * @param res Response do Express.
 * @param next NextFunction para tratamento de erros.
 */
export async function listRoles(req: Request, res: Response, next: NextFunction) {
  console.log(`[LIST ROLES] Tentando listar todos os roles.`);

  try {
    const roles = await prisma.role.findMany();

    console.log(`[LIST ROLES] Roles encontrados:`, roles);
    res.status(200).json({
      message: "Lista de roles recuperada com sucesso.",
      data: roles,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[LIST ROLES] Erro ao listar roles:`, error.message);
    next(error);
  }
}

/**
 * Retorna um Role específico do banco de dados.
 * @param req Request do Express.
 * @param res Response do Express.
 * @param next NextFunction para tratamento de erros.
 */
export async function getRole(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  console.log(`[GET ROLE] Tentando recuperar o role com ID: ${id}`);

  try {
    const role = await prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      console.warn(`[GET ROLE] Role não encontrado para o ID: ${id}`);
      return res.status(404).json({ message: "Role not found" });
    }

    console.log(`[GET ROLE] Role encontrado:`, role);
    res.status(200).json({
      message: "Role recuperado com sucesso.",
      data: role,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[GET ROLE] Erro ao recuperar role:`, error.message);
    next(error);
  }
}
