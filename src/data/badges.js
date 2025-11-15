// LingoQuest - Badge System Data
// 19 badges across 5 tiers for gamification

const BADGES_DATA = {
  // BRONZE TIER (Beginner - 4 badges)
  'first-steps': {
    id: 'first-steps',
    name: 'First Steps',
    icon: '👣',
    tier: 'bronze',
    description: 'Complete your first vocal exercise',
    requirement: { type: 'vocal_exercises', count: 1 },
    xpReward: 25
  },
  'early-bird': {
    id: 'early-bird',
    name: 'Early Bird',
    icon: '🌅',
    tier: 'bronze',
    description: 'Log in 3 days in a row',
    requirement: { type: 'streak', count: 3 },
    xpReward: 30
  },
  'rookie-speaker': {
    id: 'rookie-speaker',
    name: 'Rookie Speaker',
    icon: '🎙️',
    tier: 'bronze',
    description: 'Complete 5 vocal exercises',
    requirement: { type: 'vocal_exercises', count: 5 },
    xpReward: 50
  },
  'word-collector': {
    id: 'word-collector',
    name: 'Word Collector',
    icon: '📚',
    tier: 'bronze',
    description: 'Complete one full module',
    requirement: { type: 'modules_completed', count: 1 },
    xpReward: 75
  },

  // SILVER TIER (Intermediate - 5 badges)
  'smooth-talker': {
    id: 'smooth-talker',
    name: 'Smooth Talker',
    icon: '💬',
    tier: 'silver',
    description: 'Complete 10 vocal exercises',
    requirement: { type: 'vocal_exercises', count: 10 },
    xpReward: 100
  },
  'week-warrior': {
    id: 'week-warrior',
    name: 'Week Warrior',
    icon: '📅',
    tier: 'silver',
    description: 'Maintain a 7-day streak',
    requirement: { type: 'streak', count: 7 },
    xpReward: 125
  },
  'boardroom-ready': {
    id: 'boardroom-ready',
    name: 'Boardroom Ready',
    icon: '💼',
    tier: 'silver',
    description: 'Complete Boardroom Essentials module',
    requirement: { type: 'module_completed', moduleId: 'boardroom-essentials' },
    xpReward: 150
  },
  'speed-demon': {
    id: 'speed-demon',
    name: 'Speed Demon',
    icon: '⚡',
    tier: 'silver',
    description: 'Achieve 150+ WPM in an exercise',
    requirement: { type: 'wpm_achieved', count: 150 },
    xpReward: 100
  },
  'xp-hunter': {
    id: 'xp-hunter',
    name: 'XP Hunter',
    icon: '🎯',
    tier: 'silver',
    description: 'Earn 500 total XP',
    requirement: { type: 'total_xp', count: 500 },
    xpReward: 150
  },

  // GOLD TIER (Advanced - 4 badges)
  'eloquent-executive': {
    id: 'eloquent-executive',
    name: 'Eloquent Executive',
    icon: '🎩',
    tier: 'gold',
    description: 'Complete 25 vocal exercises',
    requirement: { type: 'vocal_exercises', count: 25 },
    xpReward: 200
  },
  'consistency-king': {
    id: 'consistency-king',
    name: 'Consistency King',
    icon: '👑',
    tier: 'gold',
    description: 'Maintain a 14-day streak',
    requirement: { type: 'streak', count: 14 },
    xpReward: 250
  },
  'perfect-score': {
    id: 'perfect-score',
    name: 'Perfect Score',
    icon: '🎯',
    tier: 'gold',
    description: 'Score 95+ on 5 different exercises',
    requirement: { type: 'perfect_scores', count: 5 },
    xpReward: 300
  },
  'module-master': {
    id: 'module-master',
    name: 'Module Master',
    icon: '🎓',
    tier: 'gold',
    description: 'Complete 3 full modules',
    requirement: { type: 'modules_completed', count: 3 },
    xpReward: 350
  },

  // PLATINUM TIER (Expert - 3 badges)
  'boardroom-legend': {
    id: 'boardroom-legend',
    name: 'Boardroom Legend',
    icon: '🏆',
    tier: 'platinum',
    description: 'Complete 50 vocal exercises',
    requirement: { type: 'vocal_exercises', count: 50 },
    xpReward: 500
  },
  'month-champion': {
    id: 'month-champion',
    name: 'Month Champion',
    icon: '🌟',
    tier: 'platinum',
    description: 'Maintain a 30-day streak',
    requirement: { type: 'streak', count: 30 },
    xpReward: 600
  },
  'xp-millionaire': {
    id: 'xp-millionaire',
    name: 'XP Millionaire',
    icon: '💰',
    tier: 'platinum',
    description: 'Earn 2000 total XP',
    requirement: { type: 'total_xp', count: 2000 },
    xpReward: 500
  },

  // DIAMOND TIER (Elite - 3 badges)
  'executive-master': {
    id: 'executive-master',
    name: 'Executive Master',
    icon: '💎',
    tier: 'diamond',
    description: 'Complete ALL modules',
    requirement: { type: 'all_modules_completed' },
    xpReward: 1000
  },
  'dedication-diamond': {
    id: 'dedication-diamond',
    name: 'Dedication Diamond',
    icon: '🔥',
    tier: 'diamond',
    description: 'Maintain a 60-day streak',
    requirement: { type: 'streak', count: 60 },
    xpReward: 1000
  },
  'lingoquest-legend': {
    id: 'lingoquest-legend',
    name: 'LingoQuest Legend',
    icon: '⭐',
    tier: 'diamond',
    description: 'Complete 100 vocal exercises with 90+ average score',
    requirement: { type: 'exercises_with_avg', count: 100, avgScore: 90 },
    xpReward: 1500
  }
};

// Badge tier info
const BADGE_TIERS = {
  bronze: { name: 'Bronze', color: '#CD7F32', emoji: '🥉' },
  silver: { name: 'Silver', color: '#C0C0C0', emoji: '🥈' },
  gold: { name: 'Gold', color: '#FFD700', emoji: '🥇' },
  platinum: { name: 'Platinum', color: '#E5E4E2', emoji: '💿' },
  diamond: { name: 'Diamond', color: '#B9F2FF', emoji: '💎' }
};
