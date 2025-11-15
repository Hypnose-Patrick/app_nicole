// LingoQuest - Feedback Panel Component
// Renders AI-powered feedback after completing an exercise

function renderFeedbackPanel(analysis, metrics) {
    const { score, feedback, recommendations } = analysis;
    const { wpm, duration, pauses, transcript } = metrics;

    const scoreColor = score >= 90 ? '#10b981' : score >= 80 ? '#3b82f6' : score >= 70 ? '#f59e0b' : '#ef4444';
    const scoreLabel = score >= 90 ? 'Outstanding' : score >= 80 ? 'Excellent' : score >= 70 ? 'Good' : score >= 60 ? 'Fair' : 'Needs Work';

    return `
        <div class="feedback-panel fade-in">
            <!-- Score Section -->
            <div class="score-display" style="border-color: ${scoreColor}">
                <div class="score-circle" style="background: ${scoreColor}">
                    <div class="score-value">${score}</div>
                    <div class="score-max">/100</div>
                </div>
                <div class="score-label" style="color: ${scoreColor}">${scoreLabel}</div>
            </div>

            <!-- Metrics Section -->
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">⚡</div>
                    <div class="metric-value">${wpm}</div>
                    <div class="metric-label">WPM</div>
                    <div class="metric-target">Target: 120-150</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">⏱️</div>
                    <div class="metric-value">${duration}s</div>
                    <div class="metric-label">Duration</div>
                    <div class="metric-target">Target: 45-60s</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">⏸️</div>
                    <div class="metric-value">${pauses}</div>
                    <div class="metric-label">Pauses</div>
                    <div class="metric-target">Strategic pauses</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">📝</div>
                    <div class="metric-value">${transcript.split(' ').length}</div>
                    <div class="metric-label">Words</div>
                    <div class="metric-target">Clear delivery</div>
                </div>
            </div>

            <!-- Feedback Message -->
            <div class="feedback-message">
                <h3>📊 Performance Analysis</h3>
                <p>${feedback}</p>
            </div>

            <!-- Recommendations -->
            <div class="recommendations-section">
                <h3>💡 Key Recommendations</h3>
                <div class="recommendations-list">
                    ${recommendations.map((rec, index) => `
                        <div class="recommendation-item priority-${rec.priority}">
                            <div class="rec-number">${index + 1}</div>
                            <div class="rec-content">
                                <p>${rec.message}</p>
                                ${rec.priority === 'high' ? '<span class="priority-badge">High Priority</span>' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Transcript -->
            <div class="transcript-section">
                <h3>📝 Your Transcript</h3>
                <div class="transcript-box">
                    <p>${transcript || 'No transcript available'}</p>
                </div>
            </div>
        </div>
    `;
}
