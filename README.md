# Code Guesser Game

A web-based game where players guess the tags associated with code snippets. Test your programming knowledge and learn new concepts!

## Features

- **Interactive Gameplay**: Guess tags for code snippets within a time limit
- **User Authentication**: Register, login, or play as a guest
- **Score Tracking**: Track your performance across multiple game sessions
- **Leaderboard**: See how you rank against other players
- **Report System**: Report issues with code snippets or tags
- **Feedback System**: Provide feedback to help improve the game

## Backend Features

- **User Authentication**: JWT-based authentication system
- **Data Collection**: Track game sessions, user performance, and feedback
- **API Endpoints**: RESTful API for all game functionalities
- **Database**: SQLite database for storing all game data
- **Admin Dashboard**: Manage code snippets, reports, and view feedback

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd code_guesser_game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     JWT_SECRET=your-secret-key-here
     NODE_ENV=development
     ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Access the application:
   - Open your browser and navigate to `http://localhost:3000`
   - For the admin dashboard, go to `http://localhost:3000/public/admin.html`

### Directory Structure

```
code_guesser_game/
├── config/             # Configuration files
├── controllers/        # Route controllers
├── db/                 # Database files
├── middleware/         # Middleware functions
├── models/             # Database models
├── public/             # Static files
├── routes/             # API routes
├── .env                # Environment variables
├── package.json        # Project dependencies
├── server.js           # Main server file
└── README.md           # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Game
- `POST /api/game/session` - Save game session
- `GET /api/game/history` - Get user's game history
- `GET /api/game/stats` - Get user's stats
- `GET /api/game/leaderboard` - Get top scores

### Snippets
- `GET /api/snippets/random` - Get random snippets
- `GET /api/snippets/bytags` - Get snippets by tags
- `POST /api/snippets/:id/report` - Report a snippet
- `POST /api/snippets` - Add a new snippet (admin only)

### Reports
- `GET /api/reports/pending` - Get pending reports (admin only)
- `GET /api/reports/stats` - Get report statistics (admin only)
- `PATCH /api/reports/:id/status` - Update report status (admin only)

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin only)
- `GET /api/feedback/stats` - Get feedback statistics (admin only)
- `GET /api/feedback/my` - Get user's feedback history

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 