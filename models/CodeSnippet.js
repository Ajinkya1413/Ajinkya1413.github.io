const db = require('../config/database');

class CodeSnippet {
    static async create(content, tags, description = null, sourceLink = null) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO code_snippets (content, tags, description, source_link)
                VALUES (?, ?, ?, ?)
            `;
            
            db.run(sql, [content, JSON.stringify(tags), description, sourceLink], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    id: this.lastID,
                    content,
                    tags,
                    description,
                    source_link: sourceLink,
                    report_count: 0
                });
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM code_snippets WHERE id = ?';
            
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (row) {
                    row.tags = JSON.parse(row.tags);
                }
                resolve(row);
            });
        });
    }

    static async getRandomSnippets(count = 1) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM code_snippets
                ORDER BY RANDOM()
                LIMIT ?
            `;
            
            db.all(sql, [count], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => ({
                    ...row,
                    tags: JSON.parse(row.tags)
                })));
            });
        });
    }

    static async getByTags(tags, limit = 10) {
        return new Promise((resolve, reject) => {
            const placeholders = tags.map(() => '?').join(' OR ');
            const sql = `
                SELECT * FROM code_snippets
                WHERE tags LIKE ${placeholders}
                LIMIT ?
            `;
            
            const params = [...tags.map(tag => `%${tag}%`), limit];
            
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => ({
                    ...row,
                    tags: JSON.parse(row.tags)
                })));
            });
        });
    }

    static async incrementReportCount(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE code_snippets
                SET report_count = report_count + 1
                WHERE id = ?
            `;
            
            db.run(sql, [id], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }

    static async getMostReported(limit = 10) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM code_snippets
                WHERE report_count > 0
                ORDER BY report_count DESC
                LIMIT ?
            `;
            
            db.all(sql, [limit], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => ({
                    ...row,
                    tags: JSON.parse(row.tags)
                })));
            });
        });
    }
}

module.exports = CodeSnippet; 