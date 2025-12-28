import { AsyncHandler, ApiError, ApiResponse } from '../utils/index.js';
import { classifierService } from '../services/classifier.service.js';

const analyzeTracker = AsyncHandler(async (req, res) => {
  try {
    const { trackerDomain, pageDomain, signals } = req.body;

    if (!trackerDomain || !pageDomain || !Array.isArray(signals)) {
      throw new ApiError(403, 'Inputs not found');
    }

    const classificationResult = await classifierService({
      trackerDomain,
      pageDomain,
      signals,
    });
    if (!classificationResult) {
      throw new ApiError(500, 'Classification failed !');
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
          isBlocked: false,
          isAllowedbyUser: false,
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
