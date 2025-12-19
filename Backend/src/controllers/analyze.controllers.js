import { AsyncHandler, ApiError, ApiResponse } from '../utils/index.js';
import { classifierService } from '../services/classifier.service.js';
import {
  generateExplanation,
  getFallbackExplanation,
} from '../services/ai.service.js';
import {  mapRiskToAction } from '../utils/index.js';

/**
 * Controller: Analyze Tracker
 * Route: POST /analyze-tracker
 */
const analyzeTracker = AsyncHandler(async (req, res) => {
  try {
    const { trackerDomain , pageDomain , signals } = req.body;

    // 1️⃣ Basic input validation (minimal, MVP-safe)
    if (!trackerDomain || !pageDomain || !Array.isArray(signals)) {
      throw new ApiError(403, 'Inputs not found');
    }

    // 2️⃣ Rule-based classification (NO AI here)
    const classificationResult = classifierService({
      trackerDomain,
      pageDomain,
      signals,
    });

    const { category, risk } = classificationResult;

    // 3️⃣ AI explanation (explanation ONLY)
    let explanation;
    try {
      explanation = await generateExplanation({
        trackerDomain,
        category,
        signals,
      })
      console.log(explanation);
      if (!explanation) {
        throw new ApiError(500,"Generating explanation failed");
        
      }
    } catch (aiError) {
      // Fallback explanation if AI fails
      explanation = getFallbackExplanation(category);
    }

    // 4️⃣ Decide recommended action
    const action = mapRiskToAction(risk);

    // 5️⃣ FINAL RESPONSE (LOCK THIS FORMAT)
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          tracker: trackerDomain,
          category,
          risk,
          explanation,
          action,
        },
        'Tracker tracked successfully'
      )
    );
  } catch (error) {
    console.error('Analyze tracker error:', error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, 'Internal server error'));
  }
});

export { analyzeTracker };
