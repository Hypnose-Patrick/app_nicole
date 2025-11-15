// LingoQuest - Vocal Analyzer
// Web Speech API integration for real-time voice analysis

const VocalAnalyzer = {
  recognition: null,
  isRecording: false,
  transcript: '',
  startTime: null,
  wordCount: 0,
  pauseCount: 0,
  
  // Initialize Web Speech API
  init() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Web Speech API not supported');
      return false;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    // Configuration
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;
    
    return true;
  },
  
  // Start recording
  startRecording(onTranscript, onEnd, onError) {
    if (!this.recognition) {
      if (!this.init()) {
        onError('Speech recognition not supported in this browser');
        return;
      }
    }
    
    this.isRecording = true;
    this.transcript = '';
    this.startTime = Date.now();
    this.wordCount = 0;
    this.pauseCount = 0;
    
    // Event handlers
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          this.transcript += transcript + ' ';
          this.wordCount = this.transcript.trim().split(/\s+/).length;
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (onTranscript) {
        onTranscript({
          final: finalTranscript,
          interim: interimTranscript,
          full: this.transcript
        });
      }
    };
    
    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (onError) {
        onError(event.error);
      }
    };
    
    this.recognition.onend = () => {
      if (this.isRecording) {
        // Restart if still supposed to be recording
        this.recognition.start();
      } else if (onEnd) {
        onEnd();
      }
    };
    
    try {
      this.recognition.start();
    } catch (e) {
      console.error('Failed to start recognition:', e);
      if (onError) {
        onError(e.message);
      }
    }
  },
  
  // Stop recording
  stopRecording() {
    this.isRecording = false;
    
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    }
    
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    return this.analyzePerformance(duration);
  },
  
  // Analyze vocal performance
  analyzePerformance(duration) {
    const words = this.transcript.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Calculate WPM (Words Per Minute)
    const wpm = duration > 0 ? Math.round((wordCount / duration) * 60) : 0;
    
    // Estimate pauses (simplified: count periods and commas)
    const pauses = (this.transcript.match(/[.,;!?]/g) || []).length;
    
    // Calculate filler words
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];
    const fillerCount = fillerWords.reduce((count, filler) => {
      const regex = new RegExp('\\b' + filler + '\\b', 'gi');
      const matches = this.transcript.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    
    return {
      transcript: this.transcript.trim(),
      duration,
      wordCount,
      wpm,
      pauses,
      fillerCount,
      avgWordLength: wordCount > 0 ? Math.round(this.transcript.length / wordCount) : 0
    };
  },
  
  // Get current metrics (while recording)
  getCurrentMetrics() {
    const duration = this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0;
    const wordCount = this.transcript.trim().split(/\s+/).filter(w => w.length > 0).length;
    const wpm = duration > 0 ? Math.round((wordCount / duration) * 60) : 0;
    
    return {
      duration,
      wordCount,
      wpm,
      transcript: this.transcript
    };
  }
};
