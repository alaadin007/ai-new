import { format } from 'date-fns';

interface ClinicInfo {
  name: string;
  logo: string;
  website: string;
  phone: string;
  email: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
  };
}

interface Assessment {
  date: string;
  totalScore: number;
  scores: Record<string, Record<string, number>>;
}

interface Treatment {
  name: string;
  priority: 'high' | 'medium' | 'low';
  details: string;
  generatedDescription?: string;
  url?: string;
}

export function generateAssessmentEmail(
  patientName: string,
  assessment: Assessment,
  treatments: Treatment[],
  clinicInfo: ClinicInfo
): string {
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#3b82f6'
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Aesthetic Assessment Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <!-- Header with Logo -->
  <div style="background: #f8fafc; padding: 20px; text-align: center;">
    <img src="${clinicInfo.logo}" alt="${clinicInfo.name}" style="max-height: 80px; margin-bottom: 10px;">
    <h1 style="margin: 0; color: #1e293b; font-size: 24px;">${clinicInfo.name}</h1>
  </div>

  <!-- Main Content -->
  <div style="max-width: 600px; margin: 0 auto; padding: 30px 20px;">
    <h2 style="color: #1e293b; margin-bottom: 20px;">Your Aesthetic Assessment Results</h2>
    
    <p style="margin-bottom: 20px;">Dear ${patientName},</p>
    
    <p style="margin-bottom: 20px;">Thank you for visiting ${clinicInfo.name}. Based on your assessment on ${
      format(new Date(assessment.date), 'MMMM do, yyyy')
    }, we have prepared a personalized treatment plan to help you achieve your aesthetic goals.</p>

    <!-- Assessment Summary -->
    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
      <h3 style="color: #1e293b; margin-top: 0;">Assessment Summary</h3>
      <p>Date: ${format(new Date(assessment.date), 'MMMM do, yyyy')}</p>
      <p>Overall Assessment Score: ${assessment.totalScore}</p>
    </div>

    <!-- Recommended Treatments -->
    <h3 style="color: #1e293b; margin-bottom: 20px;">Recommended Treatments</h3>
    
    ${treatments.map(treatment => `
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <h4 style="margin: 0; color: #1e293b; flex: 1;">${treatment.name}</h4>
          <span style="background: ${priorityColors[treatment.priority]}20; color: ${
            priorityColors[treatment.priority]
          }; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
            ${treatment.priority.charAt(0).toUpperCase() + treatment.priority.slice(1)} Priority
          </span>
        </div>
        
        ${treatment.generatedDescription ? `
          <p style="margin-bottom: 15px;">${treatment.generatedDescription}</p>
        ` : ''}
        
        ${treatment.url ? `
          <a href="${treatment.url}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">
            Learn more about this treatment →
          </a>
        ` : ''}
      </div>
    `).join('')}

    <!-- Call to Action -->
    <div style="background: #3b82f6; color: white; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
      <p style="margin: 0 0 15px 0; font-size: 18px;">Ready to start your treatment journey?</p>
      <a href="tel:${clinicInfo.phone}" style="display: inline-block; background: white; color: #3b82f6; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold;">
        Book Your Treatment
      </a>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center; color: #64748b;">
      <p style="margin-bottom: 15px;">${clinicInfo.name}</p>
      <p style="margin-bottom: 15px;">
        <a href="tel:${clinicInfo.phone}" style="color: #3b82f6; text-decoration: none;">${clinicInfo.phone}</a>
        <br>
        <a href="mailto:${clinicInfo.email}" style="color: #3b82f6; text-decoration: none;">${clinicInfo.email}</a>
      </p>
      
      ${clinicInfo.socialMedia.instagram || clinicInfo.socialMedia.facebook ? `
        <div style="margin-bottom: 15px;">
          ${clinicInfo.socialMedia.instagram ? `
            <a href="https://instagram.com/${clinicInfo.socialMedia.instagram}" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">
              Instagram
            </a>
          ` : ''}
          ${clinicInfo.socialMedia.facebook ? `
            <a href="${clinicInfo.socialMedia.facebook}" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">
              Facebook
            </a>
          ` : ''}
        </div>
      ` : ''}
      
      <p style="font-size: 12px; color: #94a3b8;">
        This email contains confidential medical information and is intended only for the named recipient.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}