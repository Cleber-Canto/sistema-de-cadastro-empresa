import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface CreateUserInput {
  nome: string;
  email: string;
  senha: string;
  id_perfil: number;
  id_unidade: number;
}

interface EditUserInput {
  nome?: string;
  email?: string;
  id_perfil?: number;
  id_unidade?: number;
}

interface LoginInput {
  email: string;
  senha: string;
}

export default class Usuarios {
  async selectAll() {
    return await prisma.usuarios.findMany({
      include: {
        perfil: true,
        unidade: true,
      },
    });
  }

  async selectOne({ id, nome }: { id: number; nome: string }) {
    id = +id;
    return await prisma.usuarios.findFirst({
      where: {
        id,
        nome,
      },
      include: {
        perfil: true,
        unidade: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.usuarios.findUnique({
      where: { email },
    });
  }

  async create({ nome, email, senha, id_perfil, id_unidade }: CreateUserInput) {
    try {
      const existingUser = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('Email já existe');
      }

      const unidade = await prisma.unidades.findUnique({
        where: { id: id_unidade },
      });

      const perfil = await prisma.perfis.findUnique({
        where: { id: id_perfil },
      });

      if (!unidade || !perfil) {
        throw new Error('Unidade ou Perfil não encontrado');
      }

      const hashedPassword = await bcrypt.hash(senha, 10);
      const dt = new Date().toISOString();
      const dt_criacao = dt;
      const dt_atualizacao = dt;

      return await prisma.usuarios.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          id_perfil,
          id_unidade,
          dt_criacao,
          dt_atualizacao,
        },
      });
    } catch (error) {
      console.log({ error });
      throw new Error('Erro ao criar usuário');
    }
  }

  async deleteOne({ id, nome }: { id: number; nome: string }) {
    try {
      id = +id;
      const data = await this.selectOne({ id, nome });
      if (!data) return null;
      return await prisma.usuarios.delete({
        where: {
          id,
        },
        select: {
          id: true,
          nome: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao excluir usuário');
    }
  }

  async editOne({ nome, email, id_perfil, id_unidade }: EditUserInput, { id }: { id: number }) {
    try {
      id = +id;
      let dataToUpdate: any = {
        nome,
        email,
        id_unidade,
      };

      if (typeof id_perfil === 'string') {
        dataToUpdate.id_perfil = parseInt(id_perfil);
      } else {
        dataToUpdate.id_perfil = id_perfil;
      }

      return await prisma.usuarios.update({
        data: dataToUpdate,
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao editar usuário');
    }
  }

  async login({ email, senha }: LoginInput) {
    try {
      const user = await prisma.usuarios.findUnique({
        where: { email },
        include: { perfil: true },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      if (!user.senha) {
        throw new Error('Senha não definida para o usuário');
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        throw new Error('Senha inválida');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      console.log(error);
      throw new Error('Erro no login');
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      const user = await prisma.usuarios.findUnique({
        where: { id: decoded.userId },
        include: { perfil: true },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Token inválido');
    }
  }
}
