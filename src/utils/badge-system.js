// LingoQuest - Badge System
// Checks and unlocks badges based on user progress

const BadgeSystem = {
    // Check for newly unlocked badges
    checkBadges(profile, progress) {
        const unlockedBadges = StorageManager.getUnlockedBadges();
        const newlyUnlocked = [];

        Object.values(BADGES_DATA).forEach(badge => {
            // Skip if already unlocked
            if (unlockedBadges.includes(badge.id)) return;

            // Check if requirements are met
            if (this.meetsRequirement(badge, profile, progress)) {
                const unlocked = StorageManager.unlockBadge(badge.id);
                if (unlocked) {
                    // Add XP reward
                    StorageManager.addXP(badge.xpReward);
                    newlyUnlocked.push(badge);
                }
            }
        });

        return newlyUnlocked;
    },

    // Check if badge requirement is met
    meetsRequirement(badge, profile, progress) {
        const req = badge.requirement;

        switch (req.type) {
            case 'vocal_exercises':
                return profile.vocalExercisesCompleted >= req.count;

            case 'streak':
                return profile.currentStreak >= req.count;

            case 'modules_completed':
                return this.getCompletedModulesCount(progress) >= req.count;

            case 'module_completed':
                return this.isModuleCompleted(req.moduleId, progress);

            case 'wpm_achieved':
                return profile.maxWPM >= req.count;

            case 'total_xp':
                return profile.totalXP >= req.count;

            case 'perfect_scores':
                return profile.perfectScores >= req.count;

            case 'all_modules_completed':
                return this.getCompletedModulesCount(progress) >= MODULES_DATA.length;

            case 'exercises_with_avg':
                return profile.vocalExercisesCompleted >= req.count &&
                       profile.averageScore >= req.avgScore;

            default:
                return false;
        }
    },

    // Count completed modules
    getCompletedModulesCount(progress) {
        let count = 0;
        MODULES_DATA.forEach(module => {
            if (this.isModuleCompleted(module.id, progress)) {
                count++;
            }
        });
        return count;
    },

    // Check if a module is fully completed
    isModuleCompleted(moduleId, progress) {
        const module = MODULES_DATA.find(m => m.id === moduleId);
        if (!module || !module.lessons.length) return false;

        const moduleProgress = progress[moduleId] || {};

        // Check if all lessons in module are completed
        for (let lesson of module.lessons) {
            const lessonProgress = moduleProgress[lesson.id] || {};

            // Check if all exercises in lesson are completed
            for (let exercise of lesson.exercises) {
                if (!lessonProgress[exercise.id]?.completed) {
                    return false;
                }
            }
        }

        return true;
    },

    // Show badge unlock modal
    showBadgeModal(badge, onClose) {
        const modal = document.getElementById('badge-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = document.getElementById('close-badge-modal');

        document.getElementById('modal-badge-icon').textContent = badge.icon;
        document.getElementById('modal-badge-name').textContent = badge.name;
        document.getElementById('modal-badge-description').textContent = badge.description;

        modal.classList.remove('hidden');

        const close = () => {
            modal.classList.add('hidden');
            if (onClose) onClose();
        };

        closeBtn.onclick = close;
        overlay.onclick = close;
    },

    // Get progress toward a badge
    getBadgeProgress(badge, profile, progress) {
        const req = badge.requirement;
        let current = 0;
        let target = 0;

        switch (req.type) {
            case 'vocal_exercises':
                current = profile.vocalExercisesCompleted;
                target = req.count;
                break;
            case 'streak':
                current = profile.currentStreak;
                target = req.count;
                break;
            case 'total_xp':
                current = profile.totalXP;
                target = req.count;
                break;
            case 'perfect_scores':
                current = profile.perfectScores;
                target = req.count;
                break;
            case 'modules_completed':
                current = this.getCompletedModulesCount(progress);
                target = req.count;
                break;
        }

        return { current, target, percentage: Math.min(100, Math.round((current / target) * 100)) };
    }
};
