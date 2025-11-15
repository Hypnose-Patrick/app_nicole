// LingoQuest - Settings View
// Page for user settings and data management

function renderSettingsView() {
    const profile = StorageManager.getProfile();

    return `
        <div class="page-container settings-page">
            <div class="page-header">
                <h1>⚙️ Settings</h1>
                <p>Manage your account and data</p>
            </div>

            <!-- Profile Section -->
            <section class="settings-section">
                <h2>👤 Profile</h2>
                <div class="settings-card">
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Name</strong>
                            <p>${profile.name}</p>
                        </div>
                        <button class="btn btn-secondary" onclick="changeProfileName()">
                            Change
                        </button>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Account Created</strong>
                            <p>${new Date(profile.createdAt).toLocaleDateString('fr-FR')}</p>
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Current Level</strong>
                            <p>Level ${profile.level} (${profile.totalXP} XP)</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Data Management Section -->
            <section class="settings-section">
                <h2>💾 Data Management</h2>
                <div class="settings-card">
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Export Data</strong>
                            <p>Download your progress as a JSON file</p>
                        </div>
                        <button class="btn btn-primary" onclick="exportData()">
                            📥 Export
                        </button>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Import Data</strong>
                            <p>Restore your progress from a backup file</p>
                        </div>
                        <button class="btn btn-secondary" onclick="importData()">
                            📤 Import
                        </button>
                    </div>
                    <div class="setting-item" id="backup-status">
                        <div class="setting-info">
                            <strong>Automatic Backup</strong>
                            <p>Loading backup status...</p>
                        </div>
                        <button class="btn btn-secondary" onclick="createManualBackup()">
                            💾 Backup Now
                        </button>
                    </div>
                </div>
            </section>

            <!-- Storage Information -->
            <section class="settings-section">
                <h2>📊 Storage Information</h2>
                <div class="settings-card">
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Storage Type</strong>
                            <p>IndexedDB (Persistent)</p>
                        </div>
                    </div>
                    <div class="setting-item" id="storage-stats">
                        <div class="setting-info">
                            <strong>Data Size</strong>
                            <p>Calculating...</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Danger Zone -->
            <section class="settings-section danger-zone">
                <h2>⚠️ Danger Zone</h2>
                <div class="settings-card">
                    <div class="setting-item">
                        <div class="setting-info">
                            <strong>Clear All Data</strong>
                            <p style="color: var(--color-error);">
                                This will permanently delete all your progress, badges, and settings.
                                A backup file will be downloaded automatically.
                            </p>
                        </div>
                        <button class="btn btn-danger" onclick="clearAllData()">
                            🗑️ Clear Data
                        </button>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Change profile name
async function changeProfileName() {
    const profile = await IndexedDBStorage.getProfile();
    const newName = prompt('Enter your new name:', profile.name);

    if (newName && newName.trim() !== '') {
        profile.name = newName.trim();
        await IndexedDBStorage.saveProfile(profile);

        // Update UI
        document.getElementById('user-name').textContent = profile.name;
        BackupManager.showNotification('✅ Name updated successfully!', 'success');

        // Reload settings page
        window.LingoQuest.loadPage('settings');
    }
}

// Export data
async function exportData() {
    await BackupManager.exportToFile();
}

// Import data
async function importData() {
    await BackupManager.importFromFile();
}

// Create manual backup
async function createManualBackup() {
    try {
        await IndexedDBStorage.createBackup('manual');
        BackupManager.showNotification('✅ Backup created successfully!', 'success');

        // Refresh backup status
        updateBackupStatus();
    } catch (error) {
        console.error('Error creating backup:', error);
        BackupManager.showNotification('❌ Error creating backup', 'error');
    }
}

// Clear all data
async function clearAllData() {
    await BackupManager.clearAllData();
}

// Update backup status
async function updateBackupStatus() {
    const stats = await BackupManager.getBackupStats();
    const statusElement = document.querySelector('#backup-status .setting-info p');

    if (stats && stats.lastBackup) {
        const lastBackupDate = stats.lastBackup.toLocaleDateString('fr-FR');
        const daysUntilNext = stats.daysUntilNext;

        statusElement.innerHTML = `
            Last backup: ${lastBackupDate}<br>
            Next automatic backup in ${daysUntilNext} day(s)
        `;
    } else {
        statusElement.textContent = 'No backup yet. Click "Backup Now" to create one.';
    }
}

// Calculate storage size
async function calculateStorageSize() {
    try {
        const data = await IndexedDBStorage.exportData();
        const dataStr = JSON.stringify(data);
        const sizeInBytes = new Blob([dataStr]).size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);

        const statsElement = document.querySelector('#storage-stats .setting-info p');
        statsElement.textContent = `${sizeInKB} KB`;
    } catch (error) {
        console.error('Error calculating storage size:', error);
    }
}

// Initialize settings page when loaded
document.addEventListener('DOMContentLoaded', () => {
    // Listen for settings page loads
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const settingsPage = document.querySelector('.settings-page');
                if (settingsPage) {
                    updateBackupStatus();
                    calculateStorageSize();
                }
            }
        });
    });

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        observer.observe(mainContent, { childList: true });
    }
});
