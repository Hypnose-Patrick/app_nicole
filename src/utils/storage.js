// LingoQuest - Storage Manager
// Manages LocalStorage operations for user profile, progress, and settings

const StorageManager = {
    // Storage keys
    KEYS: {
        PROFILE: 'lingoquest_profile',
        PROGRESS: 'lingoquest_progress',
        SETTINGS: 'lingoquest_settings',
        BADGES: 'lingoquest_badges'
    },

    // Initialize user profile
    initializeProfile() {
        let profile = this.getProfile();

        if (!profile) {
            profile = {
                name: 'Executive',
                level: 1,
                totalXP: 0,
                vocalExercisesCompleted: 0,
                perfectScores: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastLogin: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            };
            this.saveProfile(profile);
        }

        return profile;
    },

    // Get user profile
    getProfile() {
        const data = localStorage.getItem(this.KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
    },

    // Save user profile
    saveProfile(profile) {
        localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
    },

    // Update streak
    updateStreak() {
        const profile = this.getProfile();
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = profile.lastLogin;

        if (lastLogin !== today) {
            const lastDate = new Date(lastLogin);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day
                profile.currentStreak++;
                if (profile.currentStreak > profile.longestStreak) {
                    profile.longestStreak = profile.currentStreak;
                }
            } else if (diffDays > 1) {
                // Streak broken
                profile.currentStreak = 1;
            }

            profile.lastLogin = today;
            this.saveProfile(profile);
        }
    },

    // Add XP to profile
    addXP(amount) {
        const profile = this.getProfile();
        profile.totalXP += amount;

        // Calculate new level
        const newLevel = calculateLevel(profile.totalXP);
        const leveledUp = newLevel > profile.level;
        profile.level = newLevel;

        this.saveProfile(profile);

        return { leveledUp, newLevel };
    },

    // Get progress data
    getProgress() {
        const data = localStorage.getItem(this.KEYS.PROGRESS);
        return data ? JSON.parse(data) : {};
    },

    // Save exercise completion
    saveExerciseCompletion(moduleId, lessonId, exerciseId, score) {
        const progress = this.getProgress();

        if (!progress[moduleId]) {
            progress[moduleId] = {};
        }
        if (!progress[moduleId][lessonId]) {
            progress[moduleId][lessonId] = {};
        }

        progress[moduleId][lessonId][exerciseId] = {
            completed: true,
            score: score,
            completedAt: new Date().toISOString()
        };

        localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
    },

    // Check if exercise is completed
    isExerciseCompleted(moduleId, lessonId, exerciseId) {
        const progress = this.getProgress();
        return !!(progress[moduleId]?.  [lessonId]?.[exerciseId]?.completed);
    },

    // Get exercise score
    getExerciseScore(moduleId, lessonId, exerciseId) {
        const progress = this.getProgress();
        return progress[moduleId]?.[lessonId]?.[exerciseId]?.score || 0;
    },

    // Get settings
    getSettings() {
        const data = localStorage.getItem(this.KEYS.SETTINGS);
        return data ? JSON.parse(data) : { theme: 'light', soundEnabled: true };
    },

    // Save settings
    saveSettings(settings) {
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    },

    // Get unlocked badges
    getUnlockedBadges() {
        const data = localStorage.getItem(this.KEYS.BADGES);
        return data ? JSON.parse(data) : [];
    },

    // Unlock badge
    unlockBadge(badgeId) {
        const badges = this.getUnlockedBadges();
        if (!badges.includes(badgeId)) {
            badges.push(badgeId);
            localStorage.setItem(this.KEYS.BADGES, JSON.stringify(badges));
            return true;
        }
        return false;
    },

    // Check if badge is unlocked
    isBadgeUnlocked(badgeId) {
        const badges = this.getUnlockedBadges();
        return badges.includes(badgeId);
    },

    // Update profile stats
    updateStats(stats) {
        const profile = this.getProfile();
        Object.assign(profile, stats);
        this.saveProfile(profile);
    }
};
