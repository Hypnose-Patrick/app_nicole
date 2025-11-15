// LingoQuest - Module Data
// Contains all learning modules, lessons, and exercises

const MODULES_DATA = [
  {
    id: 'boardroom-essentials',
    title: 'Boardroom Essentials',
    icon: '👔',
    description: 'Master essential vocabulary and phrases for board meetings',
    level: 'Beginner',
    lessons: [
      {
        id: 'board-meeting-vocab',
        title: 'Board Meeting Vocabulary',
        description: 'Key terms used in boardroom discussions',
        duration: '20 min',
        xpReward: 100,
        exercises: [
          {
            id: 'present-q4-results',
            type: 'vocal',
            title: 'Present Q4 Results',
            scenario: 'You are the CFO presenting Q4 results to the board. Present these key metrics with confidence:\n\n• Revenue: €450M (+8% YoY)\n• EBITDA: €87M (+12% YoY)\n• Net Income: €34M (+15% YoY)\n• ROE: 14.2% (target: 12%)\n\nHighlight achievements and strategic direction.',
            targetWPM: 130,
            targetDuration: 45,
            keywords: ['revenue', 'EBITDA', 'growth', 'year-over-year', 'return on equity'],
            xpReward: 50
          },
          {
            id: 'strategic-proposal',
            type: 'vocal',
            title: 'Strategic Proposal',
            scenario: 'Propose a strategic initiative to the board:\n\n• Expansion into digital banking services\n• Investment required: €15M over 2 years\n• Expected ROI: 18% by year 3\n• Market opportunity: €200M addressable market\n\nConvince the board of the strategic value.',
            targetWPM: 125,
            targetDuration: 60,
            keywords: ['digital transformation', 'investment', 'return on investment', 'market opportunity', 'strategic value'],
            xpReward: 50
          }
        ]
      },
      {
        id: 'meeting-procedures',
        title: 'Meeting Procedures & Etiquette',
        description: 'Navigate board meetings professionally',
        duration: '15 min',
        xpReward: 80,
        exercises: [
          {
            id: 'open-discussion',
            type: 'vocal',
            title: 'Opening Discussion Points',
            scenario: 'As chairman, you need to:\n\n1. Welcome board members\n2. Review the agenda\n3. Address any urgent matters\n4. Set the tone for constructive dialogue\n\nSpeak with authority and warmth.',
            targetWPM: 120,
            targetDuration: 50,
            keywords: ['agenda', 'matters arising', 'constructive', 'governance', 'quorum'],
            xpReward: 40
          },
          {
            id: 'motion-voting',
            type: 'vocal',
            title: 'Motion and Voting',
            scenario: 'Present and second a motion:\n\n"I move that the board approves the acquisition of FinTech Solutions Ltd for €25M, subject to due diligence completion."\n\nExplain rationale and call for discussion.',
            targetWPM: 115,
            targetDuration: 40,
            keywords: ['motion', 'second', 'due diligence', 'vote', 'resolution'],
            xpReward: 40
          }
        ]
      }
    ]
  },
  {
    id: 'boardroom-simulation',
    title: 'Boardroom Simulation',
    icon: '🎭',
    description: 'Realistic board meeting scenarios',
    level: 'Intermediate',
    lessons: [
      {
        id: 'crisis-management',
        title: 'Crisis Management Communication',
        description: 'Handle challenging situations with poise',
        duration: '25 min',
        xpReward: 120,
        exercises: [
          {
            id: 'liquidity-crisis',
            type: 'vocal',
            title: 'Address Liquidity Concerns',
            scenario: 'Emergency board meeting - liquidity ratio dropped to 105% (minimum: 100%):\n\n• Explain the situation clearly\n• Present immediate actions taken\n• Outline 30-day recovery plan\n• Reassure board while being transparent\n\nMaintain calm and confidence.',
            targetWPM: 120,
            targetDuration: 75,
            keywords: ['liquidity', 'immediate action', 'mitigation', 'recovery plan', 'stress test'],
            xpReward: 60
          },
          {
            id: 'cyber-incident',
            type: 'vocal',
            title: 'Cybersecurity Incident Report',
            scenario: 'Report on recent cybersecurity incident:\n\n• Attempted breach detected and contained\n• No customer data compromised\n• Systems restored within 4 hours\n• Enhanced monitoring implemented\n\nProvide technical clarity with business impact assessment.',
            targetWPM: 125,
            targetDuration: 60,
            keywords: ['cybersecurity', 'breach', 'containment', 'incident response', 'operational resilience'],
            xpReward: 60
          }
        ]
      },
      {
        id: 'stakeholder-engagement',
        title: 'Stakeholder Engagement',
        description: 'Communicate with different stakeholders',
        duration: '20 min',
        xpReward: 100,
        exercises: [
          {
            id: 'shareholder-update',
            type: 'vocal',
            title: 'Shareholder Update',
            scenario: 'Annual shareholder address:\n\n• Year in review: Strong performance\n• Dividend increase: 5%\n• Strategic direction for next year\n• Commitment to sustainability\n\nBalance optimism with realism.',
            targetWPM: 130,
            targetDuration: 70,
            keywords: ['shareholder value', 'dividend', 'sustainability', 'governance', 'long-term growth'],
            xpReward: 50
          },
          {
            id: 'regulator-dialogue',
            type: 'vocal',
            title: 'Regulatory Dialogue',
            scenario: 'Meeting with central bank supervisor:\n\n• Discuss capital adequacy improvements\n• Address concerns about market risk\n• Present enhanced risk framework\n• Demonstrate commitment to compliance\n\nBe respectful, precise, and cooperative.',
            targetWPM: 115,
            targetDuration: 65,
            keywords: ['regulatory compliance', 'capital adequacy', 'supervision', 'risk framework', 'transparency'],
            xpReward: 50
          }
        ]
      }
    ]
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    icon: '⚖️',
    description: 'Communicate risks effectively to stakeholders',
    level: 'Intermediate',
    lessons: [
      {
        id: 'risk-assessment',
        title: 'Risk Assessment Presentation',
        description: 'Present comprehensive risk analysis',
        duration: '30 min',
        xpReward: 150,
        exercises: [
          {
            id: 'credit-risk-analysis',
            type: 'vocal',
            title: 'Credit Risk Portfolio Review',
            scenario: 'Quarterly credit risk review:\n\n• NPL ratio: 2.1% (down from 2.4%)\n• Coverage ratio: 68%\n• Concentration risk: Top 10 exposures = 35% of portfolio\n• Sector analysis: Real estate exposure concerns\n\nProvide strategic recommendations.',
            targetWPM: 120,
            targetDuration: 80,
            keywords: ['non-performing loans', 'coverage ratio', 'concentration risk', 'credit quality', 'provisioning'],
            xpReward: 75
          },
          {
            id: 'market-risk-report',
            type: 'vocal',
            title: 'Market Risk Report',
            scenario: 'Present market risk metrics:\n\n• VaR (99%, 1-day): €12.5M\n• Interest rate risk: Asset-liability mismatch\n• FX exposure: €45M net long USD\n• Stress test results: Resilient under severe scenarios\n\nExplain hedging strategies.',
            targetWPM: 115,
            targetDuration: 70,
            keywords: ['value at risk', 'stress testing', 'hedging', 'interest rate risk', 'foreign exchange'],
            xpReward: 75
          }
        ]
      },
      {
        id: 'operational-risk',
        title: 'Operational Risk Management',
        description: 'Articulate operational risk framework',
        duration: '25 min',
        xpReward: 130,
        exercises: [
          {
            id: 'risk-control-self-assessment',
            type: 'vocal',
            title: 'RCSA Findings Presentation',
            scenario: 'Present Risk Control Self-Assessment results:\n\n• 127 controls tested\n• 8 control weaknesses identified\n• 3 critical issues requiring immediate attention\n• Action plans assigned with ownership\n\nDemonstrate robust governance.',
            targetWPM: 120,
            targetDuration: 65,
            keywords: ['control environment', 'control weakness', 'remediation', 'risk appetite', 'governance'],
            xpReward: 65
          },
          {
            id: 'kri-dashboard',
            type: 'vocal',
            title: 'Key Risk Indicators Review',
            scenario: 'Monthly KRI dashboard review:\n\n• Transaction processing errors: Within tolerance\n• Customer complaints: Slight increase\n• Staff turnover: Above threshold in IT department\n• Regulatory breaches: Zero this quarter\n\nProvide context and forward-looking insights.',
            targetWPM: 125,
            targetDuration: 60,
            keywords: ['key risk indicators', 'tolerance levels', 'early warning', 'trending', 'root cause'],
            xpReward: 65
          }
        ]
      },
      {
        id: 'enterprise-risk',
        title: 'Enterprise Risk Management',
        description: 'Holistic risk framework communication',
        duration: '25 min',
        xpReward: 130,
        exercises: [
          {
            id: 'risk-appetite-statement',
            type: 'vocal',
            title: 'Risk Appetite Framework',
            scenario: 'Present updated Risk Appetite Statement:\n\n• Zero tolerance for regulatory breaches\n• Moderate appetite for credit risk\n• Low appetite for operational risk\n• Strategic risk appetite aligned with growth\n\nArticulate rationale and metrics.',
            targetWPM: 115,
            targetDuration: 75,
            keywords: ['risk appetite', 'risk tolerance', 'risk capacity', 'risk limits', 'three lines of defense'],
            xpReward: 65
          },
          {
            id: 'emerging-risks',
            type: 'vocal',
            title: 'Emerging Risks Assessment',
            scenario: 'Discuss emerging risks on horizon:\n\n• Climate risk and transition risk\n• Geopolitical tensions impacting trade finance\n• AI and algorithmic bias\n• Crypto asset exposure\n\nRecommend monitoring and mitigation approaches.',
            targetWPM: 120,
            targetDuration: 70,
            keywords: ['emerging risks', 'climate risk', 'scenario analysis', 'forward-looking', 'strategic response'],
            xpReward: 65
          }
        ]
      }
    ]
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting',
    icon: '📊',
    description: 'Present financial results with clarity',
    level: 'Advanced',
    lessons: [
      {
        id: 'quarterly-results',
        title: 'Quarterly Results Presentation',
        description: 'Deliver comprehensive financial updates',
        duration: '30 min',
        xpReward: 160,
        exercises: [
          {
            id: 'earnings-presentation',
            type: 'vocal',
            title: 'Earnings Call Preparation',
            scenario: 'Prepare earnings call opening statement:\n\n• Net interest margin: 2.45% (stable)\n• Cost-to-income ratio: 58% (improving)\n• CET1 ratio: 14.2% (well above minimum)\n• Loan growth: 6% YoY\n\nAddress analyst expectations proactively.',
            targetWPM: 130,
            targetDuration: 80,
            keywords: ['net interest margin', 'cost efficiency', 'capital ratio', 'earnings per share', 'guidance'],
            xpReward: 80
          },
          {
            id: 'variance-analysis',
            type: 'vocal',
            title: 'Budget Variance Explanation',
            scenario: 'Explain significant variances from budget:\n\n• Operating expenses 8% over budget (tech investments)\n• Credit losses 15% below budget (improved economy)\n• Fee income 12% above budget (wealth management)\n\nProvide context and corrective actions where needed.',
            targetWPM: 120,
            targetDuration: 70,
            keywords: ['variance analysis', 'budget', 'forecast accuracy', 'adjustments', 'performance drivers'],
            xpReward: 80
          }
        ]
      },
      {
        id: 'ifrs-reporting',
        title: 'IFRS 9 and Complex Accounting',
        description: 'Explain complex accounting treatments',
        duration: '25 min',
        xpReward: 140,
        exercises: [
          {
            id: 'ifrs9-ecl',
            type: 'vocal',
            title: 'ECL Model Explanation',
            scenario: 'Explain Expected Credit Loss model to board:\n\n• IFRS 9 methodology overview\n• Significant Increase in Credit Risk (SICR) criteria\n• Staging of loans (Stage 1, 2, 3)\n• Model assumptions and sensitivities\n\nMake complex concepts accessible.',
            targetWPM: 110,
            targetDuration: 75,
            keywords: ['expected credit loss', 'IFRS 9', 'staging', 'probability of default', 'loss given default'],
            xpReward: 70
          },
          {
            id: 'fair-value-measurement',
            type: 'vocal',
            title: 'Fair Value Hierarchy',
            scenario: 'Discuss fair value measurements:\n\n• Level 1: €2.5B (quoted prices)\n• Level 2: €800M (observable inputs)\n• Level 3: €150M (unobservable inputs)\n\nAddress valuation challenges and governance.',
            targetWPM: 115,
            targetDuration: 65,
            keywords: ['fair value', 'valuation hierarchy', 'mark-to-market', 'valuation adjustments', 'impairment'],
            xpReward: 70
          }
        ]
      }
    ]
  },
  {
    id: 'regulatory-compliance',
    title: 'Regulatory Compliance',
    icon: '📋',
    description: 'Basel III and compliance terminology',
    level: 'Advanced',
    lessons: [
      {
        id: 'basel-framework',
        title: 'Basel III Framework',
        description: 'Navigate Basel regulatory requirements',
        duration: '35 min',
        xpReward: 180,
        exercises: [
          {
            id: 'capital-adequacy',
            type: 'vocal',
            title: 'Capital Adequacy Presentation',
            scenario: 'Present capital position to board:\n\n• CET1 ratio: 14.2% (minimum: 4.5%)\n• Tier 1 ratio: 15.8% (minimum: 6%)\n• Total capital ratio: 18.5% (minimum: 8%)\n• Capital buffers: All maintained\n\nDiscuss capital planning and distribution policy.',
            targetWPM: 115,
            targetDuration: 75,
            keywords: ['Common Equity Tier 1', 'risk-weighted assets', 'capital buffer', 'leverage ratio', 'SREP'],
            xpReward: 90
          },
          {
            id: 'liquidity-coverage',
            type: 'vocal',
            title: 'LCR and NSFR Review',
            scenario: 'Quarterly liquidity metrics review:\n\n• LCR: 145% (minimum: 100%)\n• NSFR: 112% (minimum: 100%)\n• HQLA portfolio composition\n• Funding concentration analysis\n\nExplain liquidity management strategy.',
            targetWPM: 120,
            targetDuration: 70,
            keywords: ['liquidity coverage ratio', 'net stable funding ratio', 'high quality liquid assets', 'funding gap', 'liquidity stress'],
            xpReward: 90
          }
        ]
      },
      {
        id: 'aml-compliance',
        title: 'AML and Financial Crime',
        description: 'Anti-money laundering framework',
        duration: '25 min',
        xpReward: 140,
        exercises: [
          {
            id: 'aml-program-update',
            type: 'vocal',
            title: 'AML Program Assessment',
            scenario: 'Annual AML program review:\n\n• Transaction monitoring: 2.5M transactions screened\n• Suspicious Activity Reports: 48 filed\n• Customer due diligence: Enhanced for high-risk\n• Training: 100% staff completion\n\nDemonstrate robust compliance culture.',
            targetWPM: 120,
            targetDuration: 70,
            keywords: ['anti-money laundering', 'know your customer', 'suspicious activity', 'transaction monitoring', 'financial crime'],
            xpReward: 70
          },
          {
            id: 'sanctions-screening',
            type: 'vocal',
            title: 'Sanctions Compliance',
            scenario: 'Sanctions compliance update:\n\n• Real-time screening of all transactions\n• Sanctions lists: OFAC, EU, UN updated daily\n• Recent geopolitical changes addressed\n• Zero breaches this period\n\nAddress enhanced due diligence for cross-border.',
            targetWPM: 115,
            targetDuration: 65,
            keywords: ['sanctions screening', 'OFAC', 'politically exposed persons', 'correspondent banking', 'de-risking'],
            xpReward: 70
          }
        ]
      },
      {
        id: 'mifid-gdpr',
        title: 'MiFID II and Data Protection',
        description: 'Investment services and privacy regulations',
        duration: '20 min',
        xpReward: 120,
        exercises: [
          {
            id: 'mifid-compliance',
            type: 'vocal',
            title: 'MiFID II Best Execution',
            scenario: 'Investment services compliance review:\n\n• Best execution policy implementation\n• Product governance framework\n• Client categorization and suitability\n• Transaction reporting accuracy\n\nHighlight enhancements and challenges.',
            targetWPM: 115,
            targetDuration: 70,
            keywords: ['MiFID II', 'best execution', 'product governance', 'suitability', 'client protection'],
            xpReward: 60
          },
          {
            id: 'gdpr-privacy',
            type: 'vocal',
            title: 'Data Protection Framework',
            scenario: 'GDPR compliance status:\n\n• Data mapping completed\n• Privacy by design embedded\n• Data subject requests: Avg 3-day response\n• Third-party vendor assessments ongoing\n\nAddress cross-border data transfer mechanisms.',
            targetWPM: 120,
            targetDuration: 60,
            keywords: ['GDPR', 'data privacy', 'data subject rights', 'data protection officer', 'privacy impact assessment'],
            xpReward: 60
          }
        ]
      }
    ]
  },
  {
    id: 'macroeconomic-indicators',
    title: 'Macroeconomic Indicators',
    icon: '🌍',
    description: 'Discuss economic trends and their banking impact',
    level: 'Expert',
    lessons: [
      {
        id: 'monetary-policy',
        title: 'Monetary Policy Analysis',
        description: 'Central bank policy and banking implications',
        duration: '30 min',
        xpReward: 170,
        exercises: [
          {
            id: 'interest-rate-environment',
            type: 'vocal',
            title: 'Interest Rate Outlook',
            scenario: 'Present interest rate outlook to board:\n\n• ECB policy rate: Currently 4.0%\n• Market expects 3 cuts in next 12 months\n• Impact on net interest margin\n• Asset-liability management implications\n\nProvide strategic positioning recommendations.',
            targetWPM: 120,
            targetDuration: 75,
            keywords: ['monetary policy', 'interest rate risk', 'yield curve', 'central bank', 'monetary transmission'],
            xpReward: 85
          },
          {
            id: 'inflation-impact',
            type: 'vocal',
            title: 'Inflation and Banking',
            scenario: 'Analyze inflation impact on banking operations:\n\n• Current inflation: 3.2% (trending down)\n• Real interest rates turning positive\n• Cost inflation: Salary pressure\n• Credit demand patterns shifting\n\nDiscuss strategic adjustments.',
            targetWPM: 115,
            targetDuration: 70,
            keywords: ['inflation', 'real rates', 'purchasing power', 'cost pressures', 'pricing power'],
            xpReward: 85
          }
        ]
      },
      {
        id: 'economic-cycles',
        title: 'Economic Cycles and Banking',
        description: 'Navigate through economic cycles',
        duration: '30 min',
        xpReward: 170,
        exercises: [
          {
            id: 'recession-preparedness',
            type: 'vocal',
            title: 'Recession Scenario Planning',
            scenario: 'Discuss recession preparedness:\n\n• Leading indicators showing weakness\n• Credit portfolio stress testing\n• Provisioning adequacy assessment\n• Liquidity buffer enhancement\n\nBalance prudence with business opportunities.',
            targetWPM: 115,
            targetDuration: 80,
            keywords: ['recession', 'economic cycle', 'countercyclical', 'credit cycle', 'loss forecasting'],
            xpReward: 85
          },
          {
            id: 'growth-strategy',
            type: 'vocal',
            title: 'Growth Phase Strategy',
            scenario: 'Present strategy for economic expansion:\n\n• GDP growth accelerating to 2.5%\n• Credit demand rising across sectors\n• Risk appetite calibration\n• Market share opportunities\n\nBalance growth with prudent risk management.',
            targetWPM: 120,
            targetDuration: 75,
            keywords: ['economic expansion', 'credit growth', 'market opportunity', 'risk-adjusted returns', 'strategic positioning'],
            xpReward: 85
          }
        ]
      },
      {
        id: 'global-trends',
        title: 'Global Economic Trends',
        description: 'International economics and banking',
        duration: '25 min',
        xpReward: 150,
        exercises: [
          {
            id: 'geopolitical-risks',
            type: 'vocal',
            title: 'Geopolitical Risk Assessment',
            scenario: 'Address geopolitical risks:\n\n• Trade tensions impact on corporate clients\n• Emerging markets exposure review\n• Supply chain disruptions\n• Currency volatility implications\n\nProvide risk mitigation strategies.',
            targetWPM: 115,
            targetDuration: 75,
            keywords: ['geopolitical risk', 'emerging markets', 'trade policy', 'currency risk', 'country risk'],
            xpReward: 75
          },
          {
            id: 'sustainable-finance',
            type: 'vocal',
            title: 'ESG and Sustainable Finance',
            scenario: 'Present ESG strategy to board:\n\n• Green lending portfolio: €500M target\n• Climate risk integration into credit\n• ESG ratings and reporting\n• Sustainable finance opportunities\n\nAlign financial performance with sustainability.',
            targetWPM: 120,
            targetDuration: 70,
            keywords: ['ESG', 'sustainable finance', 'climate risk', 'green bonds', 'impact investing'],
            xpReward: 75
          }
        ]
      }
    ]
  },
  {
    id: 'conversation-practice',
    title: 'Conversation Practice',
    icon: '💬',
    description: 'Practice everyday business conversations with AI chatbot',
    level: 'All Levels',
    lessons: [
      {
        id: 'chatbot-intro',
        title: 'AI Conversation Partner',
        description: 'Free-form conversation practice with intelligent responses',
        duration: 'Flexible',
        xpReward: 200,
        exercises: [
          {
            id: 'chatbot-practice',
            type: 'chatbot',
            title: 'Conversational Practice',
            scenario: 'Practice natural business conversations:\n\n• Network at banking conferences\n• Discuss market trends with colleagues\n• Explain banking concepts to non-specialists\n• Casual professional dialogue\n\nThe AI will respond naturally to keep the conversation flowing.',
            targetWPM: 120,
            targetDuration: 0,
            keywords: ['conversation', 'dialogue', 'networking', 'discussion', 'communication'],
            xpReward: 100
          }
        ]
      }
    ]
  }
];

// Level progression system
function getXPForNextLevel(currentLevel) {
  return currentLevel * 100;
}

function getLevelProgress(totalXP, currentLevel) {
  const xpInCurrentLevel = totalXP - ((currentLevel - 1) * (currentLevel - 1) * 50);
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  return Math.min(100, Math.round((xpInCurrentLevel / xpForNextLevel) * 100));
}

function calculateLevel(totalXP) {
  let level = 1;
  let xpNeeded = 0;
  while (totalXP >= xpNeeded) {
    level++;
    xpNeeded += getXPForNextLevel(level - 1);
  }
  return level - 1;
}
