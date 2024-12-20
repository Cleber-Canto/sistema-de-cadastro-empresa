import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      console.warn(`[CREATE USER_ROLE] userId ou roleId ausente. Dados recebidos:`, req.body);
      return res.status(400).json({ error: 'userId and roleId are required' });
    }

    // Verificar se o usuário existe
    const user = await prisma.usuarios.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.warn(`[CREATE USER_ROLE] Usuário com ID: ${userId} não encontrado.`);
      return res.status(404).json({ error: `Usuário com ID: ${userId} não encontrado.` });
    }

    // Verificar se a role existe
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      console.warn(`[CREATE USER_ROLE] Role com ID: ${roleId} não encontrada.`);
      return res.status(404).json({ error: `Role com ID: ${roleId} não encontrada.` });
    }

    const userRole = await prisma.usersRoles.create({
      data: { userId, roleId },
    });

    console.log(`[CREATE USER_ROLE] Role associada ao usuário com sucesso:`, userRole);
    res.status(201).json(userRole);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[CREATE USER_ROLE] Erro ao associar role ao usuário:`, error.message);
    next(error);
  }
}

export async function listUserRoles(req: Request, res: Response, next: NextFunction) {
  try {
    const userRoles = await prisma.usersRoles.findMany();
    res.status(200).json(userRoles);
  } catch (err: unknown) {
    const error = err as Error;
    next(error);
  }
}

export async function getUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, roleId } = req.params;
    const userRole = await prisma.usersRoles.findUnique({
      where: { userId_roleId: { userId: parseInt(userId), roleId } },
    });

    if (!userRole) {
      return res.status(404).send({ message: "UsersRoles association not found" });
    }

    res.status(200).json(userRole);
  } catch (err: unknown) {
    const error = err as Error;
    next(error);
  }
}
