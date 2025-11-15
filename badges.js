// LingoQuest - Badges System
// 19 Badges across 5 tiers: Bronze → Silver → Gold → Platinum → Diamond

const BADGES_DATA = [
    // === BRONZE TIER (4 badges) ===
    {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Complete your first exercise',
        icon: '👣',
        tier: 'bronze',
        category: 'progression',
        requirement: 'exercises_completed',
        threshold: 1,
        xpReward: 50
    },
    {
        id: 'early-bird',
        name: 'Early Bird',
        description: 'Complete 5 exercises',
        icon: '🐦',
        tier: 'bronze',
        category: 'progression',
        requirement: 'exercises_completed',
        threshold: 5,
        xpReward: 75
    },
    {
        id: 'vocal-debut',
        name: 'Vocal Debut',
        description: 'Complete your first vocal exercise',
        icon: '🎤',
        tier: 'bronze',
        category: 'vocal',
        requirement: 'vocal_exercises_completed',
        threshold: 1,
        xpReward: 60
    },
    {
        id: 'quick-learner',
        name: 'Quick Learner',
        description: 'Reach level 2',
        icon: '⚡',
        tier: 'bronze',
        category: 'progression',
        requirement: 'level',
        threshold: 2,
        xpReward: 100
    },
    
    // === SILVER TIER (5 badges) ===
    {
        id: 'dedicated-student',
        name: 'Dedicated Student',
        description: 'Complete 15 exercises',
        icon: '📚',
        tier: 'silver',
        category: 'progression',
        requirement: 'exercises_completed',
        threshold: 15,
        xpReward: 150
    },
    {
        id: 'smooth-talker',
        name: 'Smooth Talker',
        description: 'Complete 10 vocal exercises',
        icon: '💬',
        tier: 'silver',
        category: 'vocal',
        requirement: 'vocal_exercises_completed',
        threshold: 10,
        xpReward: 175
    },
    {
        id: 'rising-star',
        name: 'Rising Star',
        description: 'Reach level 5',
        icon: '⭐',
        tier: 'silver',
        category: 'progression',
        requirement: 'level',
        threshold: 5,
        xpReward: 200
    },
    {
        id: 'module-master',
        name: 'Module Master',
        description: 'Complete all lessons in one module',
        icon: '🎓',
        tier: 'silver',
        category: 'completion',
        requirement: 'modules_completed',
        threshold: 1,
        xpReward: 250
    },
    {
        id: 'perfect-score',
        name: 'Perfect Score',
        description: 'Get 100% on 5 exercises',
        icon: '💯',
        tier: 'silver',
        category: 'performance',
        requirement: 'perfect_scores',
        threshold: 5,
        xpReward: 200
    },
    
    // === GOLD TIER (4 badges) ===
    {
        id: 'fluent-speaker',
        name: 'Fluent Speaker',
        description: 'Complete 25 vocal exercises with high fluency',
        icon: '🗣️',
        tier: 'gold',
        category: 'vocal',
        requirement: 'vocal_exercises_completed',
        threshold: 25,
        xpReward: 300
    },
    {
        id: 'consistency-king',
        name: 'Consistency King',
        description: 'Complete exercises 7 days in a row',
        icon: '👑',
        tier: 'gold',
        category: 'streak',
        requirement: 'streak_days',
        threshold: 7,
        xpReward: 350
    },
    {
        id: 'boardroom-ready',
        name: 'Boardroom Ready',
        description: 'Complete all Boardroom modules',
        icon: '🎯',
        tier: 'gold',
        category: 'completion',
        requirement: 'modules_completed',
        threshold: 2,
        xpReward: 400
    },
    {
        id: 'expert-communicator',
        name: 'Expert Communicator',
        description: 'Reach level 10',
        icon: '💼',
        tier: 'gold',
        category: 'progression',
        requirement: 'level',
        threshold: 10,
        xpReward: 500
    },
    
    // === PLATINUM TIER (3 badges) ===
    {
        id: 'vocal-virtuoso',
        name: 'Vocal Virtuoso',
        description: 'Complete 50 vocal exercises with excellent scores',
        icon: '🎭',
        tier: 'platinum',
        category: 'vocal',
        requirement: 'vocal_exercises_completed',
        threshold: 50,
        xpReward: 750
    },
    {
        id: 'marathon-runner',
        name: 'Marathon Runner',
        description: 'Complete 30-day learning streak',
        icon: '🏃',
        tier: 'platinum',
        category: 'streak',
        requirement: 'streak_days',
        threshold: 30,
        xpReward: 1000
    },
    {
        id: 'completionist',
        name: 'Completionist',
        description: 'Complete all 6 modules',
        icon: '🏆',
        tier: 'platinum',
        category: 'completion',
        requirement: 'modules_completed',
        threshold: 6,
        xpReward: 1500
    },
    
    // === DIAMOND TIER (3 badges) ===
    {
        id: 'boardroom-legend',
        name: 'Boardroom Legend',
        description: 'Reach level 20',
        icon: '👔',
        tier: 'diamond',
        category: 'progression',
        requirement: 'level',
        threshold: 20,
        xpReward: 2000
    },
    {
        id: 'master-orator',
        name: 'Master Orator',
        description: 'Complete 100 vocal exercises with mastery',
        icon: '🎙️',
        tier: 'diamond',
        category: 'vocal',
        requirement: 'vocal_exercises_completed',
        threshold: 100,
        xpReward: 2500
    },
    {
        id: 'executive-elite',
        name: 'Executive Elite',
        description: 'Achieve 10,000 total XP',
        icon: '💎',
        tier: 'diamond',
        category: 'progression',
        requirement: 'total_xp',
        threshold: 10000,
        xpReward: 5000
    }
];

// Badge categories for filtering
const BADGE_CATEGORIES = {
    all: 'All Badges',
    progression: 'Progression',
    vocal: 'Vocal Mastery',
    completion: 'Completion',
    performance: 'Performance',
    streak: 'Consistency'
};

// XP requirements for levels
const XP_PER_LEVEL = [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    450,    // Level 4
    700,    // Level 5
    1000,   // Level 6
    1400,   // Level 7
    1900,   // Level 8
    2500,   // Level 9
    3200,   // Level 10
    4000,   // Level 11
    5000,   // Level 12
    6200,   // Level 13
    7600,   // Level 14
    9200,   // Level 15
    11000,  // Level 16
    13000,  // Level 17
    15500,  // Level 18
    18500,  // Level 19
    22000   // Level 20
];

// Calculate level from XP
function getLevelFromXP(xp) {
    for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
        if (xp >= XP_PER_LEVEL[i]) {
            return i + 1;
        }
    }
    return 1;
}

// Calculate XP needed for next level
function getXPForNextLevel(currentLevel) {
    if (currentLevel >= XP_PER_LEVEL.length) {
        return 0; // Max level reached
    }
    return XP_PER_LEVEL[currentLevel];
}

// Calculate progress to next level
function getLevelProgress(xp, currentLevel) {
    if (currentLevel >= XP_PER_LEVEL.length) {
        return 100; // Max level
    }
    
    const currentLevelXP = XP_PER_LEVEL[currentLevel - 1];
    const nextLevelXP = XP_PER_LEVEL[currentLevel];
    const xpInCurrentLevel = xp - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    
    return Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100);
}
