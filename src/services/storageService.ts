import { initialDomains, initialEmails, initialKeywords } from '../data/mockData';
import type { BIInputs, BIResults, EmailRecord, SpamKeyword, ThreatDomain } from '../types';

const EMAILS_KEY = 'mailshield_emails';
const DOMAINS_KEY = 'mailshield_domains';
const KEYWORDS_KEY = 'mailshield_keywords';

export function getStoredEmails(): EmailRecord[] {
  const data = localStorage.getItem(EMAILS_KEY);
  if (!data) {
    localStorage.setItem(EMAILS_KEY, JSON.stringify(initialEmails));
    return initialEmails;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialEmails;
  }
}

export function saveEmailRecord(email: EmailRecord): EmailRecord[] {
  const current = getStoredEmails();
  const updated = [email, ...current];
  localStorage.setItem(EMAILS_KEY, JSON.stringify(updated));
  return updated;
}

export function updateEmailStatus(id: string, status: EmailRecord['status']): EmailRecord[] {
  const current = getStoredEmails();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(EMAILS_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteEmailRecord(id: string): EmailRecord[] {
  const current = getStoredEmails();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(EMAILS_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredDomains(): ThreatDomain[] {
  const data = localStorage.getItem(DOMAINS_KEY);
  if (!data) {
    localStorage.setItem(DOMAINS_KEY, JSON.stringify(initialDomains));
    return initialDomains;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialDomains;
  }
}

export function addThreatDomain(domain: Omit<ThreatDomain, 'id'>): ThreatDomain[] {
  const current = getStoredDomains();
  const newDomain: ThreatDomain = {
    ...domain,
    id: `dom-${Date.now()}`
  };
  const updated = [newDomain, ...current];
  localStorage.setItem(DOMAINS_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredKeywords(): SpamKeyword[] {
  const data = localStorage.getItem(KEYWORDS_KEY);
  if (!data) {
    localStorage.setItem(KEYWORDS_KEY, JSON.stringify(initialKeywords));
    return initialKeywords;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialKeywords;
  }
}

export function calculateBIMetrics(inputs: BIInputs): BIResults {
  const dailyTotalPerEmployee = inputs.emailsPerEmployeePerDay;
  const totalEmailsDaily = inputs.employees * dailyTotalPerEmployee;
  const totalSpamDaily = totalEmailsDaily * (inputs.spamPercentage / 100);
  
  const totalEmailsMonthly = totalEmailsDaily * 22; // 22 working days
  const totalSpamMonthly = totalSpamDaily * 22;

  // Time saved in hours = (Spam count * review time in sec) / 3600
  const hoursSavedMonthly = (totalSpamMonthly * inputs.reviewTimeSeconds) / 3600;
  const productivitySavingsMonthly = hoursSavedMonthly * inputs.hourlyCost;

  const hoursSavedAnnual = hoursSavedMonthly * 12;
  const annualSavings = productivitySavingsMonthly * 12;

  // Threats prevented estimation (assume ~12% of spam is malicious/phishing)
  const threatsPreventedCount = Math.round(totalSpamMonthly * 0.12);

  return {
    totalEmailsMonthly: Math.round(totalEmailsMonthly),
    totalSpamMonthly: Math.round(totalSpamMonthly),
    hoursSavedMonthly: Number(hoursSavedMonthly.toFixed(1)),
    productivitySavingsMonthly: Number(productivitySavingsMonthly.toFixed(2)),
    annualSavings: Number(annualSavings.toFixed(2)),
    hoursSavedAnnual: Number(hoursSavedAnnual.toFixed(1)),
    threatsPreventedCount
  };
}
