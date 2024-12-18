import { Request, Response, NextFunction } from 'express';
import Unidades from '../../models/unidades.model';

export async function getOneUnidade(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        const unidade = new Unidades();
        const __data = await unidade.selectOne({ id: parseInt(id) });
        console.log(`GET One Unidade - ID: ${id}, Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in GET One Unidade - ID: ${request.params.id}`, error);
        next(error);
    }
}

export async function listUnidades(_request: Request, response: Response, next: NextFunction) {
    try {
        const unidade = new Unidades();
        const __data = await unidade.selectAll();
        console.log(`List Unidades Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in List Unidades`, error);
        next(error);
    }
}

export async function createUnidade(request: Request, response: Response, next: NextFunction) {
    try {
        const unidade = new Unidades();
        const __data = await unidade.create(request.body);
        console.log(`Create Unidade - Data:`, request.body, `Response:`, __data);
        response.status(200).send(__data);
    } catch (error) {
        console.error(`Error in Create Unidade`, error);
        next(error);
    }
}

export async function deleteUnidade(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        const unidade = new Unidades();
        const __data = await unidade.deleteOne({ id: parseInt(id) });
        const result = { deleted: __data ? true : false, row: __data || null };
        console.log(`Delete Unidade - ID: ${id}, Response:`, result);
        response.status(__data ? 200 : 404).send(result);
    } catch (error) {
        console.error(`Error in Delete Unidade - ID: ${request.params.id}`, error);
        next(error);
    }
}

export async function editUnidade(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        const unidade = new Unidades();
        const __data = await unidade.editOne(request.body, { id: parseInt(id) });
        console.log(`Edit Unidade - ID: ${id}, Data:`, request.body, `Response:`, __data);
        response.status(__data ? 200 : 404).send(__data);
    } catch (error) {
        console.error(`Error in Edit Unidade - ID: ${request.params.id}`, error);
        next(error);
    }
}
