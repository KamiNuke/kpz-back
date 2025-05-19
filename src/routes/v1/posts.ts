import { Router } from 'express';

import { create, list, show, update, destroy } from 'controllers/posts';

import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
import { validatorEdit } from '../../middleware/validation/posts';

const router = Router();

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], create);

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);

router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], show);

router.put('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], update);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;
