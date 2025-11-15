// LingoQuest - Real-time Feedback Component
// Provides immediate visual and vocal feedback during exercise recording

const RealtimeFeedback = {
    // Speech synthesis instance
    synth: window.speechSynthesis,
    lastFeedbackTime: 0,
    feedbackCooldown: 8000, // 8 seconds between vocal feedbacks

    // Render the real-time feedback panel
    render() {
        return `
            <div class="realtime-feedback-panel" id="realtime-feedback">
                <!-- Live Metrics -->
                <div class="live-metrics-grid">
                    <div class="live-metric">
                        <div class="live-metric-icon">⚡</div>
                        <div class="live-metric-value" id="live-wpm">0</div>
                        <div class="live-metric-label">WPM</div>
                        <div class="live-metric-status" id="wpm-status"></div>
                    </div>

                    <div class="live-metric">
                        <div class="live-metric-icon">⏱️</div>
                        <div class="live-metric-value" id="live-duration">0s</div>
                        <div class="live-metric-label">Duration</div>
                        <div class="live-metric-status" id="duration-status"></div>
                    </div>

                    <div class="live-metric">
                        <div class="live-metric-icon">📝</div>
                        <div class="live-metric-value" id="live-words">0</div>
                        <div class="live-metric-label">Words</div>
                        <div class="live-metric-status" id="words-status"></div>
                    </div>

                    <div class="live-metric">
                        <div class="live-metric-icon">🎯</div>
                        <div class="live-metric-value" id="live-keywords">0</div>
                        <div class="live-metric-label">Key Terms</div>
                        <div class="live-metric-status" id="keywords-status"></div>
                    </div>
                </div>

                <!-- Live Transcript with Highlights -->
                <div class="live-transcript-section">
                    <h4>📝 Live Transcript</h4>
                    <div class="live-transcript-box" id="live-transcript">
                        <p class="text-secondary">Start speaking to see your words appear here...</p>
                    </div>
                </div>

                <!-- Instant Feedback Messages -->
                <div class="instant-feedback-messages" id="instant-feedback-messages">
                    <!-- Feedback messages appear here -->
                </div>

                <!-- Vocal Feedback Toggle -->
                <div class="vocal-feedback-controls">
                    <label class="toggle-switch">
                        <input type="checkbox" id="vocal-feedback-toggle" checked>
                        <span class="toggle-slider"></span>
                    </label>
                    <span class="toggle-label">🔊 Vocal Feedback</span>
                </div>
            </div>
        `;
    },

    // Update live metrics during recording
    updateMetrics(transcript, startTime, keywords = []) {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        const wordCount = transcript.trim().split(/\s+/).filter(w => w.length > 0).length;
        const wpm = elapsedSeconds > 0 ? Math.round((wordCount / elapsedSeconds) * 60) : 0;

        // Update WPM
        const wpmEl = document.getElementById('live-wpm');
        const wpmStatusEl = document.getElementById('wpm-status');
        if (wpmEl) {
            wpmEl.textContent = wpm;
            wpmStatusEl.textContent = this.getWPMStatus(wpm);
            wpmStatusEl.className = 'live-metric-status ' + this.getWPMClass(wpm);
        }

        // Update Duration
        const durationEl = document.getElementById('live-duration');
        const durationStatusEl = document.getElementById('duration-status');
        if (durationEl) {
            durationEl.textContent = elapsedSeconds + 's';
            durationStatusEl.textContent = this.getDurationStatus(elapsedSeconds);
            durationStatusEl.className = 'live-metric-status ' + this.getDurationClass(elapsedSeconds);
        }

        // Update Word Count
        const wordsEl = document.getElementById('live-words');
        const wordsStatusEl = document.getElementById('words-status');
        if (wordsEl) {
            wordsEl.textContent = wordCount;
            wordsStatusEl.textContent = wordCount > 50 ? '✓ Good' : 'Keep going';
            wordsStatusEl.className = 'live-metric-status ' + (wordCount > 50 ? 'status-good' : 'status-neutral');
        }

        // Update Keywords
        const keywordsFound = this.countKeywords(transcript, keywords);
        const keywordsEl = document.getElementById('live-keywords');
        const keywordsStatusEl = document.getElementById('keywords-status');
        if (keywordsEl) {
            keywordsEl.textContent = keywordsFound;
            keywordsStatusEl.textContent = this.getKeywordsStatus(keywordsFound);
            keywordsStatusEl.className = 'live-metric-status ' + this.getKeywordsClass(keywordsFound);
        }

        // Update live transcript with keyword highlights
        this.updateTranscript(transcript, keywords);

        // Provide vocal feedback at intervals
        this.provideVocalFeedback(wpm, elapsedSeconds, keywordsFound, currentTime);

        // Show instant written feedback
        this.showInstantFeedback(wpm, elapsedSeconds, keywordsFound, wordCount);
    },

    // Count keywords found in transcript
    countKeywords(transcript, keywords) {
        if (!keywords || keywords.length === 0) return 0;

        const transcriptLower = transcript.toLowerCase();
        const technicalTerms = ['ebitda', 'roe', 'yoy', 'basel', 'capital', 'risk',
                                'compliance', 'regulatory', 'liquidity', 'npl',
                                'provision', 'tier 1', 'cet1'];

        const allKeywords = [...keywords.map(k => k.toLowerCase()), ...technicalTerms];
        return allKeywords.filter(keyword => transcriptLower.includes(keyword)).length;
    },

    // Update live transcript with keyword highlights
    updateTranscript(transcript, keywords) {
        const transcriptEl = document.getElementById('live-transcript');
        if (!transcriptEl || !transcript) return;

        let highlightedText = transcript;

        // Highlight keywords
        if (keywords && keywords.length > 0) {
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
                highlightedText = highlightedText.replace(regex, '<span class="keyword-highlight">$1</span>');
            });
        }

        // Highlight technical terms
        const technicalTerms = ['EBITDA', 'ROE', 'YoY', 'Basel', 'capital', 'risk',
                                'compliance', 'regulatory', 'liquidity', 'NPL'];
        technicalTerms.forEach(term => {
            const regex = new RegExp(`\\b(${term})\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="technical-highlight">$1</span>');
        });

        transcriptEl.innerHTML = `<p>${highlightedText}</p>`;
    },

    // Get WPM status
    getWPMStatus(wpm) {
        if (wpm >= 120 && wpm <= 150) return '✓ Perfect';
        if (wpm < 120) return '↑ Speed up';
        return '↓ Slow down';
    },

    getWPMClass(wpm) {
        if (wpm >= 120 && wpm <= 150) return 'status-good';
        if (wpm < 100 || wpm > 170) return 'status-warning';
        return 'status-ok';
    },

    // Get Duration status
    getDurationStatus(seconds) {
        if (seconds >= 45 && seconds <= 60) return '✓ Optimal';
        if (seconds < 30) return 'Continue';
        if (seconds > 90) return 'Wrap up';
        return 'On track';
    },

    getDurationClass(seconds) {
        if (seconds >= 45 && seconds <= 60) return 'status-good';
        if (seconds > 90) return 'status-warning';
        return 'status-neutral';
    },

    // Get Keywords status
    getKeywordsStatus(count) {
        if (count >= 3) return '✓ Excellent';
        if (count >= 1) return 'Add more';
        return 'Use key terms';
    },

    getKeywordsClass(count) {
        if (count >= 3) return 'status-good';
        if (count >= 1) return 'status-ok';
        return 'status-warning';
    },

    // Provide vocal feedback at intervals
    provideVocalFeedback(wpm, duration, keywordsFound, currentTime) {
        // Check if vocal feedback is enabled
        const vocalToggle = document.getElementById('vocal-feedback-toggle');
        if (!vocalToggle || !vocalToggle.checked) return;

        // Cooldown check
        if (currentTime - this.lastFeedbackTime < this.feedbackCooldown) return;

        let message = '';

        // Provide feedback based on context
        if (duration >= 20 && wpm < 100) {
            message = 'Speed up your pace';
            this.lastFeedbackTime = currentTime;
        } else if (duration >= 20 && wpm > 170) {
            message = 'Slow down for clarity';
            this.lastFeedbackTime = currentTime;
        } else if (duration >= 30 && keywordsFound === 0) {
            message = 'Use technical terms';
            this.lastFeedbackTime = currentTime;
        } else if (duration >= 45 && duration <= 50 && wpm >= 120 && wpm <= 150) {
            message = 'Excellent pace, keep going';
            this.lastFeedbackTime = currentTime;
        }

        if (message) {
            this.speak(message);
        }
    },

    // Show instant written feedback
    showInstantFeedback(wpm, duration, keywordsFound, wordCount) {
        const messagesEl = document.getElementById('instant-feedback-messages');
        if (!messagesEl) return;

        let feedback = [];

        // WPM feedback
        if (duration >= 15) {
            if (wpm >= 120 && wpm <= 150) {
                feedback.push({ type: 'success', message: '✓ Perfect pace for executives' });
            } else if (wpm < 100) {
                feedback.push({ type: 'warning', message: '⚡ Increase your speaking pace' });
            } else if (wpm > 170) {
                feedback.push({ type: 'warning', message: '🐢 Slow down for better clarity' });
            }
        }

        // Keywords feedback
        if (duration >= 20) {
            if (keywordsFound >= 3) {
                feedback.push({ type: 'success', message: '✓ Strong technical vocabulary' });
            } else if (keywordsFound === 0) {
                feedback.push({ type: 'info', message: '💡 Include key financial terms' });
            }
        }

        // Duration feedback
        if (duration >= 60 && duration <= 70) {
            feedback.push({ type: 'info', message: '⏱️ Approaching optimal duration' });
        } else if (duration > 90) {
            feedback.push({ type: 'warning', message: '⏱️ Consider wrapping up soon' });
        }

        // Display feedback (keep last 2 messages)
        const recentFeedback = feedback.slice(-2);
        messagesEl.innerHTML = recentFeedback.map(f => `
            <div class="instant-feedback-item feedback-${f.type} fade-in">
                ${f.message}
            </div>
        `).join('');
    },

    // Text-to-Speech function
    speak(text) {
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        utterance.lang = 'en-US';

        // Use a clear, professional voice if available
        const voices = this.synth.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.name.includes('Google') ||
            voice.name.includes('Microsoft') ||
            voice.name.includes('Samantha')
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        this.synth.speak(utterance);
    },

    // Reset feedback state
    reset() {
        this.lastFeedbackTime = 0;
        this.synth.cancel();

        // Reset UI
        const transcriptEl = document.getElementById('live-transcript');
        if (transcriptEl) {
            transcriptEl.innerHTML = '<p class="text-secondary">Start speaking to see your words appear here...</p>';
        }

        const messagesEl = document.getElementById('instant-feedback-messages');
        if (messagesEl) {
            messagesEl.innerHTML = '';
        }
    }
};
