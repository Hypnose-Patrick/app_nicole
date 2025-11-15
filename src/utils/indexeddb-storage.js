// LingoQuest - IndexedDB Storage Manager
// Manages persistent storage using IndexedDB for reliability and durability
// Migrates data from LocalStorage automatically

const IndexedDBStorage = {
    DB_NAME: 'LingoQuestDB',
    DB_VERSION: 1,
    db: null,

    // Store names
    STORES: {
        PROFILE: 'profile',
        PROGRESS: 'progress',
        SETTINGS: 'settings',
        BADGES: 'badges',
        BACKUPS: 'backups'
    },

    // Initialize IndexedDB
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ IndexedDB initialized successfully');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores if they don't exist
                if (!db.objectStoreNames.contains(this.STORES.PROFILE)) {
                    db.createObjectStore(this.STORES.PROFILE, { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains(this.STORES.PROGRESS)) {
                    db.createObjectStore(this.STORES.PROGRESS, { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains(this.STORES.SETTINGS)) {
                    db.createObjectStore(this.STORES.SETTINGS, { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains(this.STORES.BADGES)) {
                    db.createObjectStore(this.STORES.BADGES, { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains(this.STORES.BACKUPS)) {
                    const backupStore = db.createObjectStore(this.STORES.BACKUPS, {
                        keyPath: 'timestamp',
                        autoIncrement: false
                    });
                    backupStore.createIndex('type', 'type', { unique: false });
                }

                console.log('✅ IndexedDB object stores created');
            };
        });
    },

    // Generic method to get data from a store
    async get(storeName, key = 'main') {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result?.data || null);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    // Generic method to save data to a store
    async set(storeName, data, key = 'main') {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put({ id: key, data: data });

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    // Profile methods
    async getProfile() {
        return await this.get(this.STORES.PROFILE);
    },

    async saveProfile(profile) {
        return await this.set(this.STORES.PROFILE, profile);
    },

    async initializeProfile() {
        let profile = await this.getProfile();

        if (!profile) {
            profile = {
                name: 'Executive',
                level: 1,
                totalXP: 0,
                vocalExercisesCompleted: 0,
                perfectScores: 0,
                currentStreak: 0,
                longestStreak: 0,
                averageScore: 0,
                maxWPM: 0,
                totalScores: 0,
                lastLogin: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            };
            await this.saveProfile(profile);
        }

        return profile;
    },

    // Progress methods
    async getProgress() {
        const progress = await this.get(this.STORES.PROGRESS);
        return progress || {};
    },

    async saveExerciseCompletion(moduleId, lessonId, exerciseId, score) {
        const progress = await this.getProgress();

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

        await this.set(this.STORES.PROGRESS, progress);
    },

    async isExerciseCompleted(moduleId, lessonId, exerciseId) {
        const progress = await this.getProgress();
        return !!(progress[moduleId]?.[lessonId]?.[exerciseId]?.completed);
    },

    async getExerciseScore(moduleId, lessonId, exerciseId) {
        const progress = await this.getProgress();
        return progress[moduleId]?.[lessonId]?.[exerciseId]?.score || 0;
    },

    // Settings methods
    async getSettings() {
        const settings = await this.get(this.STORES.SETTINGS);
        return settings || { theme: 'light', soundEnabled: true };
    },

    async saveSettings(settings) {
        return await this.set(this.STORES.SETTINGS, settings);
    },

    // Badges methods
    async getUnlockedBadges() {
        const badges = await this.get(this.STORES.BADGES);
        return badges || [];
    },

    async unlockBadge(badgeId) {
        const badges = await this.getUnlockedBadges();
        if (!badges.includes(badgeId)) {
            badges.push(badgeId);
            await this.set(this.STORES.BADGES, badges);
            return true;
        }
        return false;
    },

    async isBadgeUnlocked(badgeId) {
        const badges = await this.getUnlockedBadges();
        return badges.includes(badgeId);
    },

    // Update streak
    async updateStreak() {
        const profile = await this.getProfile();
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
            await this.saveProfile(profile);
        }
    },

    // Add XP
    async addXP(amount) {
        const profile = await this.getProfile();
        profile.totalXP += amount;

        // Calculate new level
        const newLevel = calculateLevel(profile.totalXP);
        const leveledUp = newLevel > profile.level;
        profile.level = newLevel;

        await this.saveProfile(profile);

        return { leveledUp, newLevel };
    },

    // Update stats
    async updateStats(stats) {
        const profile = await this.getProfile();
        Object.assign(profile, stats);
        await this.saveProfile(profile);
    },

    // Backup methods
    async createBackup(type = 'auto') {
        const backup = {
            timestamp: new Date().toISOString(),
            type: type, // 'auto' or 'manual'
            data: {
                profile: await this.getProfile(),
                progress: await this.getProgress(),
                settings: await this.getSettings(),
                badges: await this.getUnlockedBadges()
            }
        };

        const transaction = this.db.transaction([this.STORES.BACKUPS], 'readwrite');
        const store = transaction.objectStore(this.STORES.BACKUPS);
        await store.put(backup);

        // Keep only last 10 backups
        await this.cleanOldBackups(10);

        return backup;
    },

    async cleanOldBackups(keepCount = 10) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.STORES.BACKUPS], 'readwrite');
            const store = transaction.objectStore(this.STORES.BACKUPS);
            const request = store.openCursor(null, 'prev');

            let count = 0;
            const toDelete = [];

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    count++;
                    if (count > keepCount) {
                        toDelete.push(cursor.value.timestamp);
                    }
                    cursor.continue();
                } else {
                    // Delete old backups
                    toDelete.forEach(timestamp => {
                        store.delete(timestamp);
                    });
                    resolve(toDelete.length);
                }
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Export all data as JSON
    async exportData() {
        const data = {
            exportDate: new Date().toISOString(),
            version: this.DB_VERSION,
            profile: await this.getProfile(),
            progress: await this.getProgress(),
            settings: await this.getSettings(),
            badges: await this.getUnlockedBadges()
        };

        return data;
    },

    // Import data from JSON
    async importData(data) {
        try {
            if (data.profile) await this.saveProfile(data.profile);
            if (data.progress) await this.set(this.STORES.PROGRESS, data.progress);
            if (data.settings) await this.saveSettings(data.settings);
            if (data.badges) await this.set(this.STORES.BADGES, data.badges);

            console.log('✅ Data imported successfully');
            return true;
        } catch (error) {
            console.error('❌ Error importing data:', error);
            return false;
        }
    },

    // Migration from LocalStorage
    async migrateFromLocalStorage() {
        const KEYS = {
            PROFILE: 'lingoquest_profile',
            PROGRESS: 'lingoquest_progress',
            SETTINGS: 'lingoquest_settings',
            BADGES: 'lingoquest_badges'
        };

        let migrated = false;

        try {
            // Check if there's data in LocalStorage
            const localProfile = localStorage.getItem(KEYS.PROFILE);

            if (localProfile) {
                console.log('🔄 Migrating data from LocalStorage to IndexedDB...');

                // Migrate profile
                const profile = JSON.parse(localProfile);
                await this.saveProfile(profile);
                migrated = true;

                // Migrate progress
                const localProgress = localStorage.getItem(KEYS.PROGRESS);
                if (localProgress) {
                    const progress = JSON.parse(localProgress);
                    await this.set(this.STORES.PROGRESS, progress);
                }

                // Migrate settings
                const localSettings = localStorage.getItem(KEYS.SETTINGS);
                if (localSettings) {
                    const settings = JSON.parse(localSettings);
                    await this.saveSettings(settings);
                }

                // Migrate badges
                const localBadges = localStorage.getItem(KEYS.BADGES);
                if (localBadges) {
                    const badges = JSON.parse(localBadges);
                    await this.set(this.STORES.BADGES, badges);
                }

                // Create a backup after migration
                await this.createBackup('migration');

                console.log('✅ Migration completed successfully!');

                // Mark migration as complete
                localStorage.setItem('lingoquest_migrated', 'true');
            }
        } catch (error) {
            console.error('❌ Error during migration:', error);
        }

        return migrated;
    }
};
