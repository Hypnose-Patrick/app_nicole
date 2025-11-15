// LingoQuest - Lesson Card Component
// Renders a lesson card in module view

function renderLessonCard(lesson, moduleId) {
    const progress = StorageManager.getProgress();
    const lessonProgress = progress[moduleId]?.[lesson.id] || {};

    // Calculate completion
    const totalExercises = lesson.exercises.length;
    const completedExercises = Object.values(lessonProgress).filter(ex => ex.completed).length;
    const isCompleted = completedExercises === totalExercises && totalExercises > 0;
    const completionPercent = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

    return `
        <div class="lesson-card fade-in ${isCompleted ? 'completed' : ''}"
             onclick="window.LingoQuest.loadLessonView('${moduleId}', '${lesson.id}')">
            <div class="lesson-header">
                <div class="lesson-title">
                    <h4>${lesson.title}</h4>
                    ${isCompleted ? '<span class="completion-badge">✓ Completed</span>' : ''}
                </div>
                <div class="lesson-meta">
                    <span class="meta-item">⏱️ ${lesson.duration}</span>
                    <span class="meta-item">⭐ ${lesson.xpReward} XP</span>
                </div>
            </div>

            <p class="lesson-description text-secondary">${lesson.description}</p>

            <div class="progress-section">
                <div class="progress-info">
                    <span class="text-secondary">Exercises</span>
                    <span class="progress-percent">${completionPercent}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${completionPercent}%"></div>
                </div>
                <div class="exercise-count">
                    ${completedExercises} / ${totalExercises} exercises completed
                </div>
            </div>

            <div class="lesson-footer">
                <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}"
                        onclick="event.stopPropagation(); window.LingoQuest.loadLessonView('${moduleId}', '${lesson.id}')">
                    ${isCompleted ? 'Review Lesson' : 'Start Lesson'}
                </button>
            </div>
        </div>
    `;
}
