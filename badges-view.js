// Badges View Page
function renderBadgesView() {
    const profile = StorageManager.getProfile();
    const unlockedCount = StorageManager.getUnlockedBadges().length;
    const totalBadges = BADGES_DATA.length;
    
    const badgesByTier = {
        bronze: BADGES_DATA.filter(b => b.tier === 'bronze'),
        silver: BADGES_DATA.filter(b => b.tier === 'silver'),
        gold: BADGES_DATA.filter(b => b.tier === 'gold'),
        platinum: BADGES_DATA.filter(b => b.tier === 'platinum'),
        diamond: BADGES_DATA.filter(b => b.tier === 'diamond')
    };
    
    return \`
        <div class="fade-in">
            <div class="badge-stats">
                <div class="badge-stat">
                    <div class="badge-stat-value">\${unlockedCount}/\${totalBadges}</div>
                    <div class="badge-stat-label">Badges Unlocked</div>
                </div>
                <div class="badge-stat">
                    <div class="badge-stat-value">\${profile.totalXP}</div>
                    <div class="badge-stat-label">Total XP</div>
                </div>
                <div class="badge-stat">
                    <div class="badge-stat-value">\${profile.level}</div>
                    <div class="badge-stat-label">Current Level</div>
                </div>
            </div>
            
            \${Object.entries(badgesByTier).map(([tier, badges]) => \`
                <div class="badge-tier-section tier-\${tier}">
                    <h3><span class="tier-icon">\${getTierIcon(tier)}</span> \${tier.toUpperCase()} TIER</h3>
                    <div class="badge-grid">
                        \${badges.map(badge => createBadgeCard(badge)).join('')}
                    </div>
                </div>
            \`).join('')}
        </div>
    \`;
}

function getTierIcon(tier) {
    const icons = {
        bronze: '🥉',
        silver: '🥈',
        gold: '🥇',
        platinum: '💿',
        diamond: '💎'
    };
    return icons[tier] || '🏅';
}
