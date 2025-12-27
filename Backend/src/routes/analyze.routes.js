import { Router } from 'express';
import { analyzeTracker } from '../controllers/analyze.controllers.js';



const router = Router();

router.route('/analyze-tracker').post(analyzeTracker);

export default router;
