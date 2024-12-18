import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Empresas {
    async selectAll() {
        try {
            return await prisma.empresas.findMany();
        } catch (error) {
            console.error("Erro ao listar empresas:", error);
            throw new Error("Erro ao listar empresas.");
        }
    }

    async selectOne({ id }: { id: number }) {
        try {
            return await prisma.empresas.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error("Erro ao obter empresa:", error);
            throw new Error("Erro ao obter a empresa.");
        }
    }
    
    async create({
        cnpj,
        inscricao_estadual,
        razao_social,
        nome_fantasia,
        endereco,
        numero_endereco,
        bairro,
        complemento,
        cidade,
        cep,
        telefone,
        email,
        ativo,
    }: {
        cnpj: string,
        inscricao_estadual: string,
        razao_social: string,
        nome_fantasia: string,
        endereco: string,
        numero_endereco: string,
        bairro: string,
        complemento: string,
        cidade: string,
        cep: string,
        telefone: string,
        email: string,
        ativo: boolean,
    }) {
        try {
            const dt = new Date().toISOString();
            return await prisma.empresas.create({
                data: {
                    cnpj,
                    inscricao_estadual,
                    razao_social,
                    nome_fantasia,
                    endereco,
                    numero_endereco,
                    bairro,
                    complemento,
                    cidade,
                    cep,
                    telefone,
                    email,
                    ativo,
                    dt_criacao: dt,
                    dt_atualizacao: dt
                }
            });
        } catch (error) {
            console.error("Erro ao criar empresa:", error);
            throw new Error("Erro ao criar a empresa.");
        }
    }

    async deleteOne({ id }: { id: number }) {
        try {
            const empresa = await this.selectOne({ id });
            if (!empresa) return null;
            return await prisma.empresas.delete({
                where: { id },
                select: { id: true },
            });
        } catch (error) {
            console.error("Erro ao excluir empresa:", error);
            throw new Error("Erro ao excluir a empresa.");
        }
    }

    async editOne(data: any, { id }: { id: number }) {
        try {
            return await prisma.empresas.update({
                where: { id },
                data,
            });
        } catch (error) {
            console.error("Erro ao editar empresa:", error);
            throw new Error("Erro ao editar a empresa.");
        }
    }
}
