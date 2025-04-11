const db = require('../config/database');
const CodeSnippet = require('./CodeSnippet');

class Report {
    static async create(snippetId, userId, reason) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO reports (snippet_id, user_id, reason)
                VALUES (?, ?, ?)
            `;
            
            db.run(sql, [snippetId, userId || null, reason], async function(err) {
                if (err) {
                    reject(err);
                    return;
                }

                // Increment the report count on the snippet
                try {
                    await CodeSnippet.incrementReportCount(snippetId);
                } catch (error) {
                    console.error('Error incrementing report count:', error);
                }

                resolve({
                    id: this.lastID,
                    snippet_id: snippetId,
                    user_id: userId,
                    reason,
                    status: 'pending',
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, u.email as reporter_email
                FROM reports r
                LEFT JOIN users u ON r.user_id = u.id
                WHERE r.id = ?
            `;
            
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async getBySnippetId(snippetId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, u.email as reporter_email
                FROM reports r
                LEFT JOIN users u ON r.user_id = u.id
                WHERE r.snippet_id = ?
                ORDER BY r.timestamp DESC
            `;
            
            db.all(sql, [snippetId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    static async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE reports
                SET status = ?
                WHERE id = ?
            `;
            
            db.run(sql, [status, id], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }

    static async getPending(limit = 10) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, u.email as reporter_email, c.content as snippet_content
                FROM reports r
                LEFT JOIN users u ON r.user_id = u.id
                LEFT JOIN code_snippets c ON r.snippet_id = c.id
                WHERE r.status = 'pending'
                ORDER BY r.timestamp ASC
                LIMIT ?
            `;
            
            db.all(sql, [limit], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    static async getStats() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    COUNT(*) as total_reports,
                    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_reports,
                    SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved_reports,
                    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_reports
                FROM reports
            `;
            
            db.get(sql, [], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }
}

module.exports = Report; 