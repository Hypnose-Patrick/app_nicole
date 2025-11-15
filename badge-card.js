// Badge Card Component
function createBadgeCard(badge) {
    const isUnlocked = StorageManager.isBadgeUnlocked(badge.id);
    
    return `
        <div class="card badge-card ${isUnlocked ? '' : 'locked'} ${badge.tier}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-tier ${badge.tier}">${badge.tier}</div>
            <h3 class="badge-name">${badge.name}</h3>
            <p class="badge-description">${badge.description}</p>
            ${isUnlocked ? 
                '<div class="badge-progress">✓ Unlocked</div>' : 
                '<div class="badge-progress">🔒 Locked</div>'
            }
        </div>
    `;
}
