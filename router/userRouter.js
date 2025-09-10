import express from 'express';

import {getPlayers,updatePlayer,register, login } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getPlayers);
router.put('/:id', updatePlayer);
router.post('/register', register);
router.post('/login', login);

export default router;