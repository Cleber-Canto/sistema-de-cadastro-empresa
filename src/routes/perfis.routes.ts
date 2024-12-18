import { Router, Request, Response, NextFunction } from "express";
import {
    listPerfis,
    createPerfil,
    deletePerfil,
    editPerfil,
    getOnePerfil
} from "../controllers/administracao/perfis.controllers";

const router = Router();

router.route('/perfis')
    .get((req: Request, res: Response, next: NextFunction) => listPerfis(req, res, next))
    .post((req: Request, res: Response, next: NextFunction) => createPerfil(req, res, next));

router.route('/perfis/:id')
    .get((req: Request, res: Response, next: NextFunction) => getOnePerfil(req, res, next))
    .delete((req: Request, res: Response, next: NextFunction) => deletePerfil(req, res, next))
    .put((req: Request, res: Response, next: NextFunction) => editPerfil(req, res, next));

export default router;
