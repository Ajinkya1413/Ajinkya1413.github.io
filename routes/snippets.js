const express = require('express');
const { auth, optionalAuth } = require('../middleware/auth');
const CodeSnippet = require('../models/CodeSnippet');
const Report = require('../models/Report');

const router = express.Router();

// Get random snippets for the game
router.get('/random', async (req, res) => {
    try {
        const count = Math.min(parseInt(req.query.count) || 1, 10);
        const snippets = await CodeSnippet.getRandomSnippets(count);
        res.json({
            success: true,
            data: {
                snippets
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching random snippets'
        });
    }
});

// Get snippets by tags
router.get('/bytags', async (req, res) => {
    try {
        const tags = req.query.tags?.split(',') || [];
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        
        if (tags.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No tags provided'
            });
        }

        const snippets = await CodeSnippet.getByTags(tags, limit);
        res.json({
            success: true,
            data: {
                snippets
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching snippets by tags'
        });
    }
});

// Report a snippet
router.post('/:id/report', optionalAuth, async (req, res) => {
    try {
        const { reason } = req.body;
        const snippetId = parseInt(req.params.id);
        const userId = req.user?.id;

        if (!reason) {
            return res.status(400).json({
                success: false,
                message: 'Report reason is required'
            });
        }

        // Check if snippet exists
        const snippet = await CodeSnippet.getById(snippetId);
        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: 'Snippet not found'
            });
        }

        const report = await Report.create(snippetId, userId, reason);
        res.status(201).json({
            success: true,
            data: {
                report
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating report'
        });
    }
});

// Get reports for a snippet (admin only - to be implemented)
router.get('/:id/reports', auth, async (req, res) => {
    try {
        const snippetId = parseInt(req.params.id);
        const reports = await Report.getBySnippetId(snippetId);
        res.json({
            success: true,
            data: {
                reports
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reports'
        });
    }
});

// Add a new snippet (admin only - to be implemented)
router.post('/', auth, async (req, res) => {
    try {
        const { content, tags, description, sourceLink } = req.body;

        if (!content || !tags || !Array.isArray(tags)) {
            return res.status(400).json({
                success: false,
                message: 'Content and tags array are required'
            });
        }

        const snippet = await CodeSnippet.create(content, tags, description, sourceLink);
        res.status(201).json({
            success: true,
            data: {
                snippet
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating snippet'
        });
    }
});

module.exports = router; 