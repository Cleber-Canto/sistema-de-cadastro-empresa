import { Router } from 'express';
import { createRole, listRoles, getRole } from '../controllers/administracao/rolesController';

const router = Router();

router.route('/roles')
  .post(createRole)
  .get(listRoles);

router.route('/roles/:id')
  .get(getRole);

export default router;
