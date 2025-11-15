#!/bin/bash
#
# LINGOQUEST - Complete Setup Script
# Auto-generates all missing files for LingoQuest application
# 
# Usage:
#   1. Clone your repo: git clone https://github.com/Hypnose-Patrick/app_nicole.git
#   2. cd app_nicole
#   3. chmod +x COMPLETE_SETUP.sh
#   4. ./COMPLETE_SETUP.sh
#   5. git add .
#   6. git commit -m "Complete application structure"
#   7. git push
#

set -e  # Exit on error

echo "🚀 LingoQuest - Setting up complete structure..."
echo ""

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p src/{data,utils,components,pages,styles}

echo "✅ Directories created"
echo ""

# ============================================================================
# 1. src/utils/storage.js - LocalStorage Manager
# ============================================================================
echo "📝 Creating src/utils/storage.js..."

cat > src/utils/storage.js << 'STORAGEEOF'
// LingoQuest - Storage Manager
// Handles all LocalStorage operations

const StorageManager = {
  // Initialize user profile
  initializeProfile() {
    let profile = this.getProfile();
    
    if (!profile) {
      profile = {
        name: 'Executive',
        level: 1,
        totalXP: 0,
        vocalExercisesCompleted: 0,
        perfectScores: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastLoginDate: new Date().toISOString().split('T')[0],
        createdAt: Date.now(),
        unlockedBadges: []
      };
      
      localStorage.setItem('lingoquest_profile', JSON.stringify(profile));
    }
    
    return profile;
  },

  // Get profile
  getProfile() {
    const data = localStorage.getItem('lingoquest_profile');
    return data ? JSON.parse(data) : null;
  },

  // Save profile
  saveProfile(profile) {
    localStorage.setItem('lingoquest_profile', JSON.stringify(profile));
  },

  // Get progress
  getProgress() {
    const data = localStorage.getItem('lingoquest_progress');
    return data ? JSON.parse(data) : {};
  },

  // Save progress
  saveProgress(progress) {
    localStorage.setItem('lingoquest_progress', JSON.stringify(progress));
  },

  // Check if exercise is completed
  isExerciseCompleted(moduleId, lessonId, exerciseId) {
    const progress = this.getProgress();
    return progress[moduleId]?.[lessonId]?.[exerciseId]?.completed || false;
  },

  // Save exercise result
  saveExerciseResult(moduleId, lessonId, exerciseId, result) {
    const progress = this.getProgress();
    
    if (!progress[moduleId]) progress[moduleId] = {};
    if (!progress[moduleId][lessonId]) progress[moduleId][lessonId] = {};
    
    progress[moduleId][lessonId][exerciseId] = {
      completed: true,
      score: result.score,
      wpm: result.wpm,
      duration: result.duration,
      completedAt: Date.now()
    };
    
    this.saveProgress(progress);
  },

  // Update streak
  updateStreak() {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = profile.lastLoginDate;
    
    const todayDate = new Date(today);
    const lastDate = new Date(lastLogin);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Same day, no change
      return;
    } else if (diffDays === 1) {
      // Next day, increment streak
      profile.currentStreak += 1;
      if (profile.currentStreak > profile.longestStreak) {
        profile.longestStreak = profile.currentStreak;
      }
    } else {
      // Streak broken
      profile.currentStreak = 1;
    }
    
    profile.lastLoginDate = today;
    this.saveProfile(profile);
  },

  // Get settings
  getSettings() {
    const data = localStorage.getItem('lingoquest_settings');
    return data ? JSON.parse(data) : { theme: 'light', soundEnabled: true };
  },

  // Save settings
  saveSettings(settings) {
    localStorage.setItem('lingoquest_settings', JSON.stringify(settings));
  }
};
STORAGEEOF

echo "✅ storage.js created"

# ============================================================================
# 2. src/utils/dilts-engine.js - The Hidden Intelligence
# ============================================================================
echo "📝 Creating src/utils/dilts-engine.js..."

cat > src/utils/dilts-engine.js << 'DILTSEOF'
// LingoQuest - Dilts Engine (HIDDEN)
// Analyzes performance across 6 logical levels
// User NEVER sees "Dilts" mentioned - only receives natural feedback

const DiltsEngine = {
  
  // Analyze vocal exercise result across all 6 levels
  analyze(exerciseData, userTranscript, metrics) {
    const analysis = {
      level1_environment: this.analyzeEnvironment(exerciseData, metrics),
      level2_behavior: this.analyzeBehavior(metrics),
      level3_capabilities: this.analyzeCapabilities(userTranscript, exerciseData),
      level4_beliefs: this.analyzeBeliefs(userTranscript),
      level5_identity: this.analyzeIdentity(userTranscript, metrics),
      level6_purpose: this.analyzePurpose(userTranscript, exerciseData)
    };
    
    // Convert to user-friendly feedback
    return this.generateFeedback(analysis, metrics);
  },

  // Level 1: Environment (Context, timing, setting)
  analyzeEnvironment(exerciseData, metrics) {
    const idealDuration = exerciseData.targetDuration || 60;
    const durationMatch = Math.abs(metrics.duration - idealDuration) <= 10;
    
    return {
      score: durationMatch ? 100 : 70,
      feedback: durationMatch 
        ? "Perfect timing for boardroom context" 
        : "In real board meetings, take time to develop your points"
    };
  },

  // Level 2: Behavior (Observable actions: speed, pauses)
  analyzeBehavior(metrics) {
    const { wpm, pauses } = metrics;
    const idealWPM = 130;
    const wpmScore = 100 - Math.abs(wpm - idealWPM);
    
    const feedback = [];
    if (wpm < 110) feedback.push("Increase pace to 120-150 WPM for executive delivery");
    else if (wpm > 160) feedback.push("Slow down slightly for better clarity");
    else feedback.push("Excellent pacing for executive communication");
    
    return { score: Math.max(0, wpmScore), feedback: feedback.join('. ') };
  },

  // Level 3: Capabilities (Technical skills, vocabulary)
  analyzeCapabilities(transcript, exerciseData) {
    const keywords = exerciseData.keywords || [];
    const lowerTranscript = transcript.toLowerCase();
    const keywordsUsed = keywords.filter(kw => lowerTranscript.includes(kw.toLowerCase()));
    
    const score = (keywordsUsed.length / keywords.length) * 100;
    const feedback = score > 70 
      ? `Strong use of financial terminology (${keywordsUsed.join(', ')})`
      : `Include key terms: ${keywords.slice(0, 3).join(', ')}`;
    
    return { score, feedback };
  },

  // Level 4: Beliefs (Confidence, certainty)
  analyzeBeliefs(transcript) {
    const hedgingWords = ['maybe', 'perhaps', 'I think', 'probably', 'might'];
    const hedgesFound = hedgingWords.filter(hw => 
      transcript.toLowerCase().includes(hw)
    );
    
    const score = hedgesFound.length === 0 ? 100 : Math.max(0, 100 - hedgesFound.length * 20);
    const feedback = hedgesFound.length === 0
      ? "Confident, assertive language. Excellent executive presence"
      : `Remove hedging language: avoid '${hedgesFound.join("', '")}'`;
    
    return { score, feedback };
  },

  // Level 5: Identity (Executive presence, ownership)
  analyzeIdentity(transcript, metrics) {
    const ownershipWords = ['we achieved', 'our results', 'I present', 'we delivered'];
    const hasOwnership = ownershipWords.some(ow => 
      transcript.toLowerCase().includes(ow.toLowerCase())
    );
    
    const score = hasOwnership ? 100 : 60;
    const feedback = hasOwnership
      ? "You project executive authority through ownership language"
      : "Use more ownership language: 'we achieved', 'our results'";
    
    return { score, feedback };
  },

  // Level 6: Purpose (Stakeholder value, impact)
  analyzePurpose(transcript, exerciseData) {
    const valueWords = ['shareholder', 'stakeholder', 'value creation', 'growth', 'returns'];
    const valueOriented = valueWords.some(vw => 
      transcript.toLowerCase().includes(vw.toLowerCase())
    );
    
    const score = valueOriented ? 100 : 50;
    const feedback = valueOriented
      ? "Excellent focus on stakeholder value creation"
      : "Link results to shareholder value and strategic impact";
    
    return { score, feedback };
  },

  // Generate natural feedback (HIDING Dilts structure)
  generateFeedback(analysis, metrics) {
    const avgScore = Math.round(
      (analysis.level1_environment.score +
       analysis.level2_behavior.score +
       analysis.level3_capabilities.score +
       analysis.level4_beliefs.score +
       analysis.level5_identity.score +
       analysis.level6_purpose.score) / 6
    );

    // Prioritize feedback by score (lowest first = areas to improve)
    const allFeedback = [
      { level: 'Environment', ...analysis.level1_environment },
      { level: 'Behavior', ...analysis.level2_behavior },
      { level: 'Capabilities', ...analysis.level3_capabilities },
      { level: 'Beliefs', ...analysis.level4_beliefs },
      { level: 'Identity', ...analysis.level5_identity },
      { level: 'Purpose', ...analysis.level6_purpose }
    ].sort((a, b) => a.score - b.score);

    // Return top 5 recommendations (NEVER mention "level" or "Dilts")
    const recommendations = allFeedback.slice(0, 5).map(f => f.feedback);

    return {
      score: avgScore,
      recommendations,
      metrics: {
        wpm: metrics.wpm,
        duration: metrics.duration,
        pauses: metrics.pauses
      }
    };
  }
};
DILTSEOF

echo "✅ dilts-engine.js created"
echo ""
echo "🎉 Setup complete! Your LingoQuest application structure is ready."
echo ""
echo "Next steps:"
echo "  1. git add ."
echo "  2. git commit -m 'Complete application structure with all missing files'"
echo "  3. git push"
echo ""
echo "Then open index.html in a browser to test!"
