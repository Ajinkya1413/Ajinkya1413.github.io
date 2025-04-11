const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

class User {
    static async create(email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            return new Promise((resolve, reject) => {
                const sql = 'INSERT INTO users (email, password, last_login_date, last_active_date) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
                db.run(sql, [email, hashedPassword], function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    const userId = this.lastID;
                    
                    resolve({
                        id: userId,
                        email
                    });
                });
            });
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    id, email, registration_date, last_login_date, 
                    total_games_played, total_score, streak_days, 
                    account_status, last_active_date
                FROM users 
                WHERE id = ?
            `;
            db.get(sql, [id], (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!user) {
                    resolve(null);
                    return;
                }
                
                const consentSql = `
                    SELECT * FROM user_consent
                    WHERE user_id = ?
                    ORDER BY timestamp DESC
                    LIMIT 1
                `;
                
                db.get(consentSql, [id], (consentErr, consent) => {
                    if (consentErr) {
                        reject(consentErr);
                        return;
                    }
                    
                    user.consent = consent || {
                        profile_data_consent: 0,
                        behavioral_data_consent: 0,
                        device_data_consent: 0,
                        marketing_consent: 0
                    };
                    
                    resolve(user);
                });
            });
        });
    }

    static async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }

    static generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
    }

    static async updateLastLogin(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE users 
                SET last_login_date = CURRENT_TIMESTAMP,
                    last_active_date = CURRENT_TIMESTAMP
                WHERE id = ?
            `;
            db.run(sql, [userId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }

    static async updateLastActive(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE users 
                SET last_active_date = CURRENT_TIMESTAMP
                WHERE id = ?
            `;
            db.run(sql, [userId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }

    static async updateGameStats(userId, score) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE users 
                SET total_games_played = total_games_played + 1,
                    total_score = total_score + ?,
                    streak_days = CASE 
                        WHEN date(last_active_date) = date('now', '-1 day') THEN streak_days + 1
                        WHEN date(last_active_date) = date('now') THEN streak_days
                        ELSE 1
                    END,
                    last_active_date = CURRENT_TIMESTAMP
                WHERE id = ?
            `;
            db.run(sql, [score, userId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }

    static async saveUserConsent(userId, consentData) {
        const {
            profileDataConsent,
            behavioralDataConsent,
            deviceDataConsent,
            marketingConsent,
            consentVersion
        } = consentData;

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO user_consent (
                    user_id, profile_data_consent, behavioral_data_consent,
                    device_data_consent, marketing_consent, consent_version
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            
            db.run(sql, [
                userId,
                profileDataConsent ? 1 : 0,
                behavioralDataConsent ? 1 : 0,
                deviceDataConsent ? 1 : 0,
                marketingConsent ? 1 : 0,
                consentVersion
            ], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID,
                    ...consentData
                });
            });
        });
    }

    static async getConsentStatus(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM user_consent
                WHERE user_id = ?
                ORDER BY timestamp DESC
                LIMIT 1
            `;
            
            db.get(sql, [userId], (err, consent) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!consent) {
                    resolve({
                        profile_data_consent: false,
                        behavioral_data_consent: false,
                        device_data_consent: false,
                        marketing_consent: false,
                        consent_version: null,
                        has_consented: false
                    });
                } else {
                    resolve({
                        profile_data_consent: !!consent.profile_data_consent,
                        behavioral_data_consent: !!consent.behavioral_data_consent,
                        device_data_consent: !!consent.device_data_consent,
                        marketing_consent: !!consent.marketing_consent,
                        consent_version: consent.consent_version,
                        timestamp: consent.timestamp,
                        has_consented: true
                    });
                }
            });
        });
    }

    static async getUserEngagementStats() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    COUNT(*) as total_users,
                    COUNT(CASE WHEN date(last_active_date) >= date('now', '-1 day') THEN 1 END) as daily_active_users,
                    COUNT(CASE WHEN date(last_active_date) >= date('now', '-7 day') THEN 1 END) as weekly_active_users,
                    COUNT(CASE WHEN date(last_active_date) >= date('now', '-30 day') THEN 1 END) as monthly_active_users,
                    AVG(total_games_played) as avg_games_per_user,
                    MAX(total_games_played) as max_games_per_user,
                    COUNT(CASE WHEN total_games_played >= 10 THEN 1 END) as engaged_users,
                    CAST(COUNT(CASE WHEN total_games_played >= 10 THEN 1 END) AS REAL) / COUNT(*) as engagement_rate,
                    AVG(streak_days) as avg_streak_days,
                    MAX(streak_days) as max_streak_days
                FROM users
            `;
            
            db.get(sql, [], (err, stats) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(stats);
            });
        });
    }

    static async getUserConsentStats() {
        return new Promise((resolve, reject) => {
            const sql = `
                WITH latest_consent AS (
                    SELECT 
                        user_id,
                        MAX(timestamp) as latest_timestamp
                    FROM user_consent
                    GROUP BY user_id
                )
                SELECT 
                    COUNT(DISTINCT uc.user_id) as total_consented_users,
                    SUM(CASE WHEN uc.profile_data_consent = 1 THEN 1 ELSE 0 END) as profile_data_consents,
                    SUM(CASE WHEN uc.behavioral_data_consent = 1 THEN 1 ELSE 0 END) as behavioral_data_consents,
                    SUM(CASE WHEN uc.device_data_consent = 1 THEN 1 ELSE 0 END) as device_data_consents,
                    SUM(CASE WHEN uc.marketing_consent = 1 THEN 1 ELSE 0 END) as marketing_consents,
                    COUNT(DISTINCT lc.user_id) as total_users_with_consent,
                    (SELECT COUNT(*) FROM users) as total_users
                FROM user_consent uc
                JOIN latest_consent lc ON uc.user_id = lc.user_id AND uc.timestamp = lc.latest_timestamp
            `;
            
            db.get(sql, [], (err, stats) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (stats) {
                    stats.consent_rate = stats.total_users > 0 
                        ? stats.total_users_with_consent / stats.total_users 
                        : 0;
                }
                
                resolve(stats);
            });
        });
    }

    static async updateAccountStatus(userId, status) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE users 
                SET account_status = ?
                WHERE id = ?
            `;
            db.run(sql, [status, userId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }
}

module.exports = User; 