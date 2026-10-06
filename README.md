# MailShield AI – Spam Email Intelligence & Prediction Platform

> **Detect. Predict. Protect.**  
> *AI-powered email intelligence for safer digital communication.*

MailShield AI is a full-stack cybersecurity, machine learning, and business intelligence web application designed to detect spam and phishing threats, score risk levels, explain AI decisions, forecast future spam trends, and compute corporate ROI metrics.

---

## 🌟 Key Features

- 🛡️ **AI Spam & Phishing Analyzer**:
  - Classifies emails into **Legitimate**, **Spam**, **Phishing**, **Promotional**, or **Suspicious**.
  - Calculates dynamic **Risk Score (0–100)** and risk levels (`Low`, `Medium`, `High`, `Critical`).
  - Provides **Confidence Rating (%)**.

- 🔍 **Explainable AI (XAI)**:
  - Visual breakdown showing percentage contribution of risk factors (e.g. suspicious links 35%, urgent language 25%, unknown domain 22%).
  - Highlights specific cyber threat indicators.

- 📈 **7-Day Predictive Threat Forecasting**:
  - Predicts future daily spam volume spikes with upper and lower confidence intervals.
  - Generates automated AI threat insights (e.g., credential surge warnings, phishing lures).

- 💼 **Business Intelligence & ROI Calculator**:
  - Calculates employee productivity hours saved and annual financial savings.
  - Formula: `Time Saved = Spam Blocked × Review Time` | `Savings = Time Saved × Hourly Rate`.

- 🛡️ **Threat Intelligence Hub**:
  - Domain blocklist management, top high-risk spam keywords, and vector attack pattern matrices.

- 📋 **Executive Security Reports**:
  - Printable compliance audit report generator with CSV data export.

- ⚙️ **Demo Mode / Live API Toggle**:
  - Client-side Demo NLP Engine for instant offline evaluation.
  - Seamless toggle to connect a live Python/FastAPI ML backend endpoint (`POST /api/predict`).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Recharts
- **Architecture**: Client-side Demo NLP Heuristic Engine with REST API integration readiness for Python/FastAPI + scikit-learn/Transformers

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/bharani6381/Spam-Detector.git
cd Spam-Detector
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📑 Application Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Enterprise overview, hero showcase, and feature highlights |
| `/dashboard` | Dashboard | KPI metrics, real-time threat charts, recent scan feed |
| `/spam-detector` | Spam Detector | Interactive email analysis workbench with sample presets |
| `/history` | Email History | Searchable, filterable table with CSV export |
| `/email-detail` | Email Details | Inspection view with sanitized body and security action buttons |
| `/threat-intel` | Threat Intel | High-risk domains, malicious keywords, attack patterns |
| `/analytics` | Analytics | Recharts charts across customizable timeframes (`7d`, `30d`, `90d`) |
| `/predictions` | Predictions | 7-day predictive forecasting & AI insights |
| `/bi` | Business Intelligence | Productivity ROI calculator |
| `/reports` | Reports | Executive printable threat reports |
| `/settings` | Settings | Sensitivity controls, API endpoint config, ML metrics |
| `/about` | About Project | ML pipeline architecture diagram & specs |

---

## 🔒 License

MIT License
