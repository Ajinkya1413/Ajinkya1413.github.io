const db = require('../config/database');

class GameSession {
    // Create a new game session with enhanced data collection
    static async create(sessionData) {
        const {
            userId,
            deviceType,
            browser,
            os,
            finalScore,
            roundsCompleted,
            hintsUsed,
            difficultyLevel,
            sessionCompleted,
            isGuest,
            ipAddress,
            userAgent
        } = sessionData;

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO game_sessions (
                    user_id, device_type, browser, os, 
                    final_score, rounds_completed, hints_used, 
                    difficulty_level, session_completed, is_guest,
                    ip_address, user_agent, session_start
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `;
            
            db.run(sql, [
                userId || null, 
                deviceType || null, 
                browser || null, 
                os || null,
                finalScore || 0,
                roundsCompleted || 0,
                hintsUsed || 0,
                difficultyLevel || 2,
                sessionCompleted ? 1 : 0,
                isGuest ? 1 : 0,
                ipAddress || null,
                userAgent || null
            ], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID,
                    ...sessionData
                });
            });
        });
    }

    // End a game session by updating end time and duration
    static async endSession(sessionId, finalScore, totalDuration) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE game_sessions
                SET session_end = CURRENT_TIMESTAMP,
                    total_duration_seconds = ?,
                    final_score = ?,
                    session_completed = 1
                WHERE id = ?
            `;
            
            db.run(sql, [totalDuration, finalScore, sessionId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }

    // Record round data for a session
    static async saveRoundData(roundData) {
        const {
            sessionId,
            roundNumber,
            snippetId,
            correctTags,
            userTags,
            startTime,
            endTime,
            timeSpentSeconds,
            score,
            correctCount,
            incorrectCount,
            hintUsed,
            bonusPoints
        } = roundData;

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO round_data (
                    session_id, round_number, snippet_id, correct_tags,
                    user_tags, start_time, end_time, time_spent_seconds,
                    score, correct_count, incorrect_count, 
                    hint_used, bonus_points
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            db.run(sql, [
                sessionId,
                roundNumber,
                snippetId,
                JSON.stringify(correctTags),
                JSON.stringify(userTags),
                startTime,
                endTime,
                timeSpentSeconds,
                score,
                correctCount,
                incorrectCount,
                hintUsed ? 1 : 0,
                bonusPoints || 0
            ], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID,
                    ...roundData
                });
            });
        });
    }

    // Record user actions during gameplay
    static async logAction(actionData) {
        const {
            sessionId,
            userId,
            actionType,
            actionValue,
            roundNumber
        } = actionData;

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO game_actions (
                    session_id, user_id, action_type, 
                    action_value, round_number, action_time
                )
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `;
            
            db.run(sql, [
                sessionId,
                userId || null,
                actionType,
                actionValue || null,
                roundNumber || null
            ], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID
                });
            });
        });
    }

    // Save technical performance data
    static async saveTechnicalData(techData) {
        const {
            sessionId,
            pageLoadTimeMs,
            networkType,
            screenResolution,
            memoryUsage,
            errorsEncountered
        } = techData;

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO technical_data (
                    session_id, page_load_time_ms, network_type,
                    screen_resolution, memory_usage, errors_encountered
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            
            db.run(sql, [
                sessionId,
                pageLoadTimeMs || null,
                networkType || null,
                screenResolution || null,
                memoryUsage || null,
                errorsEncountered || null
            ], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID
                });
            });
        });
    }

    // Get user's game history with detailed data
    static async getUserSessions(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    gs.*, 
                    COUNT(rd.id) as rounds_count,
                    AVG(rd.time_spent_seconds) as avg_time_per_round
                FROM game_sessions gs
                LEFT JOIN round_data rd ON gs.id = rd.session_id
                WHERE gs.user_id = ?
                GROUP BY gs.id
                ORDER BY gs.session_start DESC
            `;
            
            db.all(sql, [userId], (err, sessions) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (sessions.length === 0) {
                    resolve([]);
                    return;
                }
                
                // For each session, get the round data
                const getSessionDetails = sessions.map(session => {
                    return new Promise((resolveSession, rejectSession) => {
                        const roundSql = `
                            SELECT * FROM round_data
                            WHERE session_id = ?
                            ORDER BY round_number
                        `;
                        
                        db.all(roundSql, [session.id], (roundErr, rounds) => {
                            if (roundErr) {
                                rejectSession(roundErr);
                                return;
                            }
                            
                            rounds.forEach(round => {
                                if (round.correct_tags) {
                                    round.correct_tags = JSON.parse(round.correct_tags);
                                }
                                if (round.user_tags) {
                                    round.user_tags = JSON.parse(round.user_tags);
                                }
                            });
                            
                            session.rounds = rounds;
                            resolveSession(session);
                        });
                    });
                });
                
                Promise.all(getSessionDetails)
                    .then(sessionsWithDetails => resolve(sessionsWithDetails))
                    .catch(detailsErr => reject(detailsErr));
            });
        });
    }

    // Get specific game session with detailed data
    static async getSessionById(sessionId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT gs.* FROM game_sessions gs
                WHERE gs.id = ?
            `;
            
            db.get(sql, [sessionId], (err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!session) {
                    resolve(null);
                    return;
                }
                
                // Get round data for this session
                const roundSql = `
                    SELECT * FROM round_data
                    WHERE session_id = ?
                    ORDER BY round_number
                `;
                
                db.all(roundSql, [sessionId], (roundErr, rounds) => {
                    if (roundErr) {
                        reject(roundErr);
                        return;
                    }
                    
                    rounds.forEach(round => {
                        if (round.correct_tags) {
                            round.correct_tags = JSON.parse(round.correct_tags);
                        }
                        if (round.user_tags) {
                            round.user_tags = JSON.parse(round.user_tags);
                        }
                    });
                    
                    session.rounds = rounds;
                    
                    // Get actions for this session
                    const actionsSql = `
                        SELECT * FROM game_actions
                        WHERE session_id = ?
                        ORDER BY action_time
                    `;
                    
                    db.all(actionsSql, [sessionId], (actionsErr, actions) => {
                        if (actionsErr) {
                            reject(actionsErr);
                            return;
                        }
                        
                        session.actions = actions;
                        resolve(session);
                    });
                });
            });
        });
    }

    // Get top scores from the leaderboard
    static async getTopScores(limit = 10) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    g.id, g.user_id, g.final_score as score, 
                    g.session_start, g.rounds_completed,
                    u.email as user_email
                FROM game_sessions g
                LEFT JOIN users u ON g.user_id = u.id
                WHERE g.session_completed = 1
                AND g.is_guest = 0
                ORDER BY g.final_score DESC
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

    // Get comprehensive user statistics
    static async getUserStats(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    COUNT(*) as total_games,
                    SUM(final_score) as total_score,
                    AVG(final_score) as average_score,
                    MAX(final_score) as highest_score,
                    AVG(total_duration_seconds) as avg_game_duration,
                    COUNT(CASE WHEN session_completed = 1 THEN 1 END) as completed_games,
                    COUNT(CASE WHEN session_completed = 0 THEN 1 END) as abandoned_games,
                    SUM(hints_used) as total_hints_used
                FROM game_sessions
                WHERE user_id = ?
            `;
            
            db.get(sql, [userId], (err, basicStats) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                // Get tag accuracy stats
                const tagsSql = `
                    SELECT 
                        COUNT(CASE WHEN rd.correct_count > 0 THEN 1 END) as correct_tag_sessions,
                        SUM(rd.correct_count) as total_correct_tags,
                        SUM(rd.incorrect_count) as total_incorrect_tags,
                        CASE 
                            WHEN SUM(rd.correct_count + rd.incorrect_count) > 0 
                            THEN CAST(SUM(rd.correct_count) AS REAL) / SUM(rd.correct_count + rd.incorrect_count) 
                            ELSE 0 
                        END as tag_accuracy
                    FROM round_data rd
                    JOIN game_sessions gs ON rd.session_id = gs.id
                    WHERE gs.user_id = ?
                `;
                
                db.get(tagsSql, [userId], (tagsErr, tagStats) => {
                    if (tagsErr) {
                        reject(tagsErr);
                        return;
                    }
                    
                    resolve({
                        ...basicStats,
                        ...tagStats,
                        completion_rate: basicStats.total_games > 0 
                            ? basicStats.completed_games / basicStats.total_games 
                            : 0
                    });
                });
            });
        });
    }

    // Get analytics about most common tags, languages, etc.
    static async getGameAnalytics() {
        return new Promise((resolve, reject) => {
            const queries = {
                popularSnippets: `
                    SELECT 
                        cs.id, cs.tags, cs.languages, cs.difficulty_level,
                        COUNT(rd.id) as play_count,
                        AVG(rd.score) as avg_score,
                        AVG(rd.time_spent_seconds) as avg_time
                    FROM code_snippets cs
                    JOIN round_data rd ON cs.id = rd.snippet_id
                    GROUP BY cs.id
                    ORDER BY play_count DESC
                    LIMIT 10
                `,
                tagAccuracy: `
                    SELECT 
                        ROUND(CAST(SUM(rd.correct_count) AS REAL) / NULLIF(SUM(rd.correct_count + rd.incorrect_count), 0) * 100, 2) as accuracy_percentage,
                        COUNT(rd.id) as round_count
                    FROM round_data rd
                `,
                sessionTimes: `
                    SELECT 
                        AVG(total_duration_seconds) as avg_duration,
                        MIN(total_duration_seconds) as min_duration,
                        MAX(total_duration_seconds) as max_duration
                    FROM game_sessions
                    WHERE session_completed = 1
                `,
                userRetention: `
                    SELECT 
                        COUNT(DISTINCT user_id) as total_users,
                        COUNT(DISTINCT CASE WHEN session_count > 1 THEN user_id END) as returning_users
                    FROM (
                        SELECT user_id, COUNT(id) as session_count
                        FROM game_sessions
                        WHERE user_id IS NOT NULL
                        GROUP BY user_id
                    )
                `,
                deviceBreakdown: `
                    SELECT 
                        device_type, COUNT(*) as count, 
                        ROUND(CAST(COUNT(*) AS REAL) / (SELECT COUNT(*) FROM game_sessions) * 100, 2) as percentage
                    FROM game_sessions
                    GROUP BY device_type
                    ORDER BY count DESC
                `
            };
            
            const analytics = {};
            const queryPromises = Object.entries(queries).map(([key, query]) => {
                return new Promise((resolveQuery, rejectQuery) => {
                    db.all(query, [], (err, result) => {
                        if (err) {
                            rejectQuery(err);
                            return;
                        }
                        analytics[key] = key.endsWith('s') ? result : result[0];
                        resolveQuery();
                    });
                });
            });
            
            Promise.all(queryPromises)
                .then(() => resolve(analytics))
                .catch(err => reject(err));
        });
    }
}

module.exports = GameSession; 