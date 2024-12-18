import { Request, Response, NextFunction } from 'express';
import Empresas from '../../models/empresas.model';

const empresas = new Empresas();

export async function getOneEmpresa(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        if (!id) {
            throw new Error('ID is required');
        }

        const __data = await empresas.selectOne({ id: parseInt(id) }); // Conversão para Int
        if (!__data) {
            console.log(`Empresa with ID: ${id} not found`);
            return response.status(404).send({ message: "Empresa not found" });
        }

        console.log(`GET One Empresa - ID: ${id}, Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in GET One Empresa - ID: ${request.params.id}`, error);
        next(error);
    }
}

export async function listEmpresas(_request: Request, response: Response, next: NextFunction) {
    try {
        const __data = await empresas.selectAll();
        console.log(`List Empresas - Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error('Error in List Empresas', error);
        next(error);
    }
}

export async function createEmpresa(request: Request, response: Response, next: NextFunction) {
    try {
        const __data = await empresas.create(request.body);
        console.log("Create Empresa Response:", __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error("Error in Create Empresa:", error);
        next(error);
    }
}

export async function deleteEmpresa(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        if (!id) {
            throw new Error('ID is required');
        }

        const __data = await empresas.deleteOne({ id: parseInt(id) }); // Conversão para Int
        if (!__data) {
            console.log(`Empresa with ID: ${id} not found for deletion`);
            return response.status(404).send({ message: "Empresa not found" });
        }

        console.log(`Delete Empresa - ID: ${id}, Response:`, { deleted: true, row: __data });
        response.status(200).send({ deleted: true, row: __data });
    } catch (error) {
        console.error(`Error in Delete Empresa - ID: ${request.params.id}`, error);
        next(error);
    }
}

export async function editEmpresa(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        if (!id) {
            throw new Error('ID is required');
        }

        const __data = await empresas.editOne(request.body, { id: parseInt(id) }); // Conversão para Int
        if (!__data) {
            console.log(`Empresa with ID: ${id} not found for editing`);
            return response.status(404).send({ message: "Empresa not found" });
        }

        console.log(`Edit Empresa - ID: ${id}, Data:`, request.body, `Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in Edit Empresa - ID: ${request.params.id}`, error);
        next(error);
    }
}
