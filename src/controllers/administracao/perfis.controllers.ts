import { Request, Response, NextFunction } from 'express';
import Perfis from '../../models/perfis.model';

const perfis = new Perfis();

export async function getOnePerfil(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        if (!id) {
            throw new Error('ID is required');
        }

        const __data = await perfis.selectOne({ id: parseInt(id) }); // Conversão para Int
        if (!__data) {
            console.log(`Perfil with ID: ${id} not found`);
            return response.status(404).send({ message: "Perfil not found" });
        }

        console.log(`GET One Perfil - ID: ${id}, Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in GET One Perfil - ID: ${request.params.id}`, error);
        next(error);
    }
}

export async function listPerfis(_request: Request, response: Response, next: NextFunction) {
    try {
        const __data = await perfis.selectAll();
        console.log(`List Perfis - Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error('Error in List Perfis', error);
        next(error);
    }
}

export async function createPerfil(request: Request, response: Response, next: NextFunction) {
    try {
        const __data = await perfis.create(request.body);
        console.log("Create Perfil Response:", __data);
        response.status(201).send(__data);
    } catch (error) {
        console.error("Error in Create Perfil:", error);
        next(error);
    }
}

export async function deletePerfil(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        if (!id) {
            throw new Error('ID is required');
        }

        const __data = await perfis.deleteOne({ id: parseInt(id) }); // Conversão para Int
        if (!__data) {
            console.log(`Perfil with ID: ${id} not found for deletion`);
            return response.status(404).send({ message: "Perfil not found" });
        }

        console.log(`Delete Perfil - ID: ${id}, Response:`, { deleted: true, row: __data });
        response.status(200).send({ deleted: true, row: __data });
    } catch (error) {
        console.error(`Error in Delete Perfil - ID: ${request.params.id}`, error);
        next(error);
    }
}

export async function editPerfil(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        if (!id) {
            throw new Error('ID is required');
        }

        const __data = await perfis.editOne(request.body, { id: parseInt(id) }); // Conversão para Int
        if (!__data) {
            console.log(`Perfil with ID: ${id} not found for editing`);
            return response.status(404).send({ message: "Perfil not found" });
        }

        console.log(`Edit Perfil - ID: ${id}, Data:`, request.body, `Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in Edit Perfil - ID: ${request.params.id}`, error);
        next(error);
    }
}
