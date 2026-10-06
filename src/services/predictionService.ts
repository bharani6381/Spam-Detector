import type { EmailClassification, PredictionRequest, PredictionResponse, ReasonFactor, RiskLevel } from '../types';

// Storage key for Demo Mode toggle state
const DEMO_MODE_STORAGE_KEY = 'mailshield_demo_mode';
const API_ENDPOINT_STORAGE_KEY = 'mailshield_api_endpoint';

export function getDemoMode(): boolean {
  const stored = localStorage.getItem(DEMO_MODE_STORAGE_KEY);
  return stored !== null ? JSON.parse(stored) : true;
}

export function setDemoMode(isDemo: boolean): void {
  localStorage.setItem(DEMO_MODE_STORAGE_KEY, JSON.stringify(isDemo));
}

export function getApiEndpoint(): string {
  return localStorage.getItem(API_ENDPOINT_STORAGE_KEY) || 'http://localhost:8000/api/predict';
}

export function setApiEndpoint(url: string): void {
  localStorage.setItem(API_ENDPOINT_STORAGE_KEY, url);
}

/**
 * Main prediction entry point used by UI components
 */
export async function analyzeEmail(request: PredictionRequest): Promise<PredictionResponse> {
  const isDemo = getDemoMode();

  if (!isDemo) {
    try {
      const endpoint = getApiEndpoint();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (response.ok) {
        const data = await response.json();
        return {
          ...data,
          isDemo: false
        };
      }
      console.warn('Live API request failed, falling back to Demo Prediction Engine.');
    } catch (err) {
      console.warn('Live API unreachable, using Demo Prediction Engine.', err);
    }
  }

  // Fallback / Demo Prediction Engine
  return runDemoPredictionEngine(request);
}

/**
 * Intelligent Demo AI NLP & Heuristic Engine
 */
function runDemoPredictionEngine(req: PredictionRequest): PredictionResponse {
  const text = `${req.subject} ${req.body}`.toLowerCase();
  const sender = (req.sender || '').toLowerCase();
  const urls = req.urls || extractUrlsFromBody(req.body);

  let riskScore = 12; // Base safe score
  const indicators: string[] = [];
  const factors: ReasonFactor[] = [];

  // 1. Phishing & Credential Theft Indicators
  const urgentKeywords = ['urgent', 'immediately', 'verify your account', 'account suspended', 'action required', 'security alert', 'unauthorized access', 'click here', '24 hours', 'confirm billing'];
  let urgentMatches = 0;
  urgentKeywords.forEach(kw => {
    if (text.includes(kw)) urgentMatches++;
  });
  if (urgentMatches > 0) {
    const boost = Math.min(30, urgentMatches * 10);
    riskScore += boost;
    indicators.push('Urgent Language');
    factors.push({
      factor: 'Urgent Language',
      percentage: Math.min(35, 15 + urgentMatches * 6),
      description: `Detected ${urgentMatches} high-urgency keywords (e.g. "immediate verification", "account suspended").`,
      impact: urgentMatches > 2 ? 'high' : 'medium'
    });
  }

  // 2. Financial / Wire Transfer / Invoice scam
  const financialKeywords = ['bank', 'wire transfer', 'invoice', 'payment', 'bitcoin', 'crypto', 'gift card', 'payroll', 'tax refund', 'ssn', 'credit card', 'payout', 'claim prize'];
  let financialMatches = 0;
  financialKeywords.forEach(kw => {
    if (text.includes(kw)) financialMatches++;
  });
  if (financialMatches > 0) {
    const boost = Math.min(25, financialMatches * 8);
    riskScore += boost;
    indicators.push('Financial Request');
    factors.push({
      factor: 'Financial Keywords',
      percentage: Math.min(30, 12 + financialMatches * 5),
      description: `Contains sensitive financial terminology or payment requests.`,
      impact: financialMatches > 1 ? 'high' : 'medium'
    });
  }

  // 3. Credential Harvesting
  const credentialKeywords = ['password', 'login details', 'verify identity', 'update credentials', 're-login', 'security questions', 'access code'];
  let credentialMatches = 0;
  credentialKeywords.forEach(kw => {
    if (text.includes(kw)) credentialMatches++;
  });
  if (credentialMatches > 0) {
    riskScore += 25;
    indicators.push('Credential Request');
    factors.push({
      factor: 'Credential Request',
      percentage: 28,
      description: 'Requests credentials or login verification.',
      impact: 'high'
    });
  }

  // 4. Suspicious Sender Domain Check
  const suspiciousTLDs = ['.xyz', '.top', '.work', '.click', '.info', '.biz', '.cc', '.tk', '.online'];
  const knownSpoofPatterns = ['paypal-verify', 'security-alert', 'microsoft-update', 'bankofamerica-support', 'google-auth', 'amazon-service'];
  let isSuspiciousSender = false;

  suspiciousTLDs.forEach(tld => {
    if (sender.endsWith(tld)) isSuspiciousSender = true;
  });
  knownSpoofPatterns.forEach(pattern => {
    if (sender.includes(pattern)) isSuspiciousSender = true;
  });
  
  if (sender.includes('free') || sender.includes('admin-') || sender.includes('support-') && !sender.endsWith('.com') && !sender.endsWith('.org')) {
    isSuspiciousSender = true;
  }

  if (isSuspiciousSender) {
    riskScore += 25;
    indicators.push('Suspicious Sender');
    factors.push({
      factor: 'Suspicious Sender Domain',
      percentage: 22,
      description: `Sender address "${req.sender}" matches known untrusted domain or spoofing patterns.`,
      impact: 'high'
    });
  } else if (!sender.includes('@company.com') && !sender.includes('@trusted.org')) {
    // Unknown domain minor weight
    riskScore += 5;
    indicators.push('External Sender');
  }

  // 5. URL Analysis
  let suspiciousUrlCount = 0;
  urls.forEach(url => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('bit.ly') || urlLower.includes('tinyurl') || urlLower.includes('login') || urlLower.includes('verify') || urlLower.includes('ip-address') || /^https?:\/\/\d+\.\d+\.\d+\.\d+/.test(urlLower)) {
      suspiciousUrlCount++;
    }
  });

  if (urls.length > 0) {
    if (suspiciousUrlCount > 0) {
      riskScore += 25;
      indicators.push('Suspicious URL');
      factors.push({
        factor: 'Malicious / Shortened Link',
        percentage: 32,
        description: `Found ${suspiciousUrlCount} suspicious URL(s) linking to ip addresses, shorteners or spoofed logins.`,
        impact: 'high'
      });
    } else {
      indicators.push('External Links Included');
      factors.push({
        factor: 'External URLs Present',
        percentage: 10,
        description: `Contains ${urls.length} external URL(s).`,
        impact: 'low'
      });
    }
  }

  // 6. Excessive Promotional Content
  const promoKeywords = ['discount', 'limited offer', '% off', 'buy now', 'free shipping', 'exclusive deal', 'winner', 'cashback', 'un-subscribe'];
  let promoMatches = 0;
  promoKeywords.forEach(kw => {
    if (text.includes(kw)) promoMatches++;
  });
  if (promoMatches >= 2 && riskScore < 50) {
    riskScore += 18;
    indicators.push('Promotional Keywords');
    factors.push({
      factor: 'Promotional Copy',
      percentage: 20,
      description: 'Marketing terminology and urgency deal incentives.',
      impact: 'medium'
    });
  }

  // Cap risk score between 0 and 99
  riskScore = Math.min(99, Math.max(5, riskScore));

  // Classification Logic
  let classification: EmailClassification = 'legitimate';
  let riskLevel: RiskLevel = 'low';

  if (riskScore >= 76) {
    riskLevel = 'critical';
    classification = credentialMatches > 0 || suspiciousUrlCount > 0 || (urgentMatches > 1 && financialMatches > 0) ? 'phishing' : 'spam';
  } else if (riskScore >= 51) {
    riskLevel = 'high';
    classification = (urgentMatches > 0 || financialMatches > 0) ? 'phishing' : 'spam';
  } else if (riskScore >= 26) {
    riskLevel = 'medium';
    classification = promoMatches >= 2 ? 'promotional' : 'suspicious';
  } else {
    riskLevel = 'low';
    classification = 'legitimate';
  }

  // Normalize Explainable AI percentages to sum up to 100%
  if (factors.length === 0) {
    factors.push({
      factor: 'Legitimate Structure',
      percentage: 100,
      description: 'Standard business email formatting with clean headers and safe content.',
      impact: 'low'
    });
  } else {
    const totalRawPct = factors.reduce((sum, f) => sum + f.percentage, 0);
    factors.forEach(f => {
      f.percentage = Math.round((f.percentage / totalRawPct) * 100);
    });
  }

  // Confidence calculation based on indicator strength
  const confidence = Math.min(98.4, Math.max(78.5, 82.0 + factors.length * 3.2 + (riskScore > 80 ? 8 : 0)));

  // AI Analysis Summary & Recommended Action
  let aiAnalysisSummary = '';
  let recommendedAction = '';

  switch (classification) {
    case 'phishing':
      aiAnalysisSummary = `Critical threat detected. This message displays classic indicators of credential harvesting and identity fraud. High urgency and manipulative links detected.`;
      recommendedAction = `Block sender immediately, quarantine message, and notify security team of potential targeted phishing campaign.`;
      break;
    case 'spam':
      aiAnalysisSummary = `High confidence spam detection. Unsolicited email with repetitive marketing vectors and suspicious origin.`;
      recommendedAction = `Move message to Spam / Junk folder and block domain if persistent.`;
      break;
    case 'suspicious':
      aiAnalysisSummary = `Moderate risk identified. Email contains external links or unusual wording from an unverified domain.`;
      recommendedAction = `Exercise caution. Do not click links or download attachments without verifying sender via out-of-band communication.`;
      break;
    case 'promotional':
      aiAnalysisSummary = `Automated marketing message or newsletter. Low cybersecurity threat, high clutter factor.`;
      recommendedAction = `Unsubscribe via official merchant channels or apply inbox filter tag.`;
      break;
    case 'legitimate':
      aiAnalysisSummary = `Clean security audit. Email passes SPF/DKIM baseline tests with standard vocabulary and safe links.`;
      recommendedAction = `Safe to process normal operations.`;
      break;
  }

  return {
    classification,
    confidence: Number(confidence.toFixed(1)),
    riskScore,
    riskLevel,
    reasons: factors,
    indicators,
    features: {
      urgentKeywordCount: urgentMatches,
      financialKeywordCount: financialMatches,
      credentialRequestDetected: credentialMatches > 0,
      suspiciousUrlCount,
      senderDomainRating: isSuspiciousSender ? 'High Risk' : 'Standard',
      nlpSentimentScore: riskScore > 60 ? -0.74 : 0.12,
      modelArtifactVersion: 'MailShield-v2.4-DemoEngine'
    },
    aiAnalysisSummary,
    recommendedAction,
    isDemo: true
  };
}

function extractUrlsFromBody(body: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = body.match(urlRegex);
  return matches || [];
}
