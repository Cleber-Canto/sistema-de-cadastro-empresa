import { Router } from 'express';
import { createPermissionRole, listPermissionRoles, getPermissionRole } from '../controllers/administracao/permissionsRolesController';

const router = Router();

router.route('/permissions_roles')
  .post(createPermissionRole)
  .get(listPermissionRoles);

router.route('/permissions_roles/:roleId/:permissionId')
  .get(getPermissionRole);

export default router;
