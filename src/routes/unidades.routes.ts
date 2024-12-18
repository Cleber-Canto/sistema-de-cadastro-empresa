import { Router, Request, Response, NextFunction } from "express";

import {
    listUnidades,
    createUnidade,
    deleteUnidade,
    editUnidade,
    getOneUnidade
} from "../controllers/administracao/unidades.controllers";

const router = Router();

router.route('/unidades')
    .get((req: Request, res: Response, next: NextFunction) => listUnidades(req, res, next))
    .post((req: Request, res: Response, next: NextFunction) => createUnidade(req, res, next));

router.route('/unidades/:id')
    .get((req: Request, res: Response, next: NextFunction) => getOneUnidade(req, res, next))
    .delete((req: Request, res: Response, next: NextFunction) => deleteUnidade(req, res, next))
    .put((req: Request, res: Response, next: NextFunction) => editUnidade(req, res, next));

export default router;
