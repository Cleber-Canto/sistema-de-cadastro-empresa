import { Router, Request, Response, NextFunction } from "express";
import {
    listEmpresas,
    createEmpresa,
    deleteEmpresa,
    editEmpresa,
    getOneEmpresa
} from "../controllers/administracao/empresas.controllers";

const router = Router();

router.route('/empresas')
    .get((req: Request, res: Response, next: NextFunction) => listEmpresas(req, res, next))
    .post((req: Request, res: Response, next: NextFunction) => createEmpresa(req, res, next));

router.route('/empresas/:id')
    .get((req: Request, res: Response, next: NextFunction) => getOneEmpresa(req, res, next))
    .delete((req: Request, res: Response, next: NextFunction) => deleteEmpresa(req, res, next))
    .put((req: Request, res: Response, next: NextFunction) => editEmpresa(req, res, next));

export default router;
