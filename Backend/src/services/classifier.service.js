import mongoose from 'mongoose';
import { Tracker } from '../models/tracker.models.js'
import { generateExplanation, getFallbackExplanation } from '../services/ai.service.js';
import { ApiError, mapRiskToAction } from '../utils/index.js';


const classifierService = async ({ trackerDomain, pageDomain, signals }) => {
  const domain = trackerDomain.toLowerCase();
  const signalSet = new Set(signals);
  const knownTracker = await Tracker.findOne({ tracker: trackerDomain })

  let category = ''
  let action = ''
  let risk = ''
  let explanation = ''

  if (knownTracker) {
    console.log("It is a KNOWN TRACKER");

    category = knownTracker.category
    risk = knownTracker.risk
    explanation = knownTracker.explanation
    action = knownTracker.action

    return {
      category,
      risk,
      explanation,
      action,
    };
  }

  if (domain.includes(pageDomain)) {
    return {
      category: 'Necessary',
      risk: 'LOW',
      explanation: 'First-party resource required for site functionality.',
      action: 'Allow',
    };
  }

  if (
    signalSet.has('third-party') ||
    signalSet.has('pixel') ||
    signalSet.has('cross-site')
  ) {
    category = 'Advertising';
    risk = 'HIGH';
    action = 'Block';

  } else if (
    signals.includes('analytics')
  ) {
    category = 'Analytics';
    risk = 'MEDIUM';
  } else if (signalSet.has('analytics')) {
    category = 'Analytics';
    risk = 'MEDIUM';
  } else if (signalSet.has('iframe')) {
    category = 'Suspicious';
    risk = 'MEDIUM';
  } else {
    category = 'Unknown';
    risk = 'MEDIUM';
  }

  if (explanation === '') {
    try {
      explanation = await generateExplanation({
        trackerDomain,
        category,
        signals,
      });
      if (!explanation) {
        console.log("GEMINI GENERATION FAILED");
        throw new ApiError(500,"GEMINI GENERATION FAILED");
        
      }
    } catch (error) {
       explanation = getFallbackExplanation(category);
       console.log("AI ERROR : ",error);
       
    }
   
  }

  if (!explanation || !explanation.trim()) {
    throw new ApiError(500,"Explanation is required before saving tracker");
  }

  if (action === '') {
    action = mapRiskToAction(risk);
  }

  const newTracker = await Tracker.create({
    tracker: trackerDomain,
    category: category,
    risk: risk,
    explanation: explanation,
    action: action
  });
  if (!newTracker) {
    throw new Error("Insertion of tracker details in db failed");

  }

  return {
    category,
    risk,
    explanation,
    action,
  };
};

export { classifierService };
