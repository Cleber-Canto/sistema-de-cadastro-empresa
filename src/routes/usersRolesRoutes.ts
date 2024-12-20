import { Router } from 'express';
import { createUserRole, listUserRoles, getUserRole } from '../controllers/administracao/usersRolesController';

const router = Router();

router.route('/users_roles')
  .post(createUserRole)
  .get(listUserRoles);

router.route('/users_roles/:id')
  .get(getUserRole);

export default router;
