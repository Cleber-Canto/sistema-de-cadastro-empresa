import { Router } from 'express';
import { createPermissionRole, listPermissionRoles, getPermissionRole } from '../controllers/administracao/permissionsController';

const router = Router();

router.route('/permissions')
  .post(createPermissionRole)
  .get(listPermissionRoles);

router.route('/permissions/:id')
  .get(getPermissionRole);

export default router;
