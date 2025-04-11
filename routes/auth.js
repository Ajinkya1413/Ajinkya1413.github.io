const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRegistration = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim()
];

// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        
        // Create new user
        const user = await User.create(email, password);
        
        // Generate token
        const token = User.generateToken(user.id);
        
        // Save default consent settings if provided
        if (req.body.consent) {
            const consentData = {
                profileDataConsent: !!req.body.consent.profileDataConsent,
                behavioralDataConsent: !!req.body.consent.behavioralDataConsent,
                deviceDataConsent: !!req.body.consent.deviceDataConsent,
                marketingConsent: !!req.body.consent.marketingConsent,
                consentVersion: req.body.consent.consentVersion || '1.0'
            };
            
            await User.saveUserConsent(user.id, consentData);
        }
        
        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user'
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Verify password
        const isMatch = await User.verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Update last login timestamp
        await User.updateLastLogin(user.id);
        
        // Generate token
        const token = User.generateToken(user.id);
        
        // Get consent status
        const consentStatus = await User.getConsentStatus(user.id);
        
        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email
                },
                needsConsent: !consentStatus.has_consented
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in'
        });
    }
});

// Get current user route
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    registrationDate: user.registration_date,
                    totalGamesPlayed: user.total_games_played,
                    totalScore: user.total_score,
                    streakDays: user.streak_days,
                    accountStatus: user.account_status,
                    consent: {
                        profileDataConsent: !!user.consent.profile_data_consent,
                        behavioralDataConsent: !!user.consent.behavioral_data_consent,
                        deviceDataConsent: !!user.consent.device_data_consent,
                        marketingConsent: !!user.consent.marketing_consent,
                        consentVersion: user.consent.consent_version,
                        hasConsented: !!user.consent.consent_version
                    }
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user'
        });
    }
});

// Request data deletion
router.post('/request-deletion', auth, async (req, res) => {
    try {
        // Update user account status to 'deletion_requested'
        const updated = await User.updateAccountStatus(req.user.id, 'deletion_requested');
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Deletion request received. Your data will be deleted within 30 days.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing deletion request'
        });
    }
});

module.exports = router; 