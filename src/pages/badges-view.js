// LingoQuest - Badges View Page
// Display all badges organized by tier

function renderBadgesView() {
    const profile = StorageManager.getProfile();
    const unlockedBadges = StorageManager.getUnlockedBadges();
    const totalBadges = Object.keys(BADGES_DATA).length;
    const unlockedCount = unlockedBadges.length;

    // Group badges by tier
    const badgesByTier = {
        bronze: [],
        silver: [],
        gold: [],
        platinum: [],
        diamond: []
    };

    Object.values(BADGES_DATA).forEach(badge => {
        badgesByTier[badge.tier].push(badge);
    });

    const completionPercent = Math.round((unlockedCount / totalBadges) * 100);

    return `
        <div class="badges-view-page fade-in">
            <div class="page-header">
                <h1>🏆 Badge Collection</h1>
                <p class="text-secondary">Unlock badges by completing challenges and milestones</p>
            </div>

            <!-- Badges Overview -->
            <div class="badges-overview card">
                <div class="overview-stats">
                    <div class="overview-stat highlight">
                        <div class="stat-icon">🏅</div>
                        <div class="stat-value">${unlockedCount}/${totalBadges}</div>
                        <div class="stat-label">Badges Unlocked</div>
                    </div>

                    <div class="overview-stat">
                        <div class="stat-icon">📊</div>
                        <div class="stat-value">${completionPercent}%</div>
                        <div class="stat-label">Collection Complete</div>
                    </div>

                    <div class="overview-stat">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-value">${profile.level}</div>
                        <div class="stat-label">Current Level</div>
                    </div>

                    <div class="overview-stat">
                        <div class="stat-icon">💎</div>
                        <div class="stat-value">${profile.totalXP}</div>
                        <div class="stat-label">Total XP</div>
                    </div>
                </div>

                <div class="collection-progress">
                    <div class="progress-header">
                        <span>Collection Progress</span>
                        <span>${completionPercent}%</span>
                    </div>
                    <div class="progress-bar-container large">
                        <div class="progress-bar-fill" style="width: ${completionPercent}%"></div>
                    </div>
                </div>
            </div>

            <!-- Tier Breakdown -->
            <div class="tier-breakdown">
                ${Object.entries(badgesByTier).map(([tier, badges]) => {
                    const tierInfo = BADGE_TIERS[tier];
                    const tierUnlocked = badges.filter(b => unlockedBadges.includes(b.id)).length;
                    const tierTotal = badges.length;
                    const tierPercent = Math.round((tierUnlocked / tierTotal) * 100);

                    return `
                        <div class="tier-stat-card" style="border-left: 4px solid ${tierInfo.color};">
                            <div class="tier-stat-header">
                                <span class="tier-emoji">${tierInfo.emoji}</span>
                                <span class="tier-name">${tierInfo.name}</span>
                            </div>
                            <div class="tier-stat-value">${tierUnlocked}/${tierTotal}</div>
                            <div class="tier-stat-bar">
                                <div class="tier-stat-fill" style="width: ${tierPercent}%; background-color: ${tierInfo.color};"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- Badge Sections by Tier -->
            ${Object.entries(badgesByTier).map(([tier, badges]) => {
                const tierInfo = BADGE_TIERS[tier];
                return `
                    <div class="badge-tier-section">
                        <div class="tier-header" style="border-bottom: 3px solid ${tierInfo.color};">
                            <h2>
                                <span class="tier-icon">${tierInfo.emoji}</span>
                                ${tierInfo.name} Tier
                            </h2>
                            <span class="tier-count">${badges.filter(b => unlockedBadges.includes(b.id)).length}/${badges.length}</span>
                        </div>

                        <div class="badges-grid">
                            ${badges.map(badge => renderBadgeCard(badge)).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}
