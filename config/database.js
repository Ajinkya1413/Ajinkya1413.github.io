const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../db/game.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to SQLite database');
    
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
    
    // Create tables
    createTables();
});

function createTables() {
    // Drop existing tables if they exist to rebuild the schema
    const dropTables = [
        `DROP TABLE IF EXISTS feedback`,
        `DROP TABLE IF EXISTS reports`,
        `DROP TABLE IF EXISTS game_actions`,
        `DROP TABLE IF EXISTS round_data`,
        `DROP TABLE IF EXISTS game_sessions`,
        `DROP TABLE IF EXISTS user_consent`,
        `DROP TABLE IF EXISTS technical_data`,
        `DROP TABLE IF EXISTS code_snippets`,
        `DROP TABLE IF EXISTS users`
    ];

    // Create new schema with enhanced data collection
    const tables = [
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login_date DATETIME,
            total_games_played INTEGER DEFAULT 0,
            total_score INTEGER DEFAULT 0,
            streak_days INTEGER DEFAULT 0,
            last_active_date DATETIME,
            account_status TEXT DEFAULT 'active'
        )`,
        
        `CREATE TABLE IF NOT EXISTS user_consent (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            profile_data_consent BOOLEAN DEFAULT 0,
            behavioral_data_consent BOOLEAN DEFAULT 0, 
            device_data_consent BOOLEAN DEFAULT 0,
            marketing_consent BOOLEAN DEFAULT 0,
            consent_version TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS code_snippets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            tags TEXT NOT NULL,
            languages TEXT NOT NULL,
            difficulty_level INTEGER DEFAULT 2, 
            description TEXT,
            source_link TEXT,
            report_count INTEGER DEFAULT 0,
            success_rate REAL DEFAULT 0,
            times_played INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        
        `CREATE TABLE IF NOT EXISTS game_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            device_type TEXT,
            browser TEXT,
            os TEXT,
            session_start DATETIME DEFAULT CURRENT_TIMESTAMP,
            session_end DATETIME,
            total_duration_seconds INTEGER,
            final_score INTEGER NOT NULL,
            avg_time_per_round REAL,
            rounds_completed INTEGER,
            hints_used INTEGER DEFAULT 0,
            difficulty_level INTEGER DEFAULT 2,
            session_completed BOOLEAN DEFAULT 0,
            is_guest BOOLEAN,
            ip_address TEXT,
            user_agent TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS round_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER NOT NULL,
            round_number INTEGER NOT NULL,
            snippet_id INTEGER NOT NULL,
            correct_tags TEXT NOT NULL,
            user_tags TEXT NOT NULL,
            start_time DATETIME,
            end_time DATETIME,
            time_spent_seconds INTEGER,
            score INTEGER,
            correct_count INTEGER,
            incorrect_count INTEGER,
            hint_used BOOLEAN DEFAULT 0,
            bonus_points INTEGER DEFAULT 0,
            FOREIGN KEY (session_id) REFERENCES game_sessions(id),
            FOREIGN KEY (snippet_id) REFERENCES code_snippets(id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS game_actions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER,
            user_id INTEGER,
            action_type TEXT NOT NULL,
            action_value TEXT,
            action_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            round_number INTEGER,
            FOREIGN KEY (session_id) REFERENCES game_sessions(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS technical_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER,
            page_load_time_ms INTEGER,
            network_type TEXT,
            screen_resolution TEXT,
            memory_usage TEXT,
            errors_encountered TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (session_id) REFERENCES game_sessions(id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            snippet_id INTEGER NOT NULL,
            user_id INTEGER,
            session_id INTEGER,
            reason TEXT NOT NULL,
            details TEXT,
            status TEXT DEFAULT 'pending',
            admin_notes TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (snippet_id) REFERENCES code_snippets(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (session_id) REFERENCES game_sessions(id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            session_id INTEGER,
            rating INTEGER NOT NULL,
            ui_rating INTEGER,
            difficulty_rating INTEGER,
            enjoyment_rating INTEGER,
            liked TEXT,
            improvements TEXT,
            additional_comments TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (session_id) REFERENCES game_sessions(id)
        )`
    ];

    db.serialize(() => {
        // Drop tables in reverse order to avoid foreign key constraints
        dropTables.forEach(dropTable => {
            db.run(dropTable, err => {
                if (err) {
                    console.error('Error dropping table:', err);
                }
            });
        });
        
        // Create new tables
        tables.forEach(table => {
            db.run(table, err => {
                if (err) {
                    console.error('Error creating table:', err);
                }
            });
        });
        
        console.log('Database schema recreated with enhanced analytics capabilities');
    });
}

module.exports = db; 