const express = require('express');
const { auth, optionalAuth } = require('../middleware/auth');
const GameSession = require('../models/GameSession');
const User = require('../models/User');

const router = express.Router();

// Save game session (works for both logged-in and guest users)
router.post('/session', optionalAuth, async (req, res) => {
    try {
        const { 
            finalScore, 
            roundsData, 
            deviceInfo, 
            completedGame, 
            hintsUsed, 
            difficultyLevel 
        } = req.body;
        
        const userId = req.user?.id;
        
        // Get browser & device info
        const userAgent = req.headers['user-agent'];
        let deviceType = 'unknown';
        let browser = 'unknown';
        let os = 'unknown';
        
        if (deviceInfo) {
            deviceType = deviceInfo.deviceType || 'unknown';
            browser = deviceInfo.browser || 'unknown';
            os = deviceInfo.os || 'unknown';
        } else if (userAgent) {
            // Basic user agent parsing if client didn't send deviceInfo
            if (userAgent.includes('Mobile')) deviceType = 'mobile';
            else if (userAgent.includes('Tablet')) deviceType = 'tablet';
            else deviceType = 'desktop';
            
            if (userAgent.includes('Chrome')) browser = 'Chrome';
            else if (userAgent.includes('Firefox')) browser = 'Firefox';
            else if (userAgent.includes('Safari')) browser = 'Safari';
            else if (userAgent.includes('Edge')) browser = 'Edge';
            
            if (userAgent.includes('Windows')) os = 'Windows';
            else if (userAgent.includes('Mac')) os = 'MacOS';
            else if (userAgent.includes('Linux')) os = 'Linux';
            else if (userAgent.includes('Android')) os = 'Android';
            else if (userAgent.includes('iOS')) os = 'iOS';
        }
        
        // Build session data object
        const sessionData = {
            userId,
            deviceType,
            browser,
            os,
            finalScore,
            roundsCompleted: roundsData?.length || 0,
            hintsUsed: hintsUsed || 0,
            difficultyLevel: difficultyLevel || 2,
            sessionCompleted: completedGame || false,
            isGuest: !userId,
            ipAddress: req.ip,
            userAgent
        };
        
        // Create game session
        const session = await GameSession.create(sessionData);
        
        // Process round data if provided
        if (roundsData && roundsData.length > 0) {
            for (let i = 0; i < roundsData.length; i++) {
                const round = roundsData[i];
                
                // Calculate correct and incorrect counts
                const correctTags = round.correctTags || [];
                const userTags = round.userTags || [];
                const correctCount = userTags.filter(tag => 
                    correctTags.some(ct => ct.toLowerCase() === tag.toLowerCase())
                ).length;
                const incorrectCount = userTags.length - correctCount;
                
                // Create round data
                await GameSession.saveRoundData({
                    sessionId: session.id,
                    roundNumber: i + 1,
                    snippetId: round.snippetId,
                    correctTags,
                    userTags,
                    startTime: round.startTime,
                    endTime: round.endTime,
                    timeSpentSeconds: round.timeSpent || 0,
                    score: round.score || 0,
                    correctCount,
                    incorrectCount,
                    hintUsed: round.hintUsed || false,
                    bonusPoints: round.bonusPoints || 0
                });
            }
        }
        
        // Update user stats if logged in
        if (userId) {
            await User.updateGameStats(userId, finalScore);
            
            // Log user activity
            await User.updateLastActive(userId);
        }
        
        // If session is completed, update the end time and duration
        if (completedGame) {
            const totalDuration = roundsData.reduce((sum, round) => sum + (round.timeSpent || 0), 0);
            await GameSession.endSession(session.id, finalScore, totalDuration);
        }

        res.status(201).json({
            success: true,
            data: {
                session: {
                    id: session.id,
                    userId: session.userId,
                    score: finalScore
                }
            }
        });
    } catch (error) {
        console.error('Error saving game session:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving game session'
        });
    }
});

// Log user action during gameplay
router.post('/log-action', optionalAuth, async (req, res) => {
    try {
        const { sessionId, actionType, actionValue, roundNumber } = req.body;
        const userId = req.user?.id;
        
        if (!sessionId || !actionType) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and action type are required'
            });
        }
        
        await GameSession.logAction({
            sessionId,
            userId,
            actionType,
            actionValue,
            roundNumber
        });
        
        res.status(201).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging action'
        });
    }
});

// Save technical performance data
router.post('/tech-data', optionalAuth, async (req, res) => {
    try {
        const { 
            sessionId, 
            pageLoadTimeMs, 
            networkType, 
            screenResolution,
            memoryUsage,
            errorsEncountered
        } = req.body;
        
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID is required'
            });
        }
        
        await GameSession.saveTechnicalData({
            sessionId,
            pageLoadTimeMs,
            networkType,
            screenResolution,
            memoryUsage,
            errorsEncountered
        });
        
        res.status(201).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving technical data'
        });
    }
});

// Save user privacy consent
router.post('/consent', auth, async (req, res) => {
    try {
        const { 
            profileDataConsent, 
            behavioralDataConsent, 
            deviceDataConsent, 
            marketingConsent,
            consentVersion
        } = req.body;
        
        if (!consentVersion) {
            return res.status(400).json({
                success: false,
                message: 'Consent version is required'
            });
        }
        
        const consentData = {
            profileDataConsent: !!profileDataConsent,
            behavioralDataConsent: !!behavioralDataConsent,
            deviceDataConsent: !!deviceDataConsent,
            marketingConsent: !!marketingConsent,
            consentVersion
        };
        
        await User.saveUserConsent(req.user.id, consentData);
        
        res.status(201).json({
            success: true,
            data: {
                consent: consentData
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving consent data'
        });
    }
});

// Get user's consent status
router.get('/consent', auth, async (req, res) => {
    try {
        const consentStatus = await User.getConsentStatus(req.user.id);
        
        res.json({
            success: true,
            data: {
                consent: consentStatus
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching consent status'
        });
    }
});

// Get user's game history (requires auth)
router.get('/history', auth, async (req, res) => {
    try {
        const sessions = await GameSession.getUserSessions(req.user.id);
        res.json({
            success: true,
            data: {
                sessions
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching game history'
        });
    }
});

// Get user's stats (requires auth)
router.get('/stats', auth, async (req, res) => {
    try {
        const stats = await GameSession.getUserStats(req.user.id);
        res.json({
            success: true,
            data: {
                stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user stats'
        });
    }
});

// Get top scores (public)
router.get('/leaderboard', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const topScores = await GameSession.getTopScores(limit);
        res.json({
            success: true,
            data: {
                scores: topScores
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leaderboard'
        });
    }
});

// Get specific game session (requires auth if session belongs to user)
router.get('/session/:id', optionalAuth, async (req, res) => {
    try {
        const session = await GameSession.getSessionById(req.params.id);
        
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        // Check if session belongs to user
        if (session.user_id && (!req.user || session.user_id !== req.user.id)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to view this session'
            });
        }

        res.json({
            success: true,
            data: {
                session
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching game session'
        });
    }
});

// Get game analytics (admin only)
router.get('/analytics', auth, async (req, res) => {
    try {
        // Check if user is admin (you'll need to implement this in your User model)
        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to access analytics'
            });
        }
        
        const analytics = await GameSession.getGameAnalytics();
        const userEngagement = await User.getUserEngagementStats();
        const consentStats = await User.getUserConsentStats();
        
        res.json({
            success: true,
            data: {
                gameAnalytics: analytics,
                userEngagement,
                consentStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics'
        });
    }
});

module.exports = router; 