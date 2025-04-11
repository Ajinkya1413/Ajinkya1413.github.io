const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, optionalAuth } = require('../middleware/auth');
const Feedback = require('../models/Feedback');

const router = express.Router();

// Validation middleware
const validateFeedback = [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('liked').optional().isString(),
    body('improvements').optional().isString(),
    body('additionalComments').optional().isString()
];

// Submit feedback
router.post('/', optionalAuth, validateFeedback, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { rating, liked, improvements, additionalComments } = req.body;
        const userId = req.user?.id;

        const feedback = await Feedback.create(
            userId,
            rating,
            liked,
            improvements,
            additionalComments
        );

        res.status(201).json({
            success: true,
            data: {
                feedback
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting feedback'
        });
    }
});

// Get all feedback (admin only - to be implemented)
router.get('/', auth, async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);
        const offset = parseInt(req.query.offset) || 0;

        const feedback = await Feedback.getAll(limit, offset);
        res.json({
            success: true,
            data: {
                feedback
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching feedback'
        });
    }
});

// Get feedback statistics (admin only - to be implemented)
router.get('/stats', auth, async (req, res) => {
    try {
        const stats = await Feedback.getStats();
        res.json({
            success: true,
            data: {
                stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching feedback statistics'
        });
    }
});

// Get user's feedback history
router.get('/my', auth, async (req, res) => {
    try {
        const feedback = await Feedback.getUserFeedback(req.user.id);
        res.json({
            success: true,
            data: {
                feedback
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user feedback'
        });
    }
});

// Get specific feedback (admin only - to be implemented)
router.get('/:id', auth, async (req, res) => {
    try {
        const feedbackId = parseInt(req.params.id);
        const feedback = await Feedback.getById(feedbackId);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        res.json({
            success: true,
            data: {
                feedback
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching feedback details'
        });
    }
});

module.exports = router; 