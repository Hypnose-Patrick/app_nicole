// LingoQuest - Exercise Card Component
// Renders an exercise card in lesson view

function renderExerciseCard(exercise, moduleId, lessonId) {
    const isCompleted = StorageManager.isExerciseCompleted(moduleId, lessonId, exercise.id);
    const score = StorageManager.getExerciseScore(moduleId, lessonId, exercise.id);

    const typeIcons = {
        'vocal': '🎤',
        'quiz': '📝',
        'reading': '📖',
        'listening': '🎧'
    };

    const icon = typeIcons[exercise.type] || '📚';

    return `
        <div class="exercise-card fade-in ${isCompleted ? 'completed' : ''}"
             onclick="window.LingoQuest.loadExerciseView('${moduleId}', '${lessonId}', '${exercise.id}')">
            <div class="exercise-header">
                <div class="exercise-icon">${icon}</div>
                <div class="exercise-info">
                    <h5>${exercise.title}</h5>
                    <div class="exercise-meta">
                        <span class="meta-badge">${exercise.type}</span>
                        <span class="xp-reward">⭐ ${exercise.xpReward} XP</span>
                    </div>
                </div>
            </div>

            ${isCompleted ? `
                <div class="exercise-completion">
                    <div class="completion-status">
                        <span class="completion-icon">✓</span>
                        <span class="completion-text">Completed</span>
                    </div>
                    <div class="exercise-score">
                        <span class="score-label">Score:</span>
                        <span class="score-value">${score}/100</span>
                    </div>
                </div>
            ` : `
                <div class="exercise-status">
                    <span class="status-badge">Not Started</span>
                </div>
            `}

            <div class="exercise-footer">
                <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}"
                        onclick="event.stopPropagation(); window.LingoQuest.loadExerciseView('${moduleId}', '${lessonId}', '${exercise.id}')">
                    ${isCompleted ? 'Retry Exercise' : 'Start Exercise'}
                </button>
            </div>
        </div>
    `;
}
