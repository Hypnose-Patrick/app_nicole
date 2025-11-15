// LingoQuest - Module Data
// Contains all learning modules, lessons, and exercises
// Professional English for Banking Executives

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
        duration: '15 min',
        xpReward: 50,
        exercises: [
          {
            id: 'present-q4-results',
            type: 'vocal',
            title: 'Present Q4 Results',
            scenario: 'You are the CFO presenting Q4 results to the board. Present these key metrics with confidence:\n\n• Revenue: €450M (+8% YoY)\n• EBITDA: €87M (+12% YoY)\n• Net Income: €34M (+15% YoY)\n• ROE: 14.2% (target: 12%)\n\nHighlight achievements and strategic direction.',
            targetWPM: 130,
            targetDuration: 45,
            keywords: ['revenue', 'EBITDA', 'growth', 'year-over-year', 'return on equity'],
            xpReward: 38
          },
          {
            id: 'introduce-agenda',
            type: 'vocal',
            title: 'Board Meeting Opening',
            scenario: 'You are the Chairman opening a board meeting. Introduce the agenda:\n\n1. Approval of previous minutes\n2. CEO strategic update\n3. Q4 financial review\n4. Digital transformation initiative\n5. Risk committee report\n6. Any other business\n\nWelcome the board members professionally.',
            targetWPM: 125,
            targetDuration: 40,
            keywords: ['agenda', 'minutes', 'strategic', 'review', 'committee'],
            xpReward: 35
          },
          {
            id: 'shareholder-value',
            type: 'vocal',
            title: 'Discussing Shareholder Value',
            scenario: 'Explain how the bank\'s new digital strategy creates shareholder value:\n\n• Cost-to-income ratio improvement\n• Customer acquisition cost reduction\n• Enhanced customer lifetime value\n• Market share expansion\n• Competitive positioning\n\nBe persuasive and data-driven.',
            targetWPM: 135,
            targetDuration: 50,
            keywords: ['shareholder value', 'cost-to-income', 'customer acquisition', 'market share', 'competitive'],
            xpReward: 42
          }
        ]
      },
      {
        id: 'meeting-protocols',
        title: 'Meeting Protocols & Etiquette',
        description: 'Professional communication in formal settings',
        duration: '20 min',
        xpReward: 60,
        exercises: [
          {
            id: 'motion-voting',
            type: 'vocal',
            title: 'Propose and Vote on Motions',
            scenario: 'You need to propose a motion for board approval:\n\n"I move that the board approves the acquisition of FinTech Solutions Ltd for €120M, subject to due diligence and regulatory approval. The strategic rationale includes expanding our digital capabilities and customer base."\n\nThen call for a vote.',
            targetWPM: 120,
            targetDuration: 35,
            keywords: ['motion', 'approve', 'acquisition', 'due diligence', 'regulatory'],
            xpReward: 40
          },
          {
            id: 'request-clarification',
            type: 'vocal',
            title: 'Request Clarification',
            scenario: 'During a complex presentation on Basel III capital requirements, politely request clarification:\n\n"Could you please elaborate on the impact of the capital conservation buffer on our lending capacity? I\'d also appreciate clarification on the timeline for full implementation."\n\nBe respectful but assertive.',
            targetWPM: 130,
            targetDuration: 30,
            keywords: ['clarification', 'elaborate', 'impact', 'appreciate', 'timeline'],
            xpReward: 38
          },
          {
            id: 'summary-action-items',
            type: 'vocal',
            title: 'Summarize Action Items',
            scenario: 'Conclude the meeting by summarizing action items:\n\n1. CFO to prepare detailed M&A analysis by next meeting\n2. CRO to update risk appetite framework by Q2\n3. CEO to schedule strategy workshop with executive team\n4. Company Secretary to circulate amended governance charter\n\nConfirm responsibilities and deadlines.',
            targetWPM: 125,
            targetDuration: 40,
            keywords: ['action items', 'prepare', 'update', 'schedule', 'deadlines'],
            xpReward: 36
          }
        ]
      },
      {
        id: 'executive-presence',
        title: 'Executive Presence & Confidence',
        description: 'Project authority and credibility in high-stakes situations',
        duration: '18 min',
        xpReward: 55,
        exercises: [
          {
            id: 'address-concerns',
            type: 'vocal',
            title: 'Address Board Concerns',
            scenario: 'The board is concerned about rising non-performing loans. Address their concerns confidently:\n\n"I understand the board\'s concerns regarding our NPL ratio. We\'ve implemented a comprehensive remediation plan including enhanced credit monitoring, proactive restructuring, and strengthened collection processes. Early indicators show a 15% improvement quarter-over-quarter."\n\nProject confidence and competence.',
            targetWPM: 135,
            targetDuration: 45,
            keywords: ['concerns', 'non-performing loans', 'remediation', 'monitoring', 'improvement'],
            xpReward: 40
          },
          {
            id: 'defend-strategy',
            type: 'vocal',
            title: 'Defend Strategic Decision',
            scenario: 'Defend the decision to invest €50M in AI and machine learning:\n\n"This investment positions us at the forefront of banking innovation. AI will enhance our fraud detection, personalize customer experiences, optimize risk pricing, and reduce operational costs by 20% within three years. Our competitors are moving aggressively in this space."\n\nBe convincing and forward-thinking.',
            targetWPM: 140,
            targetDuration: 40,
            keywords: ['investment', 'innovation', 'fraud detection', 'optimize', 'competitive advantage'],
            xpReward: 42
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
        title: 'Crisis Communication',
        description: 'Handle crisis situations with poise',
        duration: '25 min',
        xpReward: 70,
        exercises: [
          {
            id: 'cyber-breach',
            type: 'vocal',
            title: 'Report Cybersecurity Breach',
            scenario: 'Report a cybersecurity incident to the board:\n\n"At 3 AM this morning, we detected unauthorized access to our customer database. Our incident response team immediately contained the breach. Approximately 50,000 customer records were exposed. We\'ve notified regulators, engaged forensic experts, and are preparing customer communications. No financial data was compromised."\n\nRemain calm and factual.',
            targetWPM: 135,
            targetDuration: 50,
            keywords: ['cybersecurity', 'breach', 'incident response', 'contained', 'regulators', 'forensic'],
            xpReward: 45
          },
          {
            id: 'regulatory-investigation',
            type: 'vocal',
            title: 'Handle Regulatory Investigation',
            scenario: 'Inform the board about an ongoing regulatory investigation:\n\n"The banking supervisor has initiated an investigation into our AML procedures following suspicious transaction reports. We are fully cooperating with authorities. Our legal team and external counsel are conducting an internal review. We\'re reinforcing our compliance framework to address any identified gaps."\n\nProject transparency and accountability.',
            targetWPM: 130,
            targetDuration: 45,
            keywords: ['regulatory', 'investigation', 'AML', 'compliance', 'cooperating', 'internal review'],
            xpReward: 48
          },
          {
            id: 'market-volatility',
            type: 'vocal',
            title: 'Address Market Volatility Impact',
            scenario: 'Explain how recent market turbulence affects the bank:\n\n"Recent market volatility has impacted our trading book with mark-to-market losses of €12M. However, our hedging strategies limited potential downside. Our liquidity position remains strong with an LCR of 145%. We\'re monitoring the situation closely and stress-testing various scenarios."\n\nDemonstrate risk management expertise.',
            targetWPM: 140,
            targetDuration: 45,
            keywords: ['market volatility', 'mark-to-market', 'hedging', 'liquidity', 'stress-testing'],
            xpReward: 46
          }
        ]
      },
      {
        id: 'strategic-debates',
        title: 'Strategic Debates & Negotiations',
        description: 'Navigate complex strategic discussions',
        duration: '30 min',
        xpReward: 80,
        exercises: [
          {
            id: 'merger-proposition',
            type: 'vocal',
            title: 'Propose Bank Merger',
            scenario: 'Present the case for merging with Regional Bank Partners:\n\n"This merger creates a top-5 European bank with €200B in combined assets. Synergies include €150M annual cost savings, complementary geographic footprints, enhanced digital capabilities, and improved capital efficiency. The combined entity achieves better economies of scale and regulatory capital optimization."\n\nBe strategic and analytical.',
            targetWPM: 145,
            targetDuration: 55,
            keywords: ['merger', 'synergies', 'cost savings', 'economies of scale', 'capital efficiency'],
            xpReward: 50
          },
          {
            id: 'counter-argument',
            type: 'vocal',
            title: 'Present Counter-Argument',
            scenario: 'Respectfully challenge a proposed expansion into cryptocurrency services:\n\n"While I appreciate the innovation perspective, I have concerns about regulatory uncertainty, volatility risks, and reputational implications. Our risk appetite framework may not accommodate crypto exposure. Perhaps we should observe regulatory developments and competitor experiences before committing capital."\n\nBe diplomatic but firm.',
            targetWPM: 135,
            targetDuration: 45,
            keywords: ['concerns', 'regulatory uncertainty', 'risk appetite', 'reputational', 'observe'],
            xpReward: 48
          },
          {
            id: 'compromise-solution',
            type: 'vocal',
            title: 'Propose Compromise Solution',
            scenario: 'The board is divided on branch closure strategy. Propose a middle ground:\n\n"I propose a phased approach: close 20 underperforming branches in Year 1 while investing in flagship locations and digital services. This balances cost reduction with customer accessibility. We\'ll monitor customer migration to digital channels and adjust the plan accordingly."\n\nBridge different viewpoints.',
            targetWPM: 140,
            targetDuration: 45,
            keywords: ['phased approach', 'balances', 'cost reduction', 'monitor', 'adjust'],
            xpReward: 46
          }
        ]
      },
      {
        id: 'stakeholder-management',
        title: 'Stakeholder Management',
        description: 'Communicate effectively with diverse stakeholders',
        duration: '22 min',
        xpReward: 65,
        exercises: [
          {
            id: 'activist-investor',
            type: 'vocal',
            title: 'Respond to Activist Investor',
            scenario: 'An activist investor is demanding a 15% cost reduction. Respond diplomatically:\n\n"We value shareholder input and share the goal of enhancing efficiency. Our current restructuring program targets €80M in savings over two years. We believe aggressive cuts could compromise service quality and long-term competitiveness. We\'re open to discussing specific efficiency opportunities while maintaining strategic investments."\n\nBalance firmness with openness.',
            targetWPM: 140,
            targetDuration: 50,
            keywords: ['shareholder', 'efficiency', 'restructuring', 'service quality', 'strategic investments'],
            xpReward: 47
          },
          {
            id: 'regulator-dialogue',
            type: 'vocal',
            title: 'Communicate with Regulators',
            scenario: 'Report to the board on recent discussions with banking supervisors:\n\n"Our quarterly meeting with the ECB focused on our ICAAP and stress testing results. They acknowledged improvements in our risk management framework but requested additional capital buffer for climate risk. We\'re preparing a comprehensive response demonstrating our climate risk integration."\n\nShow regulatory awareness.',
            targetWPM: 135,
            targetDuration: 48,
            keywords: ['ECB', 'ICAAP', 'stress testing', 'risk management', 'climate risk'],
            xpReward: 45
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
        id: 'credit-risk',
        title: 'Credit Risk Communication',
        description: 'Articulate credit risk exposures and mitigation',
        duration: '20 min',
        xpReward: 65,
        exercises: [
          {
            id: 'portfolio-concentration',
            type: 'vocal',
            title: 'Report Portfolio Concentration',
            scenario: 'Present credit concentration risks to the risk committee:\n\n"Our commercial real estate exposure represents 18% of total loans, exceeding our internal limit of 15%. We\'re implementing corrective measures: halting new CRE originations, actively selling €200M of CRE assets, and tightening underwriting standards. Expected timeline to compliance is 6 months."\n\nBe transparent about risks and solutions.',
            targetWPM: 135,
            targetDuration: 45,
            keywords: ['concentration', 'commercial real estate', 'exposure', 'corrective measures', 'compliance'],
            xpReward: 44
          },
          {
            id: 'provisioning-methodology',
            type: 'vocal',
            title: 'Explain Provisioning Approach',
            scenario: 'Explain the bank\'s IFRS 9 provisioning methodology:\n\n"Under IFRS 9, we use a three-stage expected credit loss model. Stage 1 covers performing loans with 12-month ECL. Stage 2 includes underperforming credits with lifetime ECL. Stage 3 covers defaulted exposures. Our provision coverage ratio stands at 65% of Stage 3 exposures, above peer median."\n\nDemonstrate technical expertise.',
            targetWPM: 130,
            targetDuration: 50,
            keywords: ['IFRS 9', 'expected credit loss', 'provisioning', 'coverage ratio', 'exposures'],
            xpReward: 46
          },
          {
            id: 'early-warning-indicators',
            type: 'vocal',
            title: 'Present Early Warning Signals',
            scenario: 'Report on credit portfolio early warning indicators:\n\n"Several metrics warrant attention: watchlist accounts increased 12% this quarter, primarily in hospitality and retail sectors. Days past due for 30-60 day bucket rose slightly. We\'re proactively engaging borrowers showing stress signals and conducting enhanced monitoring of vulnerable sectors."\n\nShow proactive risk management.',
            targetWPM: 140,
            targetDuration: 45,
            keywords: ['early warning', 'watchlist', 'days past due', 'proactive', 'monitoring'],
            xpReward: 42
          }
        ]
      },
      {
        id: 'operational-risk',
        title: 'Operational Risk Reporting',
        description: 'Communicate operational risk events and controls',
        duration: '18 min',
        xpReward: 60,
        exercises: [
          {
            id: 'risk-event-analysis',
            type: 'vocal',
            title: 'Analyze Risk Event',
            scenario: 'Report a significant operational risk event:\n\n"A processing error in our payment system resulted in duplicate transactions affecting 3,000 customers. Total exposure: €2.4M. Root cause: software bug during system upgrade. Immediate actions: reversed erroneous transactions, compensated customers, fixed the bug. Preventive measures: enhanced testing protocols and dual authorization for system changes."\n\nBe thorough in analysis.',
            targetWPM: 140,
            targetDuration: 50,
            keywords: ['operational risk', 'processing error', 'root cause', 'remediation', 'preventive measures'],
            xpReward: 45
          },
          {
            id: 'control-effectiveness',
            type: 'vocal',
            title: 'Report Control Effectiveness',
            scenario: 'Present the results of control effectiveness testing:\n\n"Our annual control testing program evaluated 250 key controls across all risk categories. Overall effectiveness rate: 94%. Identified 15 control deficiencies, including 3 rated as high priority. Action plans are in place with executive ownership. Expected remediation within 90 days for high-priority items."\n\nShow systematic approach.',
            targetWPM: 135,
            targetDuration: 45,
            keywords: ['control testing', 'effectiveness', 'deficiencies', 'action plans', 'remediation'],
            xpReward: 43
          },
          {
            id: 'business-continuity',
            type: 'vocal',
            title: 'Business Continuity Update',
            scenario: 'Update the board on business continuity preparedness:\n\n"Our BCP testing last quarter simulated a data center failure. Results: critical systems recovered within 2 hours, meeting our RTO targets. Identified improvements include redundant telecommunications and enhanced crisis communication protocols. We\'re investing €5M to strengthen resilience infrastructure."\n\nEmphasize preparedness.',
            targetWPM: 135,
            targetDuration: 48,
            keywords: ['business continuity', 'BCP testing', 'recovery', 'RTO', 'resilience'],
            xpReward: 44
          }
        ]
      },
      {
        id: 'market-liquidity-risk',
        title: 'Market & Liquidity Risk',
        description: 'Explain market dynamics and liquidity positions',
        duration: '22 min',
        xpReward: 70,
        exercises: [
          {
            id: 'var-reporting',
            type: 'vocal',
            title: 'Present VaR Analysis',
            scenario: 'Explain Value-at-Risk metrics to the board:\n\n"Our 1-day 99% VaR stands at €8.5M, within our €12M limit. Primary drivers: interest rate exposure in our banking book and FX positions. Recent market volatility caused two VaR backtesting exceptions, both within acceptable thresholds. We\'re maintaining conservative trading limits given current uncertainty."\n\nBalance technical detail with clarity.',
            targetWPM: 140,
            targetDuration: 48,
            keywords: ['Value-at-Risk', 'VaR', 'exposure', 'backtesting', 'trading limits'],
            xpReward: 46
          },
          {
            id: 'liquidity-metrics',
            type: 'vocal',
            title: 'Report Liquidity Position',
            scenario: 'Present the bank\'s liquidity position:\n\n"Our liquidity metrics remain robust: LCR at 152%, comfortably above the 100% requirement. NSFR stands at 118%. We maintain €15B in HQLA, predominantly sovereign bonds. Our deposit base is 78% retail, providing stable funding. The liquidity stress testing shows resilience even in severe scenarios."\n\nProvide reassurance with data.',
            targetWPM: 135,
            targetDuration: 50,
            keywords: ['liquidity', 'LCR', 'NSFR', 'HQLA', 'stress testing'],
            xpReward: 48
          },
          {
            id: 'interest-rate-sensitivity',
            type: 'vocal',
            title: 'Explain Interest Rate Sensitivity',
            scenario: 'Discuss interest rate risk exposure:\n\n"A 200 basis point parallel rate increase would impact our NII by +€45M annually, reflecting our asset-sensitive position. Our EVE sensitivity shows a potential €120M increase. We\'re partially hedged through interest rate swaps. Given the current rate environment, our positioning balances risk and opportunity."\n\nShow risk appetite alignment.',
            targetWPM: 140,
            targetDuration: 48,
            keywords: ['interest rate risk', 'NII', 'EVE sensitivity', 'hedged', 'risk appetite'],
            xpReward: 47
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
        description: 'Deliver comprehensive quarterly performance updates',
        duration: '25 min',
        xpReward: 75,
        exercises: [
          {
            id: 'income-statement-walkthrough',
            type: 'vocal',
            title: 'Walk Through Income Statement',
            scenario: 'Present Q3 income statement highlights:\n\n"Net interest income reached €345M, up 6% YoY driven by volume growth and improved margins. Fee income grew 8% to €123M. Operating expenses were €310M, flat year-over-year reflecting our cost discipline. Cost-to-income ratio improved to 66.4%. Net profit: €92M, representing 12% growth and ROE of 11.8%."\n\nBe comprehensive yet concise.',
            targetWPM: 145,
            targetDuration: 50,
            keywords: ['net interest income', 'fee income', 'operating expenses', 'cost-to-income', 'ROE'],
            xpReward: 48
          },
          {
            id: 'balance-sheet-analysis',
            type: 'vocal',
            title: 'Analyze Balance Sheet Trends',
            scenario: 'Discuss key balance sheet developments:\n\n"Total assets grew 4% to €28B. Loan book expanded 5%, driven by mortgage growth. Customer deposits increased 6% to €22B, improving our loan-to-deposit ratio to 91%. Our CET1 ratio stands at 14.2%, providing substantial capital cushion above the 10.5% regulatory requirement."\n\nHighlight strengths and stability.',
            targetWPM: 140,
            targetDuration: 45,
            keywords: ['balance sheet', 'loan book', 'deposits', 'loan-to-deposit', 'CET1 ratio'],
            xpReward: 46
          },
          {
            id: 'variance-explanation',
            type: 'vocal',
            title: 'Explain Material Variances',
            scenario: 'Explain significant variances versus budget:\n\n"Net interest margin came in 15 basis points below budget due to competitive pressure on lending rates. However, this was partially offset by better-than-expected fee income, particularly in wealth management. Credit costs were €8M favorable to budget reflecting improving asset quality. Overall, we\'re 2% ahead of budgeted net profit."\n\nProvide context for deviations.',
            targetWPM: 140,
            targetDuration: 50,
            keywords: ['variance', 'net interest margin', 'budget', 'credit costs', 'asset quality'],
            xpReward: 47
          }
        ]
      },
      {
        id: 'capital-adequacy',
        title: 'Capital Adequacy & Structure',
        description: 'Communicate capital position and planning',
        duration: '20 min',
        xpReward: 70,
        exercises: [
          {
            id: 'capital-ratios',
            type: 'vocal',
            title: 'Present Capital Ratios',
            scenario: 'Report on capital adequacy:\n\n"Our CET1 ratio stands at 14.2%, well above the 10.5% regulatory minimum including buffers. Tier 1 ratio: 15.8%. Total capital ratio: 18.3%. Our capital position provides flexibility for organic growth, potential M&A, and enhanced shareholder returns. We\'re targeting a CET1 ratio of 13-14% medium-term."\n\nProject confidence in capital strength.',
            targetWPM: 135,
            targetDuration: 48,
            keywords: ['CET1 ratio', 'Tier 1', 'capital adequacy', 'regulatory minimum', 'shareholder returns'],
            xpReward: 46
          },
          {
            id: 'capital-planning',
            type: 'vocal',
            title: 'Discuss Capital Plan',
            scenario: 'Present the three-year capital plan:\n\n"Our capital plan balances growth, resilience, and returns. Projections show CET1 ratio declining moderately to 13.5% by 2027 as we deploy capital into lending growth. We\'re planning €200M in subordinated debt issuance to optimize capital structure. Dividend policy: 40-50% payout ratio subject to regulatory approval."\n\nBe strategic and forward-looking.',
            targetWPM: 140,
            targetDuration: 50,
            keywords: ['capital plan', 'CET1', 'subordinated debt', 'capital structure', 'dividend policy'],
            xpReward: 48
          },
          {
            id: 'rwa-optimization',
            type: 'vocal',
            title: 'Explain RWA Optimization',
            scenario: 'Discuss risk-weighted asset optimization initiatives:\n\n"We\'re implementing several RWA optimization measures: transitioning to advanced IRB models for corporate exposures, reducing non-core legacy assets, and optimizing our securities portfolio. Expected RWA reduction: €1.2B, improving our CET1 ratio by approximately 60 basis points while maintaining business momentum."\n\nShow proactive capital management.',
            targetWPM: 140,
            targetDuration: 52,
            keywords: ['RWA optimization', 'IRB models', 'legacy assets', 'CET1 improvement', 'capital management'],
            xpReward: 50
          }
        ]
      },
      {
        id: 'profitability-analysis',
        title: 'Profitability & Performance Metrics',
        description: 'Analyze and present profitability drivers',
        duration: '22 min',
        xpReward: 68,
        exercises: [
          {
            id: 'roe-decomposition',
            type: 'vocal',
            title: 'Decompose ROE Performance',
            scenario: 'Analyze ROE using DuPont methodology:\n\n"Our 11.8% ROE breaks down as follows: Net margin of 1.9% times asset turnover of 3.2% equals ROA of 6.1%. Equity multiplier of 1.93x brings us to 11.8% ROE. The primary driver of ROE improvement was margin expansion through disciplined pricing and cost control. Our target: 13% ROE by 2026."\n\nUse analytical frameworks.',
            targetWPM: 140,
            targetDuration: 50,
            keywords: ['ROE', 'DuPont', 'net margin', 'asset turnover', 'ROA', 'equity multiplier'],
            xpReward: 48
          },
          {
            id: 'segment-performance',
            type: 'vocal',
            title: 'Report Segment Performance',
            scenario: 'Compare business segment results:\n\n"Retail banking generated €145M profit, up 8%, driven by mortgage growth. Corporate banking: €78M, up 15%, reflecting strong fee generation. Wealth management: €42M, up 18%, our fastest-growing segment. The investment banking division faced headwinds with profit down 12% to €28M due to lower trading volumes."\n\nProvide balanced perspective.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['segment performance', 'retail banking', 'corporate banking', 'wealth management', 'investment banking'],
            xpReward: 50
          },
          {
            id: 'efficiency-initiatives',
            type: 'vocal',
            title: 'Present Efficiency Program',
            scenario: 'Describe the operational efficiency program:\n\n"Our Transform 2025 efficiency program has delivered €65M in annual run-rate savings. Key initiatives: branch network optimization saving €25M, digitalization of processes saving €18M, procurement optimization saving €12M, and organizational simplification saving €10M. On track to achieve our €100M target by year-end 2025."\n\nQuantify achievements.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['efficiency program', 'cost savings', 'digitalization', 'optimization', 'run-rate savings'],
            xpReward: 50
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
        duration: '25 min',
        xpReward: 80,
        exercises: [
          {
            id: 'pillar1-requirements',
            type: 'vocal',
            title: 'Explain Pillar 1 Requirements',
            scenario: 'Present Pillar 1 capital requirements to the board:\n\n"Under Pillar 1, our minimum capital requirements total €2.8B: credit risk RWA of €22B requiring €1.76B, operational risk €450M requiring €36M, and market risk €12B requiring €960M. We apply the standardized approach for credit risk and basic indicator approach for operational risk. Our capital comfortably exceeds these minimums."\n\nDemonstrate regulatory expertise.',
            targetWPM: 140,
            targetDuration: 55,
            keywords: ['Pillar 1', 'capital requirements', 'RWA', 'credit risk', 'operational risk', 'market risk'],
            xpReward: 52
          },
          {
            id: 'capital-buffers',
            type: 'vocal',
            title: 'Discuss Capital Buffers',
            scenario: 'Explain the capital buffer framework:\n\n"Beyond minimum requirements, we maintain several buffers: capital conservation buffer of 2.5%, countercyclical buffer currently at 0.5%, and as a systemic institution, a 1.5% systemic buffer. Combined with the 4.5% CET1 minimum, our total requirement is 9%. We maintain a 520 basis point cushion above this."\n\nClarify complex regulations.',
            targetWPM: 135,
            targetDuration: 50,
            keywords: ['capital buffers', 'conservation buffer', 'countercyclical buffer', 'systemic buffer', 'CET1 minimum'],
            xpReward: 50
          },
          {
            id: 'leverage-ratio',
            type: 'vocal',
            title: 'Report Leverage Ratio',
            scenario: 'Present leverage ratio compliance:\n\n"Our leverage ratio stands at 5.8%, well above the 3% regulatory minimum. This represents Tier 1 capital of €4.4B divided by total exposure of €76B. The leverage ratio complements risk-based metrics by providing a non-risk-weighted backstop. Our target range is 5.5-6%, balancing prudence with efficient capital deployment."\n\nBalance technical and strategic.',
            targetWPM: 140,
            targetDuration: 48,
            keywords: ['leverage ratio', 'Tier 1 capital', 'total exposure', 'non-risk-weighted', 'regulatory minimum'],
            xpReward: 48
          }
        ]
      },
      {
        id: 'aml-compliance',
        title: 'AML & Financial Crime',
        description: 'Communicate anti-money laundering measures',
        duration: '20 min',
        xpReward: 70,
        exercises: [
          {
            id: 'aml-framework',
            type: 'vocal',
            title: 'Present AML Framework',
            scenario: 'Update the board on AML compliance program:\n\n"Our AML framework encompasses customer due diligence, transaction monitoring, sanctions screening, and suspicious activity reporting. We process 2 million transactions daily through our monitoring system. Last year we filed 847 SARs and blocked 234 transactions flagged for sanctions. Our compliance team has grown to 45 FTEs."\n\nShow comprehensive controls.',
            targetWPM: 140,
            targetDuration: 50,
            keywords: ['AML framework', 'customer due diligence', 'transaction monitoring', 'SARs', 'sanctions screening'],
            xpReward: 48
          },
          {
            id: 'kyc-enhancement',
            type: 'vocal',
            title: 'Discuss KYC Enhancements',
            scenario: 'Present Know Your Customer program improvements:\n\n"We\'re enhancing our KYC program through several initiatives: implementing advanced customer risk scoring, digitizing client onboarding to reduce friction, integrating third-party data sources for beneficial ownership verification, and introducing continuous monitoring. Investment: €8M over 18 months. Expected benefits: reduced onboarding time and enhanced risk detection."\n\nBalance compliance and customer experience.',
            targetWPM: 145,
            targetDuration: 55,
            keywords: ['KYC', 'risk scoring', 'client onboarding', 'beneficial ownership', 'continuous monitoring'],
            xpReward: 50
          },
          {
            id: 'compliance-breach',
            type: 'vocal',
            title: 'Report Compliance Breach',
            scenario: 'Report an AML compliance breach:\n\n"We discovered inadequate customer due diligence on 45 corporate accounts during our internal audit. Root cause: insufficient training and system limitations. We\'ve self-reported to regulators, conducted remediation CDD on affected accounts, enhanced our training program, and upgraded our monitoring systems. Anticipated regulatory fine: €2-4M."\n\nBe transparent and accountable.',
            targetWPM: 135,
            targetDuration: 50,
            keywords: ['compliance breach', 'customer due diligence', 'self-reported', 'remediation', 'regulatory fine'],
            xpReward: 48
          }
        ]
      },
      {
        id: 'regulatory-reporting',
        title: 'Regulatory Reporting & Relations',
        description: 'Manage regulatory relationships and submissions',
        duration: '22 min',
        xpReward: 72,
        exercises: [
          {
            id: 'srep-results',
            type: 'vocal',
            title: 'Present SREP Results',
            scenario: 'Report Supervisory Review and Evaluation Process results:\n\n"The ECB completed our annual SREP. Results: business model score of 2 (low-medium risk), internal governance score of 2, capital adequacy score of 2, and liquidity score of 1 (low risk). Our Pillar 2 requirement remains at 2.25%. Overall, the assessment validates our risk management approach. The supervisor recommended enhancing our climate risk framework."\n\nInterpret regulatory feedback.',
            targetWPM: 145,
            targetDuration: 55,
            keywords: ['SREP', 'ECB', 'business model', 'Pillar 2', 'risk management', 'climate risk'],
            xpReward: 52
          },
          {
            id: 'stress-test-results',
            type: 'vocal',
            title: 'Discuss Stress Test Results',
            scenario: 'Present EBA stress test results:\n\n"Under the adverse scenario featuring 4% GDP contraction and 300bp rate shock, our CET1 ratio declines to 10.8%, a 340bp reduction but remaining above the 9% threshold. Our strong starting capital position and diversified business model provided resilience. Credit impairments were the main driver of capital depletion. Results demonstrate our ability to withstand severe stress."\n\nProvide context and perspective.',
            targetWPM: 145,
            targetDuration: 55,
            keywords: ['stress test', 'EBA', 'adverse scenario', 'CET1 decline', 'credit impairments', 'resilience'],
            xpReward: 52
          },
          {
            id: 'regulatory-change',
            type: 'vocal',
            title: 'Explain Regulatory Change Impact',
            scenario: 'Discuss the impact of new regulatory requirements:\n\n"The finalization of Basel III introduces stricter credit risk calculations, particularly for real estate exposures. Impact assessment: our RWA will increase by approximately €1.8B, reducing our CET1 ratio by 65 basis points. We have until 2028 for implementation. Mitigation strategies include portfolio optimization and targeted capital generation. No immediate capital raise required."\n\nAnticipate and plan.',
            targetWPM: 145,
            targetDuration: 58,
            keywords: ['Basel III', 'regulatory change', 'RWA increase', 'CET1 impact', 'implementation', 'mitigation'],
            xpReward: 54
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
        title: 'Monetary Policy & Central Banking',
        description: 'Interpret and communicate central bank decisions',
        duration: '25 min',
        xpReward: 85,
        exercises: [
          {
            id: 'rate-decision-impact',
            type: 'vocal',
            title: 'Analyze Interest Rate Decision',
            scenario: 'Explain the ECB\'s latest rate decision to the board:\n\n"The ECB raised rates by 25 basis points to 4%, the tenth consecutive increase in this tightening cycle. The decision reflects persistent inflation above the 2% target. Implications for our bank: positive for net interest margin in the short term, but potential headwinds from slower credit demand and increased credit risk as borrowers face higher debt service costs."\n\nLink macro to micro.',
            targetWPM: 150,
            targetDuration: 55,
            keywords: ['ECB', 'interest rate', 'tightening cycle', 'inflation', 'net interest margin', 'credit risk'],
            xpReward: 54
          },
          {
            id: 'qe-impact',
            type: 'vocal',
            title: 'Discuss Quantitative Tightening',
            scenario: 'Explain quantitative tightening implications:\n\n"The ECB is reducing its balance sheet by €15B monthly, reversing years of quantitative easing. This quantitative tightening will reduce system liquidity, potentially widening credit spreads and increasing funding costs. We\'re monitoring our TLTRO repayment obligations and assessing alternative funding sources. Our deposit franchise provides a stable funding base in this environment."\n\nAnticipate market dynamics.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['quantitative tightening', 'balance sheet', 'liquidity', 'credit spreads', 'TLTRO', 'funding costs'],
            xpReward: 52
          },
          {
            id: 'forward-guidance',
            type: 'vocal',
            title: 'Interpret Central Bank Forward Guidance',
            scenario: 'Discuss ECB forward guidance implications:\n\n"The ECB\'s forward guidance suggests rates will remain higher for longer, with potential for additional increases if inflation persists. The language shift from \'data-dependent\' to \'data-driven\' signals increased responsiveness to economic indicators. We\'re positioning our balance sheet to benefit from a sustained higher-rate environment while preparing for eventual normalization."\n\nRead between the lines.',
            targetWPM: 145,
            targetDuration: 50,
            keywords: ['forward guidance', 'higher for longer', 'data-driven', 'inflation', 'rate environment'],
            xpReward: 50
          }
        ]
      },
      {
        id: 'economic-indicators',
        title: 'Key Economic Indicators',
        description: 'Analyze GDP, inflation, and employment data',
        duration: '22 min',
        xpReward: 75,
        exercises: [
          {
            id: 'gdp-analysis',
            type: 'vocal',
            title: 'Analyze GDP Trends',
            scenario: 'Present GDP analysis and banking implications:\n\n"Eurozone GDP grew 0.3% in Q3, below the 0.5% consensus forecast. Germany contracted 0.1%, while France and Spain showed moderate growth. This uneven growth pattern reflects diverging fiscal policies and structural challenges. For our bank, slower growth suggests moderating loan demand but also potential opportunities in defensive sectors and quality corporate credits."\n\nConnect economics to strategy.',
            targetWPM: 145,
            targetDuration: 50,
            keywords: ['GDP growth', 'Eurozone', 'economic slowdown', 'loan demand', 'fiscal policy'],
            xpReward: 48
          },
          {
            id: 'inflation-dynamics',
            type: 'vocal',
            title: 'Discuss Inflation Dynamics',
            scenario: 'Analyze current inflation trends:\n\n"Headline inflation moderated to 3.4%, down from 4.1%, driven by declining energy prices. However, core inflation remains sticky at 3.8%, reflecting persistent wage pressures and services inflation. The stickiness of core inflation supports the case for maintaining restrictive monetary policy. Our asset-liability management strategy accounts for various inflation scenarios."\n\nDifferentiate inflation components.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['inflation', 'headline inflation', 'core inflation', 'wage pressures', 'monetary policy'],
            xpReward: 50
          },
          {
            id: 'labor-market',
            type: 'vocal',
            title: 'Assess Labor Market Conditions',
            scenario: 'Discuss labor market implications:\n\n"Eurozone unemployment remains at historic lows of 6.4%, indicating a tight labor market. Wage growth accelerated to 4.5% year-over-year. While positive for consumer spending and credit quality, strong wage growth could perpetuate inflation. We\'re monitoring our corporate clients\' ability to absorb higher labor costs, particularly in labor-intensive sectors."\n\nBalance opportunities and risks.',
            targetWPM: 145,
            targetDuration: 50,
            keywords: ['unemployment', 'labor market', 'wage growth', 'consumer spending', 'credit quality'],
            xpReward: 48
          }
        ]
      },
      {
        id: 'sector-outlook',
        title: 'Sector & Industry Outlook',
        description: 'Communicate sector-specific trends and exposures',
        duration: '24 min',
        xpReward: 78,
        exercises: [
          {
            id: 'real-estate-outlook',
            type: 'vocal',
            title: 'Present Real Estate Sector Outlook',
            scenario: 'Analyze commercial real estate market conditions:\n\n"The commercial real estate sector faces headwinds: office vacancy rates reached 15% in major cities due to remote work trends, while higher interest rates pressure valuations. Transaction volumes declined 40% year-over-year. Our CRE exposure of €4.8B is primarily in logistics and residential, with limited office exposure. We\'re tightening underwriting and conducting enhanced monitoring."\n\nProvide sector-specific analysis.',
            targetWPM: 150,
            targetDuration: 55,
            keywords: ['commercial real estate', 'vacancy rates', 'interest rates', 'valuations', 'underwriting'],
            xpReward: 52
          },
          {
            id: 'energy-transition',
            type: 'vocal',
            title: 'Discuss Energy Transition Impact',
            scenario: 'Explain energy transition implications for the portfolio:\n\n"The energy transition presents both risks and opportunities. Our fossil fuel exposure of €1.2B represents 3% of total loans, concentrated in natural gas infrastructure. We\'re growing our renewable energy financing, with €800M in wind and solar projects. Transition risk stress testing shows manageable impact. We\'ve committed to net-zero financed emissions by 2050."\n\nBalance transition risks.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['energy transition', 'fossil fuel', 'renewable energy', 'transition risk', 'net-zero'],
            xpReward: 50
          },
          {
            id: 'technology-sector',
            type: 'vocal',
            title: 'Analyze Technology Sector Exposure',
            scenario: 'Discuss technology sector dynamics:\n\n"Our technology sector exposure of €2.1B includes both established corporates and growth-stage companies. The sector faces normalization after pandemic-era expansion: valuations compressed, funding environment tightened, and profitability focus intensified. We\'re maintaining selective exposure to quality credits with strong unit economics while reducing exposure to speculative ventures."\n\nShow selective strategy.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['technology sector', 'valuations', 'funding environment', 'profitability', 'selective exposure'],
            xpReward: 50
          }
        ]
      },
      {
        id: 'geopolitical-risk',
        title: 'Geopolitical Risk Assessment',
        description: 'Communicate geopolitical developments and implications',
        duration: '20 min',
        xpReward: 72,
        exercises: [
          {
            id: 'trade-tensions',
            type: 'vocal',
            title: 'Analyze Trade Policy Impact',
            scenario: 'Discuss trade policy developments:\n\n"Escalating trade tensions between major economies create uncertainty for our export-oriented corporate clients. New tariffs on automotive and machinery sectors could impact 12% of our corporate portfolio. We\'re engaging clients to understand their supply chain resilience and pricing power. Our geographic diversification and limited direct trade finance exposure provide some insulation."\n\nAssess indirect exposures.',
            targetWPM: 145,
            targetDuration: 50,
            keywords: ['trade tensions', 'tariffs', 'export-oriented', 'supply chain', 'diversification'],
            xpReward: 48
          },
          {
            id: 'sanctions-compliance',
            type: 'vocal',
            title: 'Report on Sanctions Environment',
            scenario: 'Update on evolving sanctions landscape:\n\n"The sanctions environment continues to evolve with new designations across multiple jurisdictions. We\'ve enhanced our screening systems to capture secondary sanctions risk. Our direct exposure to sanctioned entities is zero. However, we\'re monitoring indirect exposure through client supply chains. Compliance costs increased €3M annually for enhanced screening and due diligence."\n\nShow proactive compliance.',
            targetWPM: 145,
            targetDuration: 52,
            keywords: ['sanctions', 'compliance', 'screening systems', 'designated entities', 'due diligence'],
            xpReward: 50
          },
          {
            id: 'regional-instability',
            type: 'vocal',
            title: 'Address Regional Instability',
            scenario: 'Discuss regional geopolitical risks:\n\n"Regional instability in several markets where we operate requires heightened monitoring. Our emerging market exposure of €3.2B is concentrated in investment-grade sovereigns. We\'re conducting enhanced country risk assessments quarterly. Current risk rating: elevated but manageable. We maintain adequate provisions and have reduced new originations in higher-risk jurisdictions."\n\nDemonstrate risk awareness.',
            targetWPM: 145,
            targetDuration: 50,
            keywords: ['regional instability', 'emerging markets', 'country risk', 'risk rating', 'provisions'],
            xpReward: 48
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
