// LingoQuest - Dilts Levels Engine
// Hidden intelligence using Robert Dilts' 6 Logical Levels
// This engine analyzes speech on 6 dimensions but presents results in natural, professional language

const DiltsEngine = {

    // Main analysis function
    // Returns professional feedback WITHOUT mentioning Dilts levels
    analyzeSpeech(transcript, metrics) {
        const { wpm, duration, pauses, keywords } = metrics;

        // Analyze across all 6 Dilts levels (HIDDEN)
        const level1 = this.analyzeEnvironment(duration, transcript);
        const level2 = this.analyzeBehavior(wpm, pauses);
        const level3 = this.analyzeCapabilities(keywords, transcript);
        const level4 = this.analyzeBeliefs(transcript);
        const level5 = this.analyzeIdentity(transcript);
        const level6 = this.analyzePurpose(transcript);

        // Calculate overall score
        const score = this.calculateScore([level1, level2, level3, level4, level5, level6]);

        // Generate professional feedback (hiding the Dilts framework)
        const feedback = this.generateFeedback(score, level1, level2, level3, level4, level5, level6);

        return {
            score,
            feedback,
            recommendations: this.generateRecommendations(level1, level2, level3, level4, level5, level6)
        };
    },

    // LEVEL 1: Environment (Context, timing, external factors)
    analyzeEnvironment(duration, transcript) {
        const score = duration >= 30 && duration <= 90 ? 100 : 70;
        const message = duration >= 45 && duration <= 60
            ? "Optimal timing for boardroom presentations"
            : duration < 30
            ? "In real board meetings, take time to develop points"
            : "Consider condensing for executive brevity";

        return { score, message, level: 'environment' };
    },

    // LEVEL 2: Behavior (Observable actions: speed, pauses)
    analyzeBehavior(wpm, pauses) {
        let score = 80;
        let message = "";

        if (wpm >= 120 && wpm <= 150) {
            score = 100;
            message = "Excellent pace for executive delivery";
        } else if (wpm < 120) {
            score = 70;
            message = "Increase pace to 120-150 WPM for executive delivery";
        } else {
            score = 75;
            message = "Slightly fast. Slow down to emphasize key points";
        }

        return { score, message, level: 'behavior' };
    },

    // LEVEL 3: Capabilities (Technical skills, vocabulary mastery)
    analyzeCapabilities(keywords, transcript) {
        const technicalTerms = ['EBITDA', 'ROE', 'YoY', 'Basel', 'capital', 'risk',
                                'compliance', 'regulatory', 'liquidity', 'NPL',
                                'provision', 'tier 1', 'CET1'];

        const transcriptUpper = transcript.toUpperCase();
        const foundTerms = technicalTerms.filter(term =>
            transcriptUpper.includes(term.toUpperCase())
        );

        const score = Math.min(100, 60 + (foundTerms.length * 10));
        const message = foundTerms.length >= 3
            ? `Strong use of financial terminology (${foundTerms.slice(0, 3).join(', ')})`
            : foundTerms.length > 0
            ? "Good technical vocabulary. Add more industry terms"
            : "Incorporate banking terminology (EBITDA, ROE, Basel III)";

        return { score, message, level: 'capabilities' };
    },

    // LEVEL 4: Beliefs (Confidence, certainty, assertiveness)
    analyzeBeliefs(transcript) {
        const hedgingWords = ['maybe', 'perhaps', 'i think', 'i believe', 'probably',
                              'might', 'could be', 'seems like'];
        const confidentWords = ['clearly', 'certainly', 'definitely', 'will',
                                'we are committed', 'our strategy', 'we deliver'];

        const transcriptLower = transcript.toLowerCase();
        const hedging = hedgingWords.filter(word => transcriptLower.includes(word)).length;
        const confident = confidentWords.filter(word => transcriptLower.includes(word)).length;

        let score = 85;
        let message = "";

        if (hedging > 2) {
            score = 60;
            message = "Remove hedging language ('maybe', 'I think'). Speak with executive certainty";
        } else if (confident >= 2) {
            score = 100;
            message = "Strong, confident language. You communicate executive conviction";
        } else {
            message = "Good confidence. Add assertive language ('clearly', 'we will deliver')";
        }

        return { score, message, level: 'beliefs' };
    },

    // LEVEL 5: Identity (Executive presence, leadership projection)
    analyzeIdentity(transcript) {
        const ownershipLanguage = ['we', 'our team', 'our strategy', 'our bank',
                                   'leadership', 'responsibility'];
        const passiveLanguage = ['it was', 'there is', 'things happened'];

        const transcriptLower = transcript.toLowerCase();
        const ownership = ownershipLanguage.filter(phrase => transcriptLower.includes(phrase)).length;
        const passive = passiveLanguage.filter(phrase => transcriptLower.includes(phrase)).length;

        let score = 85;
        let message = "";

        if (ownership >= 3) {
            score = 100;
            message = "You project executive authority through ownership language";
        } else if (passive > 2) {
            score = 65;
            message = "Use active ownership language ('we led', 'our strategy') vs passive voice";
        } else {
            message = "Good executive presence. Emphasize team leadership more";
        }

        return { score, message, level: 'identity' };
    },

    // LEVEL 6: Purpose (Strategic alignment, stakeholder impact)
    analyzePurpose(transcript) {
        const stakeholderWords = ['shareholder', 'value creation', 'long-term',
                                  'sustainable', 'stakeholder', 'growth', 'strategic'];
        const tacticalWords = ['task', 'to-do', 'checklist'];

        const transcriptLower = transcript.toLowerCase();
        const strategic = stakeholderWords.filter(word => transcriptLower.includes(word)).length;
        const tactical = tacticalWords.filter(word => transcriptLower.includes(word)).length;

        let score = 80;
        let message = "";

        if (strategic >= 2) {
            score = 100;
            message = "Excellent strategic framing. Boards value shareholder perspective";
        } else if (tactical > 1) {
            score = 60;
            message = "Link activities to shareholder value creation vs tactical execution";
        } else {
            message = "Good strategic orientation. Emphasize long-term value more";
        }

        return { score, message, level: 'purpose' };
    },

    // Calculate overall score
    calculateScore(levels) {
        const weights = {
            environment: 0.10,
            behavior: 0.20,
            capabilities: 0.25,
            beliefs: 0.20,
            identity: 0.15,
            purpose: 0.10
        };

        let totalScore = 0;
        levels.forEach(level => {
            totalScore += level.score * weights[level.level];
        });

        return Math.round(totalScore);
    },

    // Generate overall feedback message
    generateFeedback(score, level1, level2, level3, level4, level5, level6) {
        let feedback = "";

        if (score >= 90) {
            feedback = "🌟 Outstanding boardroom performance! You demonstrated executive-level fluency. ";
        } else if (score >= 80) {
            feedback = "✅ Excellent boardroom performance! You demonstrated strong executive communication. ";
        } else if (score >= 70) {
            feedback = "👍 Good performance. You're building solid boardroom skills. ";
        } else if (score >= 60) {
            feedback = "📈 Solid effort. Focus on the recommendations below to enhance your impact. ";
        } else {
            feedback = "💪 Keep practicing! Review the key recommendations to improve. ";
        }

        // Add top strength (NEVER mention Dilts level)
        const topLevel = [level3, level4, level5].sort((a, b) => b.score - a.score)[0];
        feedback += topLevel.message + ". ";

        return feedback;
    },

    // Generate prioritized recommendations
    generateRecommendations(level1, level2, level3, level4, level5, level6) {
        const allLevels = [level1, level2, level3, level4, level5, level6];

        // Sort by score (lowest first = highest priority)
        const sorted = allLevels.sort((a, b) => a.score - b.score);

        // Return top 5 recommendations
        return sorted.slice(0, 5).map(level => ({
            message: level.message,
            priority: level.score < 70 ? 'high' : level.score < 85 ? 'medium' : 'low'
        }));
    },

    // Generate contextual tips based on exercise type
    getContextualTips(exerciseType) {
        const tips = {
            'present-q4-results': [
                "Start with headline numbers (revenue, EBITDA)",
                "Use YoY comparisons to show momentum",
                "End with strategic outlook or guidance",
                "Pause after key metrics for emphasis"
            ],
            'risk-discussion': [
                "Quantify risks when possible (VaR, stress tests)",
                "Balance risks with mitigation strategies",
                "Reference regulatory frameworks (Basel III)",
                "Conclude with risk appetite alignment"
            ],
            'strategy-presentation': [
                "Lead with strategic priorities",
                "Link to shareholder value creation",
                "Use concrete KPIs and targets",
                "Address board questions proactively"
            ]
        };

        return tips[exerciseType] || tips['present-q4-results'];
    }
};
