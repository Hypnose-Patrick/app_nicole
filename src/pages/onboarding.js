// LingoQuest - Onboarding Screen
// Welcome screen for first-time users to enter their name

function renderOnboarding() {
    return `
        <div class="onboarding-screen" id="onboarding-screen">
            <div class="onboarding-content">
                <div class="onboarding-icon">🎤</div>
                <h1>Welcome to LingoQuest</h1>
                <p class="subtitle">Master professional English for banking executives</p>

                <form class="onboarding-form" id="onboarding-form" onsubmit="handleOnboardingSubmit(event)">
                    <div class="onboarding-input-group">
                        <label for="user-name-input">What's your name?</label>
                        <input
                            type="text"
                            id="user-name-input"
                            placeholder="Enter your name"
                            autocomplete="name"
                            autofocus
                            required
                            minlength="2"
                            maxlength="50"
                        />
                        <div class="input-hint">This will help personalize your learning experience</div>
                        <div class="onboarding-error" id="name-error">Please enter a valid name (2-50 characters)</div>
                    </div>

                    <button type="submit" class="onboarding-button" id="start-button">
                        Start Your Journey 🚀
                    </button>
                </form>

                <div class="onboarding-features">
                    <h3>What you'll get:</h3>
                    <ul>
                        <li>AI-powered vocal training</li>
                        <li>Personalized learning path</li>
                        <li>Track your progress & achievements</li>
                        <li>Banking-specific vocabulary</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Handle onboarding form submission
async function handleOnboardingSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('user-name-input');
    const nameError = document.getElementById('name-error');
    const startButton = document.getElementById('start-button');
    const name = nameInput.value.trim();

    // Validate name
    if (name.length < 2 || name.length > 50) {
        nameError.classList.add('show');
        nameInput.focus();
        return;
    }

    // Hide error if shown
    nameError.classList.remove('show');

    // Disable button while processing
    startButton.disabled = true;
    startButton.textContent = 'Setting up...';

    try {
        // Create profile with user's name
        const profile = {
            name: name,
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
            createdAt: new Date().toISOString(),
            onboardingCompleted: true
        };

        // Save profile to IndexedDB
        await IndexedDBStorage.saveProfile(profile);

        // Update app profile cache
        if (window.LingoQuest) {
            window.LingoQuest.profile = profile;
        }

        // Animate out the onboarding screen
        const onboardingScreen = document.getElementById('onboarding-screen');
        onboardingScreen.style.animation = 'fadeOut 0.5s ease-in-out';

        // Wait for animation to complete
        setTimeout(async () => {
            onboardingScreen.remove();

            // Complete onboarding initialization
            await window.LingoQuest.completeOnboarding();

            // Update profile UI
            document.getElementById('user-name').textContent = profile.name;
            document.getElementById('user-level').textContent = `Level ${profile.level}`;

            // Show welcome notification
            BackupManager.showNotification(`Welcome, ${profile.name}! 🎉`, 'success');

            // Navigate to progress page to see modules
            window.LingoQuest.loadPage('progress');
        }, 500);

    } catch (error) {
        console.error('Error during onboarding:', error);
        nameError.textContent = 'An error occurred. Please try again.';
        nameError.classList.add('show');
        startButton.disabled = false;
        startButton.textContent = 'Start Your Journey 🚀';
    }
}

// Add fade out animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
