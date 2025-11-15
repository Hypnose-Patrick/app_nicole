// LingoQuest - Exercise View Page
// Interactive exercise page with vocal recording

function renderExerciseView(moduleId, lessonId, exerciseId) {
    const module = MODULES_DATA.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    const exercise = lesson?.exercises.find(e => e.id === exerciseId);

    if (!exercise) {
        return `<div class="error-page"><h2>Exercise not found</h2></div>`;
    }

    const isCompleted = StorageManager.isExerciseCompleted(moduleId, lessonId, exerciseId);
    const previousScore = StorageManager.getExerciseScore(moduleId, lessonId, exerciseId);

    return `
        <div class="exercise-view-page fade-in">
            <!-- Back Button -->
            <button class="back-btn" onclick="window.LingoQuest.loadLessonView('${moduleId}', '${lessonId}')">
                ← Back to ${lesson.title}
            </button>

            <!-- Exercise Header -->
            <div class="exercise-header-section card">
                <div class="exercise-breadcrumb">
                    <span onclick="window.LingoQuest.loadPage('dashboard')" class="breadcrumb-link">Dashboard</span>
                    <span class="breadcrumb-separator">›</span>
                    <span onclick="window.LingoQuest.loadModuleView('${moduleId}')" class="breadcrumb-link">${module.icon} ${module.title}</span>
                    <span class="breadcrumb-separator">›</span>
                    <span onclick="window.LingoQuest.loadLessonView('${moduleId}', '${lessonId}')" class="breadcrumb-link">${lesson.title}</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-current">${exercise.title}</span>
                </div>

                <div class="exercise-title-section">
                    <h1>🎤 ${exercise.title}</h1>
                    ${isCompleted ? `
                        <div class="previous-score-badge">
                            Previous Score: ${previousScore}/100
                        </div>
                    ` : ''}
                </div>

                <div class="exercise-meta-tags">
                    <span class="meta-tag">⭐ ${exercise.xpReward} XP</span>
                    <span class="meta-tag">⚡ Target: ${exercise.targetWPM} WPM</span>
                    <span class="meta-tag">⏱️ ${exercise.targetDuration}s duration</span>
                </div>
            </div>

            <!-- Exercise Scenario -->
            <div class="scenario-section card">
                <h2>📋 Scenario</h2>
                <div class="scenario-content">
                    ${exercise.scenario.split('\n').map(line => `<p>${line}</p>`).join('')}
                </div>

                ${exercise.keywords && exercise.keywords.length > 0 ? `
                    <div class="keywords-section">
                        <h3>Key Terms to Include:</h3>
                        <div class="keywords-list">
                            ${exercise.keywords.map(keyword => `
                                <span class="keyword-tag">${keyword}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- Vocal Recording Interface -->
            <div class="vocal-interface card" id="vocal-interface">
                <div class="recording-status" id="recording-status">
                    <div class="status-icon">🎤</div>
                    <div class="status-text">Ready to record</div>
                </div>

                <div class="recording-controls">
                    <button class="btn-record" id="start-recording" onclick="startRecording('${moduleId}', '${lessonId}', '${exerciseId}')">
                        <span class="record-icon">🎤</span>
                        <span class="record-text">Start Recording</span>
                    </button>

                    <button class="btn-stop hidden" id="stop-recording" onclick="stopRecording()">
                        <span class="stop-icon">⏹️</span>
                        <span class="stop-text">Stop Recording</span>
                    </button>
                </div>

                <div class="recording-timer hidden" id="recording-timer">
                    <span class="timer-label">Recording:</span>
                    <span class="timer-value" id="timer-value">0:00</span>
                </div>

                <div class="recording-instructions">
                    <p>💡 Click the microphone to start recording your response</p>
                    <p class="text-secondary">Speak clearly and naturally, as if you're addressing a board meeting</p>
                </div>

                <!-- Real-Time Feedback Panel (Hidden until recording starts) -->
                <div class="hidden" id="realtime-feedback-container">
                    <!-- Real-time feedback will be injected here -->
                </div>
            </div>

            <!-- Feedback Section (Hidden until exercise completed) -->
            <div class="feedback-container hidden" id="feedback-container">
                <!-- Feedback will be injected here -->
            </div>

            <!-- Action Buttons -->
            <div class="exercise-actions">
                <button class="btn btn-secondary" onclick="window.LingoQuest.loadLessonView('${moduleId}', '${lessonId}')">
                    Skip Exercise
                </button>
            </div>
        </div>
    `;
}

// Vocal recording state
let recognition = null;
let recordingTimer = null;
let realtimeFeedbackTimer = null;
let startTime = null;
let transcript = '';
let pauseCount = 0;
let wordCount = 0;
let currentExerciseKeywords = [];

// Start recording
function startRecording(moduleId, lessonId, exerciseId) {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Sorry, your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    transcript = '';
    pauseCount = 0;
    wordCount = 0;
    startTime = Date.now();

    // Get exercise keywords
    const module = MODULES_DATA.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    const exercise = lesson?.exercises.find(e => e.id === exerciseId);
    currentExerciseKeywords = exercise?.keywords || [];

    // UI updates
    document.getElementById('start-recording').classList.add('hidden');
    document.getElementById('stop-recording').classList.remove('hidden');
    document.getElementById('recording-timer').classList.remove('hidden');
    document.getElementById('recording-status').innerHTML = `
        <div class="status-icon recording">🔴</div>
        <div class="status-text">Recording in progress...</div>
    `;

    // Show and initialize real-time feedback panel
    const realtimeContainer = document.getElementById('realtime-feedback-container');
    if (realtimeContainer) {
        realtimeContainer.innerHTML = RealtimeFeedback.render();
        realtimeContainer.classList.remove('hidden');
        RealtimeFeedback.reset();
    }

    // Start timer
    recordingTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer-value').textContent =
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 100);

    // Start real-time feedback updates (every 500ms)
    realtimeFeedbackTimer = setInterval(() => {
        if (transcript) {
            RealtimeFeedback.updateMetrics(transcript, startTime, currentExerciseKeywords);
        }
    }, 500);

    // Recognition events
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPiece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcriptPiece + ' ';
            } else {
                interimTranscript += transcriptPiece;
            }
        }

        if (finalTranscript) {
            transcript += finalTranscript;
            wordCount = transcript.trim().split(/\s+/).length;

            // Update real-time feedback immediately when we get final transcript
            RealtimeFeedback.updateMetrics(transcript, startTime, currentExerciseKeywords);
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
            pauseCount++;
        }
    };

    recognition.start();

    // Store current exercise context
    window.currentExercise = { moduleId, lessonId, exerciseId };
}

// Stop recording and analyze
function stopRecording() {
    if (!recognition) return;

    recognition.stop();
    clearInterval(recordingTimer);
    clearInterval(realtimeFeedbackTimer);

    // Hide real-time feedback panel
    const realtimeContainer = document.getElementById('realtime-feedback-container');
    if (realtimeContainer) {
        realtimeContainer.classList.add('hidden');
    }

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const wpm = Math.round((wordCount / duration) * 60);

    // Analyze speech using Dilts Engine
    const analysis = DiltsEngine.analyzeSpeech(transcript, {
        wpm,
        duration,
        pauses: pauseCount,
        keywords: transcript.toLowerCase().split(/\s+/)
    });

    // Save completion
    const { moduleId, lessonId, exerciseId } = window.currentExercise;
    StorageManager.saveExerciseCompletion(moduleId, lessonId, exerciseId, analysis.score);

    // Update profile stats
    const profile = StorageManager.getProfile();
    profile.vocalExercisesCompleted++;
    if (analysis.score >= 95) {
        profile.perfectScores++;
    }
    if (!profile.maxWPM || wpm > profile.maxWPM) {
        profile.maxWPM = wpm;
    }

    // Calculate average score
    const totalScores = profile.totalScores || 0;
    const scoreCount = profile.vocalExercisesCompleted;
    profile.averageScore = Math.round((totalScores + analysis.score) / scoreCount);
    profile.totalScores = totalScores + analysis.score;

    StorageManager.saveProfile(profile);

    // Award XP
    const exercise = MODULES_DATA
        .find(m => m.id === moduleId).lessons
        .find(l => l.id === lessonId).exercises
        .find(e => e.id === exerciseId);

    const xpEarned = Math.round(exercise.xpReward * (analysis.score / 100));
    const result = StorageManager.addXP(xpEarned);

    // Show XP toast
    showXPToast(xpEarned);

    // Check for new badges
    const newBadges = BadgeSystem.checkBadges(StorageManager.getProfile(), StorageManager.getProgress());
    if (newBadges.length > 0) {
        setTimeout(() => {
            newBadges.forEach((badge, index) => {
                setTimeout(() => {
                    BadgeSystem.showBadgeModal(badge);
                }, index * 500);
            });
        }, 1000);
    }

    // Display feedback
    displayFeedback(analysis, { wpm, duration, pauses: pauseCount, transcript });

    // Update UI
    document.getElementById('stop-recording').classList.add('hidden');
    document.getElementById('recording-timer').classList.add('hidden');
    document.getElementById('recording-status').innerHTML = `
        <div class="status-icon">✓</div>
        <div class="status-text">Recording completed!</div>
    `;
}

// Display feedback
function displayFeedback(analysis, metrics) {
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.innerHTML = renderFeedbackPanel(analysis, metrics);
    feedbackContainer.classList.remove('hidden');

    // Scroll to feedback
    feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
