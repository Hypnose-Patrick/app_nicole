// LingoQuest - Storage Manager
// Wrapper around IndexedDB for backwards compatibility
// All data now stored in IndexedDB for better persistence

const StorageManager = {
    // Initialize user profile
    initializeProfile() {
        // Return a promise wrapper for compatibility
        // This will be called synchronously by old code
        // but actually uses IndexedDB in the background

        // For synchronous compatibility, return cached profile from app
        if (window.LingoQuest && window.LingoQuest.profile) {
            return window.LingoQuest.profile;
        }

        // Fallback - should not happen in normal flow
        console.warn('StorageManager.initializeProfile() called before app init');
        return null;
    },

    // Get user profile (sync wrapper)
    getProfile() {
        if (window.LingoQuest && window.LingoQuest.profile) {
            return window.LingoQuest.profile;
        }
        return null;
    },

    // Save user profile (async in background)
    saveProfile(profile) {
        if (window.LingoQuest) {
            window.LingoQuest.profile = profile;
        }
        // Save to IndexedDB asynchronously
        IndexedDBStorage.saveProfile(profile).catch(err => {
            console.error('Error saving profile:', err);
        });
    },

    // Update streak (async wrapper)
    updateStreak() {
        IndexedDBStorage.updateStreak().then(async () => {
            if (window.LingoQuest) {
                window.LingoQuest.profile = await IndexedDBStorage.getProfile();
            }
        }).catch(err => {
            console.error('Error updating streak:', err);
        });
    },

    // Add XP to profile (async wrapper)
    addXP(amount) {
        IndexedDBStorage.addXP(amount).then(async (result) => {
            if (window.LingoQuest) {
                window.LingoQuest.profile = await IndexedDBStorage.getProfile();
            }
            return result;
        }).catch(err => {
            console.error('Error adding XP:', err);
            return { leveledUp: false, newLevel: 1 };
        });

        // Return immediate result for sync compatibility
        const profile = this.getProfile();
        if (profile) {
            profile.totalXP += amount;
            const newLevel = calculateLevel(profile.totalXP);
            const leveledUp = newLevel > profile.level;
            profile.level = newLevel;
            return { leveledUp, newLevel };
        }
        return { leveledUp: false, newLevel: 1 };
    },

    // Get progress data (sync wrapper using cached data)
    getProgress() {
        // This needs to be synchronous for compatibility
        // We'll use a cache that's updated on app init
        if (window.LingoQuest && window.LingoQuest.progressCache) {
            return window.LingoQuest.progressCache;
        }
        return {};
    },

    // Save exercise completion (async wrapper)
    saveExerciseCompletion(moduleId, lessonId, exerciseId, score) {
        // Update cache immediately
        if (window.LingoQuest) {
            if (!window.LingoQuest.progressCache) {
                window.LingoQuest.progressCache = {};
            }
            const progress = window.LingoQuest.progressCache;

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
        }

        // Save to IndexedDB asynchronously
        IndexedDBStorage.saveExerciseCompletion(moduleId, lessonId, exerciseId, score)
            .catch(err => {
                console.error('Error saving exercise completion:', err);
            });
    },

    // Check if exercise is completed
    isExerciseCompleted(moduleId, lessonId, exerciseId) {
        const progress = this.getProgress();
        return !!(progress[moduleId]?.[lessonId]?.[exerciseId]?.completed);
    },

    // Get exercise score
    getExerciseScore(moduleId, lessonId, exerciseId) {
        const progress = this.getProgress();
        return progress[moduleId]?.[lessonId]?.[exerciseId]?.score || 0;
    },

    // Get settings (sync wrapper)
    getSettings() {
        if (window.LingoQuest && window.LingoQuest.settingsCache) {
            return window.LingoQuest.settingsCache;
        }
        return { theme: 'light', soundEnabled: true };
    },

    // Save settings (async wrapper)
    saveSettings(settings) {
        if (window.LingoQuest) {
            window.LingoQuest.settingsCache = settings;
        }
        IndexedDBStorage.saveSettings(settings).catch(err => {
            console.error('Error saving settings:', err);
        });
    },

    // Get unlocked badges (sync wrapper)
    getUnlockedBadges() {
        if (window.LingoQuest && window.LingoQuest.badgesCache) {
            return window.LingoQuest.badgesCache;
        }
        return [];
    },

    // Unlock badge (async wrapper)
    unlockBadge(badgeId) {
        // Update cache immediately
        if (window.LingoQuest) {
            if (!window.LingoQuest.badgesCache) {
                window.LingoQuest.badgesCache = [];
            }
            const badges = window.LingoQuest.badgesCache;

            if (!badges.includes(badgeId)) {
                badges.push(badgeId);

                // Save to IndexedDB asynchronously
                IndexedDBStorage.unlockBadge(badgeId).catch(err => {
                    console.error('Error unlocking badge:', err);
                });

                return true;
            }
        }
        return false;
    },

    // Check if badge is unlocked
    isBadgeUnlocked(badgeId) {
        const badges = this.getUnlockedBadges();
        return badges.includes(badgeId);
    },

    // Update profile stats (async wrapper)
    updateStats(stats) {
        const profile = this.getProfile();
        if (profile) {
            Object.assign(profile, stats);
            this.saveProfile(profile);
        }
    }
};
