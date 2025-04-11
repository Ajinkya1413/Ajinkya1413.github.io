const express = require('express');
const { auth } = require('../middleware/auth');
const Report = require('../models/Report');

const router = express.Router();

// Get pending reports (admin only - to be implemented)
router.get('/pending', auth, async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const reports = await Report.getPending(limit);
        res.json({
            success: true,
            data: {
                reports
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching pending reports'
        });
    }
});

// Get report statistics (admin only - to be implemented)
router.get('/stats', auth, async (req, res) => {
    try {
        const stats = await Report.getStats();
        res.json({
            success: true,
            data: {
                stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching report statistics'
        });
    }
});

// Update report status (admin only - to be implemented)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const reportId = parseInt(req.params.id);

        if (!['pending', 'resolved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const success = await Report.updateStatus(reportId, status);
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.json({
            success: true,
            message: 'Report status updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating report status'
        });
    }
});

// Get specific report details (admin only - to be implemented)
router.get('/:id', auth, async (req, res) => {
    try {
        const reportId = parseInt(req.params.id);
        const report = await Report.getById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.json({
            success: true,
            data: {
                report
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching report details'
        });
    }
});

module.exports = router; 