import { Router } from "express";
import {} from "../controllers/analyze.controllers.js"

/**
 * POST /analyze-tracker
 * Purpose:
 * - Accept tracker metadata from extension
 * - Forward request to controller
 */

const router=Router()

router.route("/analyze-tracker").post()

export default router;