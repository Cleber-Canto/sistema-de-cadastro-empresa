import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Unidades {
  async selectAll() {
    return await prisma.unidades.findMany();
  }

  async selectOne({ id }: { id: number }) {
    try {
      return await prisma.unidades.findFirst({
        where: {
          id,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  async create({
    nome,
    cep,
    endereco,
    bairro,
    cidade,
    estado,
    id_empresa
  }: {
    nome: string,
    cep: string,
    endereco: string,
    bairro: string,
    cidade: string,
    estado: string,
    id_empresa: number
  }) {
    try {
      const dt = new Date().toISOString();
      const dt_criacao = dt;
      const dt_atualizacao = dt;
      return await prisma.unidades.create({
        data: {
          nome,
          cep,
          endereco,
          bairro,
          cidade,
          estado,
          ativo: true, // Definindo ativo como true por padrão
          id_empresa,
          dt_criacao,
          dt_atualizacao
        }
      });
    } catch (error) {
      console.log({ error });
      throw new Error('Erro ao criar unidade');
    }
  }

  async deleteOne({ id }: { id: number }) {
    try {
      const data = await this.selectOne({ id });
      if (!data) return null;
      return await prisma.unidades.delete({
        where: {
          id
        }, select: {
          id: true
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao excluir unidade');
    }
  }

  async editOne({
    nome,
    cep,
    endereco,
    bairro,
    cidade,
    estado,
    ativo,
    id_empresa
  }: {
    nome: string,
    cep: string,
    endereco: string,
    bairro: string,
    cidade: string,
    estado: string,
    ativo: boolean,
    id_empresa: number
  }, { id }: { id: number }) {
    try {
      id = +id;
      return await prisma.unidades.update({
        data: {
          nome,
          cep,
          endereco,
          bairro,
          cidade,
          estado,
          ativo,
          id_empresa
        },
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao editar unidade');
    }
  }
}
