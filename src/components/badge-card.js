// LingoQuest - Badge Card Component
// Renders a badge card in the badges view

function renderBadgeCard(badge) {
    const isUnlocked = StorageManager.isBadgeUnlocked(badge.id);
    const profile = StorageManager.getProfile();
    const progress = StorageManager.getProgress();

    // Get progress toward this badge
    const badgeProgress = BadgeSystem.getBadgeProgress(badge, profile, progress);

    const tierInfo = BADGE_TIERS[badge.tier];

    return `
        <div class="badge-card fade-in ${isUnlocked ? 'unlocked' : 'locked'} tier-${badge.tier}">
            <div class="badge-tier-label" style="background-color: ${tierInfo.color}20; color: ${tierInfo.color};">
                ${tierInfo.emoji} ${tierInfo.name}
            </div>

            <div class="badge-icon-display ${isUnlocked ? '' : 'grayscale'}">
                ${badge.icon}
            </div>

            <div class="badge-info">
                <h4 class="badge-name">${badge.name}</h4>
                <p class="badge-description">${badge.description}</p>
            </div>

            ${isUnlocked ? `
                <div class="badge-status unlocked">
                    <span class="status-icon">✓</span>
                    <span class="status-text">Unlocked</span>
                </div>
                <div class="badge-reward">
                    <span>+${badge.xpReward} XP earned</span>
                </div>
            ` : `
                <div class="badge-status locked">
                    <span class="status-icon">🔒</span>
                    <span class="status-text">Locked</span>
                </div>
                ${badgeProgress.target > 0 ? `
                    <div class="badge-progress-section">
                        <div class="progress-info">
                            <span>${badgeProgress.current} / ${badgeProgress.target}</span>
                            <span>${badgeProgress.percentage}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${badgeProgress.percentage}%; background-color: ${tierInfo.color};"></div>
                        </div>
                    </div>
                ` : ''}
                <div class="badge-reward">
                    <span>🎁 +${badge.xpReward} XP when unlocked</span>
                </div>
            `}
        </div>
    `;
}
