import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Perfis {
    async selectAll() {
        return await prisma.perfis.findMany();
    }

    async selectOne({ id }: { id: number }) {
        try {
            return await prisma.perfis.findFirst({
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
        descricao,
    }: {
        nome: string,
        descricao: string,
    }) {
        try {
            return await prisma.perfis.create({
                data: {
                    nome,
                    descricao
                }
            });
        } catch (error) {
            console.log({ error });
            throw new Error('Erro ao criar perfil');
        }
    }

    async deleteOne({ id }: { id: number }) {
        try {
            const data = await this.selectOne({ id });
            if (!data) return null;
            return await prisma.perfis.delete({
                where: {
                    id
                },
                select: {
                    id: true
                }
            });
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao excluir perfil');
        }
    }

    async editOne({
        nome,
        descricao,
    }: {
        nome: string,
        descricao: string,
    }, { id }: { id: number }) {
        try {
            id = +id;
            return await prisma.perfis.update({
                data: {
                    nome,
                    descricao,
                },
                where: {
                    id,
                },
            });
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao editar perfil');
        }
    }
}
