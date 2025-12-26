import { AsyncHandler, ApiError, ApiResponse } from '../utils/index.js';
import { classifierService } from '../services/classifier.service.js';
import {
  generateExplanation,
  getFallbackExplanation,
} from '../services/ai.service.js';
import { mapRiskToAction } from '../utils/index.js';


const analyzeTracker = AsyncHandler(async (req, res) => {
  try {
    const { trackerDomain, pageDomain, signals } = req.body;

    if (!trackerDomain || !pageDomain || !Array.isArray(signals)) {
      throw new ApiError(403, 'Inputs not found');
    }

    const classificationResult = classifierService({
      trackerDomain,
      pageDomain,
      signals,
    });
    if (!classificationResult) {
      throw new ApiError(500, "Classification failed");

    }
    const category = classificationResult.category
    if (classificationResult.explanation === "") {
      try {
        const explanation = await generateExplanation({
          trackerDomain,
          category,
          signals,
        })
        if (!explanation) {
          throw new ApiError(500, "Generating explanation failed");

        }
        classificationResult.explanation = explanation;

      } catch (error) {
        console.error('AI explanation error:', error);
        explanation = getFallbackExplanation(category);
      }
    }

    const isBlocked = false;
    const isAllowedbyUser = false;

    if (classificationResult.action === "") {
      classificationResult.action = mapRiskToAction(classificationResult.risk);
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          tracker: trackerDomain,
          category: classificationResult.category,
          risk: classificationResult.risk,
          explanation: classificationResult.explanation,
          action: classificationResult.action,
          isBlocked,
          isAllowedbyUser
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