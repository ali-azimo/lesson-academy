import express from 'express';
import { test } from '../controllers/usuario.controller.js';

const router = express.Router();


router.get("/test", test);

export default router;