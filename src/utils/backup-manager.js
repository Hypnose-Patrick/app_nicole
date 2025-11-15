// LingoQuest - Backup Manager
// Handles automatic backups, data export/import, and user data management

const BackupManager = {
    BACKUP_KEY: 'lingoquest_last_backup',
    BACKUP_INTERVAL: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds

    // Initialize backup system
    init() {
        this.checkAutoBackup();
    },

    // Check if automatic backup is needed
    async checkAutoBackup() {
        const lastBackup = localStorage.getItem(this.BACKUP_KEY);
        const now = Date.now();

        if (!lastBackup || (now - parseInt(lastBackup)) > this.BACKUP_INTERVAL) {
            await this.createAutoBackup();
        }
    },

    // Create automatic backup
    async createAutoBackup() {
        try {
            await IndexedDBStorage.createBackup('auto');
            localStorage.setItem(this.BACKUP_KEY, Date.now().toString());
            console.log('✅ Automatic backup created');
        } catch (error) {
            console.error('❌ Error creating automatic backup:', error);
        }
    },

    // Export data as JSON file download
    async exportToFile() {
        try {
            const data = await IndexedDBStorage.exportData();
            const dataStr = JSON.stringify(data, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const filename = `lingoquest-backup-${new Date().toISOString().split('T')[0]}.json`;
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();

            URL.revokeObjectURL(url);

            this.showNotification('✅ Données exportées avec succès!', 'success');
            console.log('✅ Data exported to file:', filename);
        } catch (error) {
            console.error('❌ Error exporting data:', error);
            this.showNotification('❌ Erreur lors de l\'export', 'error');
        }
    },

    // Import data from JSON file
    async importFromFile() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';

            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (!file) {
                    reject('No file selected');
                    return;
                }

                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const data = JSON.parse(e.target.result);

                        // Validate data structure
                        if (!data.profile || !data.progress) {
                            throw new Error('Invalid backup file format');
                        }

                        // Confirm with user
                        const confirmed = confirm(
                            'Cette action va remplacer toutes vos données actuelles. Continuer?'
                        );

                        if (confirmed) {
                            // Create backup of current data before importing
                            await IndexedDBStorage.createBackup('pre-import');

                            // Import the data
                            const success = await IndexedDBStorage.importData(data);

                            if (success) {
                                this.showNotification('✅ Données importées avec succès!', 'success');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1500);
                                resolve(true);
                            } else {
                                throw new Error('Import failed');
                            }
                        } else {
                            resolve(false);
                        }
                    } catch (error) {
                        console.error('❌ Error importing data:', error);
                        this.showNotification('❌ Erreur lors de l\'import', 'error');
                        reject(error);
                    }
                };

                reader.readAsText(file);
            };

            input.click();
        });
    },

    // Show notification to user
    showNotification(message, type = 'info') {
        // Try to use existing toast system
        const toast = document.getElementById('xp-toast');
        if (toast) {
            const textElement = toast.querySelector('.xp-text');
            if (textElement) {
                textElement.textContent = message;
            } else {
                toast.innerHTML = `<span class="xp-text">${message}</span>`;
            }

            toast.classList.remove('hidden');
            toast.style.backgroundColor = type === 'success' ? '#4caf50' :
                                         type === 'error' ? '#f44336' : '#2196f3';

            setTimeout(() => {
                toast.classList.add('hidden');
                toast.style.backgroundColor = '';
            }, 3000);
        } else {
            // Fallback to alert
            alert(message);
        }
    },

    // Get backup statistics
    async getBackupStats() {
        try {
            const lastBackup = localStorage.getItem(this.BACKUP_KEY);
            const nextBackup = lastBackup ?
                new Date(parseInt(lastBackup) + this.BACKUP_INTERVAL) :
                new Date();

            return {
                lastBackup: lastBackup ? new Date(parseInt(lastBackup)) : null,
                nextBackup: nextBackup,
                daysUntilNext: Math.ceil((nextBackup - Date.now()) / (24 * 60 * 60 * 1000))
            };
        } catch (error) {
            console.error('Error getting backup stats:', error);
            return null;
        }
    },

    // Clear all data (with confirmation)
    async clearAllData() {
        const confirmed = confirm(
            '⚠️ ATTENTION: Cette action va supprimer toutes vos données de façon permanente. Continuer?'
        );

        if (confirmed) {
            const doubleConfirm = confirm(
                'Êtes-vous vraiment sûr? Cette action est irréversible!'
            );

            if (doubleConfirm) {
                try {
                    // Create final backup
                    await this.exportToFile();

                    // Clear IndexedDB
                    const request = indexedDB.deleteDatabase(IndexedDBStorage.DB_NAME);

                    request.onsuccess = () => {
                        // Clear LocalStorage
                        localStorage.clear();

                        this.showNotification('✅ Toutes les données ont été effacées', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    };

                    request.onerror = () => {
                        console.error('Error deleting database');
                        this.showNotification('❌ Erreur lors de la suppression', 'error');
                    };
                } catch (error) {
                    console.error('Error clearing data:', error);
                    this.showNotification('❌ Erreur lors de la suppression', 'error');
                }
            }
        }
    }
};
