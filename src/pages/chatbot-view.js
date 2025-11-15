// LingoQuest - Chatbot View Page
// AI-powered conversational practice for natural dialogue

function renderChatbotView() {
    return `
        <div class="chatbot-view-page fade-in">
            <!-- Header -->
            <div class="chatbot-header card">
                <div class="chatbot-title-section">
                    <h1>💬 AI Conversation Partner</h1>
                    <p class="chatbot-subtitle">Practice natural English conversations in banking and finance context</p>
                </div>

                <div class="chatbot-stats">
                    <div class="stat-item">
                        <span class="stat-icon">🎤</span>
                        <div class="stat-content">
                            <div class="stat-value" id="chat-session-count">0</div>
                            <div class="stat-label">Conversations</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">⏱️</span>
                        <div class="stat-content">
                            <div class="stat-value" id="chat-total-time">0</div>
                            <div class="stat-label">Minutes</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conversation Topics -->
            <div class="conversation-topics card">
                <h2>📋 Suggested Topics</h2>
                <p class="text-secondary">Choose a topic or speak freely about anything</p>
                <div class="topics-grid">
                    <button class="topic-btn" onclick="selectTopic('board-meeting')">
                        <span class="topic-icon">👔</span>
                        <span class="topic-title">Board Meetings</span>
                    </button>
                    <button class="topic-btn" onclick="selectTopic('risk-discussion')">
                        <span class="topic-icon">⚖️</span>
                        <span class="topic-title">Risk Management</span>
                    </button>
                    <button class="topic-btn" onclick="selectTopic('market-trends')">
                        <span class="topic-icon">📈</span>
                        <span class="topic-title">Market Trends</span>
                    </button>
                    <button class="topic-btn" onclick="selectTopic('regulatory')">
                        <span class="topic-icon">📋</span>
                        <span class="topic-title">Regulatory Topics</span>
                    </button>
                    <button class="topic-btn" onclick="selectTopic('strategy')">
                        <span class="topic-icon">🎯</span>
                        <span class="topic-title">Strategy Discussion</span>
                    </button>
                    <button class="topic-btn" onclick="selectTopic('networking')">
                        <span class="topic-icon">🤝</span>
                        <span class="topic-title">Professional Networking</span>
                    </button>
                </div>
            </div>

            <!-- Conversation Area -->
            <div class="conversation-area card">
                <div class="conversation-header">
                    <h2>💬 Conversation</h2>
                    <button class="btn btn-secondary btn-sm" onclick="clearConversation()">
                        Clear Chat
                    </button>
                </div>

                <!-- Messages Container -->
                <div class="messages-container" id="messages-container">
                    <div class="welcome-message">
                        <div class="ai-avatar">🤖</div>
                        <div class="message ai-message">
                            <p>Hello! I'm your AI conversation partner. I'm here to help you practice professional English in banking and finance contexts.</p>
                            <p>You can speak about board meetings, risk management, market analysis, or any professional topic. Just click the microphone and start speaking!</p>
                            <p>Feel free to choose a suggested topic above, or speak freely about whatever you'd like to discuss.</p>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="chat-input-area">
                    <div class="recording-status-indicator" id="chat-recording-status">
                        <span class="status-dot"></span>
                        <span class="status-text">Ready</span>
                    </div>

                    <div class="chat-controls">
                        <button class="btn-chat-record" id="chat-record-btn" onclick="startChatRecording()">
                            <span class="record-icon">🎤</span>
                            <span class="record-text">Hold to Speak</span>
                        </button>

                        <button class="btn-chat-stop hidden" id="chat-stop-btn" onclick="stopChatRecording()">
                            <span class="stop-icon">⏹️</span>
                            <span class="stop-text">Stop Recording</span>
                        </button>
                    </div>

                    <div class="chat-tips">
                        <p>💡 <strong>Tip:</strong> Speak naturally as if you're having a real conversation with a colleague</p>
                    </div>
                </div>
            </div>

            <!-- Performance Metrics -->
            <div class="session-metrics card" id="session-metrics">
                <h3>📊 Session Metrics</h3>
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="metric-label">Speaking Time</div>
                        <div class="metric-value" id="metric-speaking-time">0:00</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">Words Spoken</div>
                        <div class="metric-value" id="metric-words">0</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">Avg. WPM</div>
                        <div class="metric-value" id="metric-wpm">0</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">Exchanges</div>
                        <div class="metric-value" id="metric-exchanges">0</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Chatbot state
let chatRecognition = null;
let chatMessages = [];
let currentTopic = null;
let sessionMetrics = {
    speakingTime: 0,
    wordsSpoken: 0,
    exchanges: 0,
    startTime: null
};

// Topic prompts for AI context
const topicPrompts = {
    'board-meeting': 'Let\'s discuss board meeting topics like governance, strategic decisions, and executive reporting.',
    'risk-discussion': 'Let\'s talk about risk management, including credit risk, market risk, operational risk, and compliance.',
    'market-trends': 'Let\'s discuss current market trends, economic indicators, and their impact on banking.',
    'regulatory': 'Let\'s explore regulatory topics like Basel III, MiFID II, GDPR, and compliance frameworks.',
    'strategy': 'Let\'s discuss strategic planning, digital transformation, and business development in banking.',
    'networking': 'Let\'s practice professional networking conversations, industry events, and relationship building.'
};

// Select a conversation topic
function selectTopic(topic) {
    currentTopic = topic;
    const prompt = topicPrompts[topic];

    // Add topic selection message
    addAIMessage(`Great choice! ${prompt} What would you like to discuss?`);

    // Scroll to conversation
    document.getElementById('messages-container').scrollIntoView({ behavior: 'smooth' });
}

// Start chat recording
function startChatRecording() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Sorry, your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    chatRecognition = new SpeechRecognition();

    chatRecognition.continuous = true;
    chatRecognition.interimResults = true;
    chatRecognition.lang = 'en-US';

    let transcript = '';
    const recordStartTime = Date.now();

    if (!sessionMetrics.startTime) {
        sessionMetrics.startTime = Date.now();
    }

    // UI updates
    document.getElementById('chat-record-btn').classList.add('hidden');
    document.getElementById('chat-stop-btn').classList.remove('hidden');
    document.getElementById('chat-recording-status').innerHTML = `
        <span class="status-dot recording"></span>
        <span class="status-text">Recording...</span>
    `;

    chatRecognition.onresult = (event) => {
        let interimTranscript = '';
        transcript = '';

        for (let i = 0; i < event.results.length; i++) {
            const transcriptPiece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                transcript += transcriptPiece + ' ';
            } else {
                interimTranscript += transcriptPiece;
            }
        }

        // Update status with interim results
        if (interimTranscript) {
            document.getElementById('chat-recording-status').innerHTML = `
                <span class="status-dot recording"></span>
                <span class="status-text">${interimTranscript}</span>
            `;
        }
    };

    chatRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        resetChatRecording();
    };

    chatRecognition.onend = () => {
        if (transcript.trim()) {
            // Calculate speaking time
            const speakingDuration = Math.round((Date.now() - recordStartTime) / 1000);
            sessionMetrics.speakingTime += speakingDuration;

            // Add user message
            addUserMessage(transcript.trim());

            // Update metrics
            const words = transcript.trim().split(/\s+/).length;
            sessionMetrics.wordsSpoken += words;
            sessionMetrics.exchanges += 1;
            updateSessionMetrics();

            // Generate AI response
            setTimeout(() => {
                generateAIResponse(transcript.trim());
            }, 800);
        }

        resetChatRecording();
    };

    try {
        chatRecognition.start();
    } catch (e) {
        console.error('Failed to start recognition:', e);
        resetChatRecording();
    }
}

// Stop chat recording
function stopChatRecording() {
    if (chatRecognition) {
        chatRecognition.stop();
    }
}

// Reset recording UI
function resetChatRecording() {
    document.getElementById('chat-record-btn').classList.remove('hidden');
    document.getElementById('chat-stop-btn').classList.add('hidden');
    document.getElementById('chat-recording-status').innerHTML = `
        <span class="status-dot"></span>
        <span class="status-text">Ready</span>
    `;
}

// Add user message to chat
function addUserMessage(text) {
    chatMessages.push({ role: 'user', content: text });

    const messagesContainer = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-wrapper user-message-wrapper';
    messageDiv.innerHTML = `
        <div class="user-avatar">👤</div>
        <div class="message user-message">
            <p>${text}</p>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add AI message to chat
function addAIMessage(text) {
    chatMessages.push({ role: 'ai', content: text });

    const messagesContainer = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-wrapper ai-message-wrapper';
    messageDiv.innerHTML = `
        <div class="ai-avatar">🤖</div>
        <div class="message ai-message">
            <p>${text}</p>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Generate AI response (simplified - in production would use actual AI API)
function generateAIResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    let response = '';

    // Context-aware responses based on keywords
    if (lowerInput.includes('risk') || lowerInput.includes('compliance')) {
        response = generateRiskResponse(lowerInput);
    } else if (lowerInput.includes('capital') || lowerInput.includes('basel')) {
        response = generateCapitalResponse(lowerInput);
    } else if (lowerInput.includes('market') || lowerInput.includes('economic')) {
        response = generateMarketResponse(lowerInput);
    } else if (lowerInput.includes('board') || lowerInput.includes('governance')) {
        response = generateGovernanceResponse(lowerInput);
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! It's great to have this conversation with you. What aspect of banking or finance would you like to discuss today?";
    } else {
        response = generateGenericResponse(lowerInput);
    }

    addAIMessage(response);

    // Award XP for conversation
    const xpEarned = Math.floor(Math.random() * 10) + 15; // 15-25 XP per exchange
    StorageManager.addXP(xpEarned);
    showXPToast(xpEarned);
}

function generateRiskResponse(input) {
    const responses = [
        "That's an important risk consideration. In my experience, effective risk management requires a balanced approach between quantitative metrics and qualitative judgment. How do you typically assess this in your role?",
        "Risk governance is indeed crucial. The three lines of defense model helps ensure proper oversight. What's your view on the balance between risk appetite and business growth?",
        "Compliance and risk management go hand in hand. With evolving regulations, how does your institution stay ahead of regulatory changes?",
        "Operational risk can be challenging to quantify. Have you implemented any specific Key Risk Indicators that have proven particularly effective?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateCapitalResponse(input) {
    const responses = [
        "Capital adequacy is fundamental to banking resilience. The Basel framework provides a solid foundation, though each institution must consider its unique risk profile. What are your thoughts on the upcoming Basel IV changes?",
        "CET1 ratios have improved significantly across the sector. How does your bank balance capital optimization with maintaining adequate buffers?",
        "The interplay between capital requirements and lending capacity is always interesting. Do you find the leverage ratio to be a binding constraint in your operations?",
        "Capital planning requires forward-looking stress testing. How far out does your institution typically project capital needs?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateMarketResponse(input) {
    const responses = [
        "The current market environment presents both challenges and opportunities. Interest rate dynamics particularly affect banking profitability. How is your institution positioning for potential rate movements?",
        "Economic indicators are showing mixed signals. From a banking perspective, which metrics do you find most predictive of credit quality trends?",
        "Market volatility requires robust asset-liability management. What's your view on the optimal duration gap in this environment?",
        "Geopolitical factors increasingly influence market behavior. How does your bank incorporate these considerations into strategic planning?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateGovernanceResponse(input) {
    const responses = [
        "Board governance requires balancing oversight with enabling management effectiveness. In your experience, what makes board discussions most productive?",
        "Effective board communication means presenting complex information clearly. How do you approach explaining technical matters to non-specialist board members?",
        "Strategic decision-making at board level benefits from diverse perspectives. What governance practices have you found most valuable?",
        "The board's role in risk oversight is paramount. How frequently does your board conduct deep dives into specific risk areas?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateGenericResponse(input) {
    const responses = [
        "That's an interesting perspective. Could you elaborate on how that impacts your day-to-day responsibilities?",
        "I see what you mean. In the banking sector, these considerations often have broader implications. What's your take on the longer-term outlook?",
        "Good point. The banking industry is certainly evolving rapidly. How do you see this developing over the next few years?",
        "That's worth exploring further. From your position on the board, how does this align with your institution's strategic priorities?",
        "Interesting observation. Financial institutions face many such challenges. What approaches have you found most effective?",
        "I appreciate that insight. The interplay between regulation, risk, and business strategy is always complex. How do you navigate these competing demands?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Update session metrics
function updateSessionMetrics() {
    const minutes = Math.floor(sessionMetrics.speakingTime / 60);
    const seconds = sessionMetrics.speakingTime % 60;
    document.getElementById('metric-speaking-time').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('metric-words').textContent = sessionMetrics.wordsSpoken;

    const wpm = sessionMetrics.speakingTime > 0
        ? Math.round((sessionMetrics.wordsSpoken / sessionMetrics.speakingTime) * 60)
        : 0;
    document.getElementById('metric-wpm').textContent = wpm;

    document.getElementById('metric-exchanges').textContent = sessionMetrics.exchanges;
}

// Clear conversation
function clearConversation() {
    if (confirm('Are you sure you want to clear the conversation? Your session metrics will be saved.')) {
        chatMessages = [];
        currentTopic = null;

        // Save session to profile
        const profile = StorageManager.getProfile();
        profile.chatSessions = (profile.chatSessions || 0) + 1;
        profile.totalChatTime = (profile.totalChatTime || 0) + sessionMetrics.speakingTime;
        StorageManager.saveProfile(profile);

        // Reset metrics
        sessionMetrics = {
            speakingTime: 0,
            wordsSpoken: 0,
            exchanges: 0,
            startTime: null
        };
        updateSessionMetrics();

        // Clear messages
        document.getElementById('messages-container').innerHTML = `
            <div class="welcome-message">
                <div class="ai-avatar">🤖</div>
                <div class="message ai-message">
                    <p>Hello! I'm your AI conversation partner. I'm here to help you practice professional English in banking and finance contexts.</p>
                    <p>You can speak about board meetings, risk management, market analysis, or any professional topic. Just click the microphone and start speaking!</p>
                    <p>Feel free to choose a suggested topic above, or speak freely about whatever you'd like to discuss.</p>
                </div>
            </div>
        `;
    }
}
