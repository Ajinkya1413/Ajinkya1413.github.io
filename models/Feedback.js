const db = require('../config/database');

class Feedback {
    static async create(userId, rating, liked = null, improvements = null, additionalComments = null) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO feedback (user_id, rating, liked, improvements, additional_comments)
                VALUES (?, ?, ?, ?, ?)
            `;
            
            db.run(sql, [userId || null, rating, liked, improvements, additionalComments], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID,
                    user_id: userId,
                    rating,
                    liked,
                    improvements,
                    additional_comments: additionalComments,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT f.*, u.email as user_email
                FROM feedback f
                LEFT JOIN users u ON f.user_id = u.id
                WHERE f.id = ?
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

    static async getAll(limit = 50, offset = 0) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT f.*, u.email as user_email
                FROM feedback f
                LEFT JOIN users u ON f.user_id = u.id
                ORDER BY f.timestamp DESC
                LIMIT ? OFFSET ?
            `;
            
            db.all(sql, [limit, offset], (err, rows) => {
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
                    COUNT(*) as total_feedback,
                    AVG(rating) as average_rating,
                    SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as positive_ratings,
                    SUM(CASE WHEN rating <= 2 THEN 1 ELSE 0 END) as negative_ratings
                FROM feedback
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

    static async getUserFeedback(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM feedback
                WHERE user_id = ?
                ORDER BY timestamp DESC
            `;
            
            db.all(sql, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
}

module.exports = Feedback; 