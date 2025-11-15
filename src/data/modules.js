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
    lessons: []
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    icon: '⚖️',
    description: 'Communicate risks effectively to stakeholders',
    level: 'Intermediate',
    lessons: []
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting',
    icon: '📊',
    description: 'Present financial results with clarity',
    level: 'Advanced',
    lessons: []
  },
  {
    id: 'regulatory-compliance',
    title: 'Regulatory Compliance',
    icon: '📋',
    description: 'Basel III and compliance terminology',
    level: 'Advanced',
    lessons: []
  },
  {
    id: 'macroeconomic-indicators',
    title: 'Macroeconomic Indicators',
    icon: '🌍',
    description: 'Discuss economic trends and their banking impact',
    level: 'Expert',
    lessons: []
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
