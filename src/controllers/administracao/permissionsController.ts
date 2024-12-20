import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPermissionRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { roleId, permissionId } = req.body;

    if (!roleId || !permissionId) {
      console.warn(`[CREATE PERMISSION_ROLE] roleId ou permissionId ausente. Dados recebidos:`, req.body);
      return res.status(400).json({ error: 'roleId and permissionId are required' });
    }

    const permissionRole = await prisma.permissionsRoles.create({
      data: { roleId, permissionId }
    });

    console.log(`[CREATE PERMISSION_ROLE] Permissão associada à função com sucesso:`, permissionRole);
    res.status(201).json(permissionRole);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[CREATE PERMISSION_ROLE] Erro ao associar permissão à função:`, error.message);
    next(error);
  }
}

export async function listPermissionRoles(req: Request, res: Response, next: NextFunction) {
  try {
    const permissionRoles = await prisma.permissionsRoles.findMany();
    res.status(200).json(permissionRoles);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[LIST PERMISSION_ROLES] Erro ao listar permissões de roles:`, error.message);
    next(error);
  }
}

export async function getPermissionRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { roleId, permissionId } = req.params;
    const permissionRole = await prisma.permissionsRoles.findUnique({
      where: { roleId_permissionId: { roleId, permissionId } },
    });

    if (!permissionRole) {
      console.warn(`[GET PERMISSION_ROLE] Associações de permissões de roles não encontradas para o Role ID: ${roleId} e Permission ID: ${permissionId}`);
      return res.status(404).send({ message: "PermissionsRoles association not found" });
    }

    res.status(200).json(permissionRole);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`[GET PERMISSION_ROLE] Erro ao recuperar associações de permissões de roles:`, error.message);
    next(error);
  }
}
