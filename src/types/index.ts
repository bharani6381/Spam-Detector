export type EmailClassification = 'legitimate' | 'spam' | 'phishing' | 'promotional' | 'suspicious';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ReasonFactor {
  factor: string;
  percentage: number;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface AttachmentInfo {
  name: string;
  size: string;
  safe: boolean;
}

export interface EmailRecord {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  urls: string[];
  classification: EmailClassification;
  confidence: number; // 0 - 100
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  reasons: ReasonFactor[];
  indicators: string[];
  createdAt: string;
  status: 'active' | 'archived' | 'flagged' | 'safe' | 'blocked';
  senderDomain: string;
  attachments?: AttachmentInfo[];
  aiAnalysisSummary?: string;
  recommendedAction?: string;
}

export interface ThreatDomain {
  id: string;
  domain: string;
  threatType: 'Phishing' | 'Malware' | 'Spoofing' | 'Botnet';
  riskScore: number;
  blockedCount: number;
  firstSeen: string;
  status: 'Active' | 'Monitored' | 'Blocked';
}

export interface SpamKeyword {
  id: string;
  keyword: string;
  category: 'Financial' | 'Urgency' | 'Credential' | 'Promotional' | 'Security';
  riskWeight: number; // 1-10
  occurrences: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AttackPattern {
  id: string;
  name: string;
  vector: string;
  severity: RiskLevel;
  targetCount: number;
  description: string;
  mitigation: string;
}

export interface ForecastPoint {
  date: string;
  historical?: number;
  predicted?: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface BIInputs {
  employees: number;
  emailsPerEmployeePerDay: number;
  spamPercentage: number; // e.g. 35%
  reviewTimeSeconds: number; // e.g. 15 seconds per spam
  hourlyCost: number; // e.g. $45 / hour
}

export interface BIResults {
  totalEmailsMonthly: number;
  totalSpamMonthly: number;
  hoursSavedMonthly: number;
  productivitySavingsMonthly: number;
  annualSavings: number;
  hoursSavedAnnual: number;
  threatsPreventedCount: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
  lastTrained: string;
  sampleCount: number;
}

export interface PredictionRequest {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  urls?: string[];
  attachments?: string[];
}

export interface PredictionResponse {
  classification: EmailClassification;
  confidence: number;
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: ReasonFactor[];
  indicators: string[];
  features: Record<string, any>;
  aiAnalysisSummary: string;
  recommendedAction: string;
  isDemo: boolean;
}
