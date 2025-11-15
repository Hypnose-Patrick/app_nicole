// LingoQuest - Badge System
// Checks and unlocks badges based on user progress

const BadgeSystem = {
    // Check for newly unlocked badges
    checkBadges(profile) {
        const unlockedBadges = StorageManager.getUnlockedBadges();
        const newlyUnlocked = [];
        
        BADGES_DATA.forEach(badge => {
            // Skip if already unlocked
            if (unlockedBadges.includes(badge.id)) return;
            
            // Check if requirements are met
            if (this.meetsRequirement(badge, profile)) {
                StorageManager.unlockBadge(badge.id);
                newlyUnlocked.push(badge);
            }
        });
        
        return newlyUnlocked;
    },
    
    // Check if badge requirement is met
    meetsRequirement(badge, profile) {
        const { requirement, threshold } = badge;
        
        switch (requirement) {
            case 'exercises_completed':
                return profile.exercisesCompleted >= threshold;
            case 'vocal_exercises_completed':
                return profile.vocalExercisesCompleted >= threshold;
            case 'level':
                return profile.level >= threshold;
            case 'modules_completed':
                return profile.modulesCompleted >= threshold;
            case 'perfect_scores':
                return profile.perfectScores >= threshold;
            case 'streak_days':
                return profile.currentStreak >= threshold;
            case 'total_xp':
                return profile.totalXP >= threshold;
            default:
                return false;
        }
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
    }
};
