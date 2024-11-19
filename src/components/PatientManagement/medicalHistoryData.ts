export const INITIAL_CATEGORIES = [
  { id: 'general', name: 'General Health' },
  { id: 'treatments', name: 'Previous Treatments' },
  { id: 'conditions', name: 'Medical Conditions' },
  { id: 'allergies', name: 'Allergies & Reactions' },
  { id: 'lifestyle', name: 'Lifestyle Factors' }
] as const;

export const INITIAL_QUESTIONS = [
  // General Health
  { id: 'pregnantOrBreastFeeding', text: 'Are you pregnant or breast feeding?', type: 'yesNo', categoryId: 'general' },
  { id: 'currentMedications', text: 'Are you currently taking any other medication?', type: 'yesNo', categoryId: 'general', additionalDetails: true },
  { id: 'generalAnaesthetic', text: 'Are you having general anaesthetic within the next 10 days?', type: 'yesNo', categoryId: 'general' },
  
  // Previous Treatments
  { id: 'previousBotox', text: 'Have you previously been treated with Botox?', type: 'yesNo', categoryId: 'treatments', additionalDetails: true },
  { id: 'previousFiller', text: 'Have you previously been treated with any dermal filler on your face?', type: 'yesNo', categoryId: 'treatments', additionalDetails: true },
  { id: 'hypersensitivity', text: 'Have you been treated with Botox or dermal filler and shown hypersensitivity to these?', type: 'yesNo', categoryId: 'treatments' },
  { id: 'permanentImplants', text: 'Do you have any permanent implant(s) at the site(s) to be treated?', type: 'yesNo', categoryId: 'treatments' },
  { id: 'laserTreatment', text: 'Have you undergone laser skin resurfacing or received a skin peel in the past six weeks?', type: 'yesNo', categoryId: 'treatments' },
  { id: 'roaccutane', text: 'Have you received Roaccutane treatment in the past 12 months?', type: 'yesNo', categoryId: 'treatments' },
  
  // Medical Conditions
  { id: 'muscleDisorders', text: 'Do you have any disorders of muscle activity?', type: 'yesNo', categoryId: 'conditions' },
  { id: 'bleedingDisorder', text: 'Do you have a bleeding disorder?', type: 'yesNo', categoryId: 'conditions' },
  { id: 'bellsPalsy', text: 'Do you have a history of Bells Palsy?', type: 'yesNo', categoryId: 'conditions' },
  { id: 'facialHerpes', text: 'Do you suffer from facial herpes simplex or have any active skin conditions?', type: 'yesNo', categoryId: 'conditions' },
  { id: 'illnesses', text: 'Do you suffer from any illnesses?', type: 'yesNo', categoryId: 'conditions', additionalDetails: true },
  { id: 'recentSurgery', text: 'Have you recently undergone major surgery?', type: 'yesNo', categoryId: 'conditions' },
  { id: 'dentalSurgery', text: 'Are you currently undergoing dental surgery?', type: 'yesNo', categoryId: 'conditions' },
  { id: 'keloidScarring', text: 'Do you suffer from keloid or hypertrophic scarring?', type: 'yesNo', categoryId: 'conditions' },
  
  // Allergies & Reactions
  { id: 'allergies', text: 'Do you suffer from any known allergies?', type: 'yesNo', categoryId: 'allergies', additionalDetails: true },
  { id: 'anaphylacticShock', text: 'Do you have a history of anaphylactic shock?', type: 'yesNo', categoryId: 'allergies' },
  { id: 'bloodThinners', text: 'Are you taking aspirin, steroids or anticoagulants?', type: 'yesNo', categoryId: 'allergies' },
  { id: 'antibiotics', text: 'Are you having treatment with aminoglycoside antibiotics or spectinomucin tetracycline or polymixin or lincomycine?', type: 'yesNo', categoryId: 'allergies' },
  
  // Lifestyle Factors
  { id: 'smoking', text: 'Do you smoke?', type: 'yesNo', categoryId: 'lifestyle' },
  { id: 'sunExposure', text: 'Have you recently been exposed to the sun or sun beds?', type: 'yesNo', categoryId: 'lifestyle' },
  { id: 'proneToBruising', text: 'Are you prone to bruising?', type: 'yesNo', categoryId: 'lifestyle' },
  { id: 'needlePhobia', text: 'Do you have a needle phobia?', type: 'yesNo', categoryId: 'lifestyle' }
] as const;