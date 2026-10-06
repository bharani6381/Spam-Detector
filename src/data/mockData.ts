import type { AttackPattern, EmailRecord, ForecastPoint, ModelMetrics, SpamKeyword, ThreatDomain } from '../types';

export const initialEmails: EmailRecord[] = [
  {
    id: 'msg-101',
    sender: 'security-alert@bank-verify-online.xyz',
    recipient: 'alex.finance@acme-corp.com',
    subject: 'URGENT: Your Account Has Been Suspiciously Suspended',
    body: 'Dear Customer,\n\nWe detected an unauthorized login attempt from IP 192.168.4.12. To prevent permanent suspension, you MUST verify your account credentials within 24 hours.\n\nClick the link below immediately:\nhttp://bit.ly/bank-auth-secure-verify\n\nFailure to comply will result in account termination.\n\nBank Security Team',
    urls: ['http://bit.ly/bank-auth-secure-verify'],
    classification: 'phishing',
    confidence: 96.4,
    riskScore: 92,
    riskLevel: 'critical',
    reasons: [
      { factor: 'Suspicious Link (bit.ly)', percentage: 35, description: 'Directs to shortened untrusted URL', impact: 'high' },
      { factor: 'Urgent Language', percentage: 25, description: 'demands 24-hour verification under threat of loss', impact: 'high' },
      { factor: 'Suspicious Sender Domain (.xyz)', percentage: 22, description: 'Domain registered on high-risk TLD', impact: 'high' },
      { factor: 'Credential Request', percentage: 18, description: 'Requests password & account details', impact: 'high' }
    ],
    indicators: ['Urgent Language', 'Suspicious URL', 'Credential Request', 'Suspicious Sender'],
    createdAt: '2026-10-06T19:45:00Z',
    status: 'active',
    senderDomain: 'bank-verify-online.xyz',
    attachments: [],
    aiAnalysisSummary: 'High-severity phishing attack disguised as a bank security notification.',
    recommendedAction: 'Block sender immediately, quarantine message, and notify security operation center.'
  },
  {
    id: 'msg-102',
    sender: 'promo-deals@exclusive-rewards-club.top',
    recipient: 'marketing@acme-corp.com',
    subject: 'CONGRATULATIONS! You won a $1,000 Amazon Gift Card!',
    body: 'You have been randomly chosen as today’s lucky winner! Claim your $1,000 Amazon Gift Card now before time runs out.\n\nVisit: http://185.220.101.5/claim-prize\n\nNo purchase necessary. Limited offer!',
    urls: ['http://185.220.101.5/claim-prize'],
    classification: 'spam',
    confidence: 94.2,
    riskScore: 84,
    riskLevel: 'critical',
    reasons: [
      { factor: 'Financial Scam Pattern', percentage: 38, description: 'Offers fake monetary reward', impact: 'high' },
      { factor: 'Direct IP URL', percentage: 32, description: 'Links directly to raw IP address instead of domain', impact: 'high' },
      { factor: 'High Risk Sender TLD (.top)', percentage: 30, description: 'Known bulk spam TLD', impact: 'medium' }
    ],
    indicators: ['Financial Request', 'Suspicious URL', 'Promotional Keywords', 'Suspicious Sender'],
    createdAt: '2026-10-06T18:20:00Z',
    status: 'active',
    senderDomain: 'exclusive-rewards-club.top',
    aiAnalysisSummary: 'Malicious promotional spam aiming to harvest user data.',
    recommendedAction: 'Move to Spam folder and add domain to global blocklist.'
  },
  {
    id: 'msg-103',
    sender: 'hr@acme-corp.com',
    recipient: 'all-employees@acme-corp.com',
    subject: 'Q4 Annual Healthcare Benefits & Open Enrollment Window',
    body: 'Hi Everyone,\n\nOur annual Q4 healthcare open enrollment period begins next Monday, October 12th. Please review the updated benefit options attached to this email or visit our intranet HR portal at https://intranet.acme-corp.com/hr.\n\nBest regards,\nHR Benefits Team',
    urls: ['https://intranet.acme-corp.com/hr'],
    classification: 'legitimate',
    confidence: 98.7,
    riskScore: 8,
    riskLevel: 'low',
    reasons: [
      { factor: 'Internal Corporate Domain', percentage: 70, description: 'Validated SPF/DKIM internal sender', impact: 'low' },
      { factor: 'Clean Content Vocabulary', percentage: 30, description: 'Standard organizational policy announcement', impact: 'low' }
    ],
    indicators: ['Internal Domain', 'Clean Header'],
    createdAt: '2026-10-06T16:10:00Z',
    status: 'safe',
    senderDomain: 'acme-corp.com',
    attachments: [{ name: 'Q4_Benefits_Summary.pdf', size: '2.4 MB', safe: true }],
    aiAnalysisSummary: 'Clean internal email matching company communication patterns.',
    recommendedAction: 'No action required.'
  },
  {
    id: 'msg-104',
    sender: 'billing-update@cloud-services-portal.com',
    recipient: 'finance@acme-corp.com',
    subject: 'Action Required: Updated Invoice #INV-2026-8894',
    body: 'Dear Accounts Payable,\n\nPlease find attached the revised invoice for your monthly cloud infrastructure subscription. Kindly process payment to our updated banking details.\n\nInvoice Amount: $14,850.00 USD\n\nIf you have questions, reply to this thread.',
    urls: [],
    classification: 'suspicious',
    confidence: 83.1,
    riskScore: 68,
    riskLevel: 'high',
    reasons: [
      { factor: 'Changed Payment Details', percentage: 45, description: 'Requests wire transfer to unverified new bank account', impact: 'high' },
      { factor: 'External Financial Claim', percentage: 35, description: 'High value invoice request ($14,850)', impact: 'high' },
      { factor: 'Unverified Vendor Domain', percentage: 20, description: 'Domain registered recently (14 days ago)', impact: 'medium' }
    ],
    indicators: ['Financial Request', 'Urgent Language', 'Unverified Vendor'],
    createdAt: '2026-10-06T14:35:00Z',
    status: 'flagged',
    senderDomain: 'cloud-services-portal.com',
    attachments: [{ name: 'Invoice_8894.pdf', size: '410 KB', safe: true }],
    aiAnalysisSummary: 'Business Email Compromise (BEC) pattern. Invoice redirection attempt detected.',
    recommendedAction: 'Verify invoice details with vendor via telephone before making payment.'
  },
  {
    id: 'msg-105',
    sender: 'newsletter@tech-innovations-daily.com',
    recipient: 'dev-team@acme-corp.com',
    subject: 'Top 10 AI Tools Transforming Cyber Defense in 2026',
    body: 'Welcome to this week’s edition of Tech Innovations Daily! Explore how machine learning models are revolutionizing real-time spam detection, threat intelligence, and zero-day protection.\n\nRead full article: https://tech-innovations-daily.com/articles/ai-cybersecurity-2026\n\nUnsubscribe: https://tech-innovations-daily.com/unsubscribe',
    urls: ['https://tech-innovations-daily.com/articles/ai-cybersecurity-2026', 'https://tech-innovations-daily.com/unsubscribe'],
    classification: 'promotional',
    confidence: 91.5,
    riskScore: 22,
    riskLevel: 'low',
    reasons: [
      { factor: 'Newsletter Structure', percentage: 60, description: 'Contains standard unsubscribe options and editorial content', impact: 'low' },
      { factor: 'Reputable Domain History', percentage: 40, description: 'Clean SPF record and established domain reputation', impact: 'low' }
    ],
    indicators: ['Promotional Keywords', 'Unsubscribe Link'],
    createdAt: '2026-10-06T11:15:00Z',
    status: 'safe',
    senderDomain: 'tech-innovations-daily.com',
    attachments: [],
    aiAnalysisSummary: 'Legitimate technical newsletter digest.',
    recommendedAction: 'Safe to read or apply newsletter filter.'
  },
  {
    id: 'msg-106',
    sender: 'support@account-verification-team.net',
    recipient: 'ceo@acme-corp.com',
    subject: 'CRITICAL NOTICE: Password Expiration Notice for Executive Portal',
    body: 'Attention Executive,\n\nYour corporate single sign-on (SSO) password will expire in 2 hours. Failure to renew will lock you out of Microsoft 365 services.\n\nRenew SSO Password Now:\nhttps://microsoft-365-sso-login-verify.com/renew\n\nIT Support Desk',
    urls: ['https://microsoft-365-sso-login-verify.com/renew'],
    classification: 'phishing',
    confidence: 97.8,
    riskScore: 94,
    riskLevel: 'critical',
    reasons: [
      { factor: 'Executive Targeted Phishing (Spear-Phishing)', percentage: 35, description: 'Targets high-profile executive user', impact: 'high' },
      { factor: 'Spoofed Brand URL', percentage: 32, description: 'Domains mimics Microsoft 365 SSO portal', impact: 'high' },
      { factor: 'Urgent Expiration Threat', percentage: 20, description: 'Imposes 2-hour deadline to bypass critical thinking', impact: 'high' },
      { factor: 'External Unauthorized Sender', percentage: 13, description: 'Sent from external .net domain rather than internal IT', impact: 'high' }
    ],
    indicators: ['Credential Request', 'Urgent Language', 'Suspicious URL', 'Suspicious Sender'],
    createdAt: '2026-10-06T09:05:00Z',
    status: 'blocked',
    senderDomain: 'account-verification-team.net',
    aiAnalysisSummary: 'Spear-phishing credential theft campaign targeting corporate C-suite.',
    recommendedAction: 'Immediate domain block, revoke active sessions, and issue company-wide warning.'
  },
  {
    id: 'msg-107',
    sender: 'deals@super-discount-market.click',
    recipient: 'sales@acme-corp.com',
    subject: '90% OFF Premium Office Equipment - Today Only!',
    body: 'Huge blowout clearance sale! Ergonomic chairs, monitors, and laptops at 90% discount. Limited quantities left!\n\nBuy now: http://super-discount-market.click/shop\n\nFast delivery guaranteed.',
    urls: ['http://super-discount-market.click/shop'],
    classification: 'spam',
    confidence: 92.0,
    riskScore: 79,
    riskLevel: 'critical',
    reasons: [
      { factor: 'High Risk TLD (.click)', percentage: 40, description: 'Domain TLD heavily associated with malicious campaigns', impact: 'high' },
      { factor: 'Unrealistic Discount Offer', percentage: 35, description: '90% off price incentive', impact: 'medium' },
      { factor: 'Aggressive Urgency', percentage: 25, description: 'Today only deadline pressure', impact: 'medium' }
    ],
    indicators: ['Promotional Keywords', 'Suspicious URL', 'Suspicious Sender'],
    createdAt: '2026-10-05T22:30:00Z',
    status: 'active',
    senderDomain: 'super-discount-market.click',
    aiAnalysisSummary: 'High volume commercial spam with counterfeit product lures.',
    recommendedAction: 'Purge from inbox.'
  }
];

export const initialDomains: ThreatDomain[] = [
  { id: 'dom-1', domain: 'bank-verify-online.xyz', threatType: 'Phishing', riskScore: 98, blockedCount: 1420, firstSeen: '2026-09-12', status: 'Blocked' },
  { id: 'dom-2', domain: 'exclusive-rewards-club.top', threatType: 'Malware', riskScore: 94, blockedCount: 890, firstSeen: '2026-09-18', status: 'Blocked' },
  { id: 'dom-3', domain: 'microsoft-365-sso-login-verify.com', threatType: 'Spoofing', riskScore: 99, blockedCount: 2350, firstSeen: '2026-10-01', status: 'Blocked' },
  { id: 'dom-4', domain: 'super-discount-market.click', threatType: 'Botnet', riskScore: 87, blockedCount: 610, firstSeen: '2026-09-28', status: 'Active' },
  { id: 'dom-5', domain: 'account-alert-update.biz', threatType: 'Phishing', riskScore: 91, blockedCount: 1120, firstSeen: '2026-10-03', status: 'Monitored' },
  { id: 'dom-6', domain: 'fast-payroll-verification.online', threatType: 'Spoofing', riskScore: 96, blockedCount: 780, firstSeen: '2026-10-04', status: 'Blocked' }
];

export const initialKeywords: SpamKeyword[] = [
  { id: 'kw-1', keyword: 'verify your account', category: 'Urgency', riskWeight: 9, occurrences: 4520, trend: 'up' },
  { id: 'kw-2', keyword: 'password reset required', category: 'Credential', riskWeight: 10, occurrences: 3890, trend: 'up' },
  { id: 'kw-3', keyword: 'wire transfer urgently', category: 'Financial', riskWeight: 9, occurrences: 2150, trend: 'up' },
  { id: 'kw-4', keyword: 'claim your prize $1000', category: 'Promotional', riskWeight: 7, occurrences: 6420, trend: 'down' },
  { id: 'kw-5', keyword: 'unauthorized login detected', category: 'Security', riskWeight: 8, occurrences: 3100, trend: 'stable' },
  { id: 'kw-6', keyword: 'update payment method', category: 'Financial', riskWeight: 8, occurrences: 2840, trend: 'up' }
];

export const initialPatterns: AttackPattern[] = [
  {
    id: 'pat-1',
    name: 'Executive Spear-Phishing (BEC)',
    vector: 'Display Name Spoofing & Urgent Payroll Change',
    severity: 'critical',
    targetCount: 148,
    description: 'Attackers impersonate company executives or CFOs to trick finance staff into transferring funds to off-shore accounts.',
    mitigation: 'Implement mandatory phone out-of-band confirmation for financial transfers over $5,000.'
  },
  {
    id: 'pat-2',
    name: 'Credential Harvesting Portal',
    vector: 'Spoofed SSO OAuth Page & Shortened Link',
    severity: 'critical',
    targetCount: 1240,
    description: 'Fake Microsoft 365 / Google Workspace login pages hosted on bulletproof hosting servers to steal passwords and 2FA tokens.',
    mitigation: 'Enforce FIDO2 WebAuthn hardware security keys and strict domain isolation.'
  },
  {
    id: 'pat-3',
    name: 'Malicious Invoice PDF (QakBot / DarkGate)',
    vector: 'Weaponized PDF Attachment with Embedded JS',
    severity: 'high',
    targetCount: 630,
    description: 'PDF invoices contain links to password-protected ZIP archives containing malware droppers.',
    mitigation: 'Block incoming ZIP attachments with password protection at the email gateway level.'
  }
];

export const initialForecast: ForecastPoint[] = [
  { date: 'Sep 29', historical: 1980 },
  { date: 'Sep 30', historical: 2150 },
  { date: 'Oct 01', historical: 2040 },
  { date: 'Oct 02', historical: 2280 },
  { date: 'Oct 03', historical: 2410 },
  { date: 'Oct 04', historical: 2300 },
  { date: 'Oct 05', historical: 2340 },
  { date: 'Oct 06 (Today)', historical: 2510, predicted: 2510, lowerBound: 2450, upperBound: 2570 },
  { date: 'Oct 07', predicted: 2680, lowerBound: 2550, upperBound: 2810 },
  { date: 'Oct 08', predicted: 2790, lowerBound: 2620, upperBound: 2960 },
  { date: 'Oct 09', predicted: 2950, lowerBound: 2780, upperBound: 3120 },
  { date: 'Oct 10', predicted: 3040, lowerBound: 2840, upperBound: 3240 },
  { date: 'Oct 11', predicted: 3120, lowerBound: 2910, upperBound: 3330 },
  { date: 'Oct 12', predicted: 3180, lowerBound: 2950, upperBound: 3410 }
];

export const demoModelMetrics: ModelMetrics = {
  accuracy: 96.8,
  precision: 95.4,
  recall: 94.9,
  f1Score: 95.1,
  rocAuc: 97.2,
  confusionMatrix: {
    truePositive: 32840,
    falsePositive: 1580,
    trueNegative: 91420,
    falseNegative: 1760
  },
  lastTrained: '2026-10-01 (v2.4-HybridTransformer)',
  sampleCount: 128540
};
