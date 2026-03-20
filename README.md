# Modern Authentication System

A fully functional, modern authentication system built with Node.js, Express, and PostgreSQL.

## Features
- Signup, Login, Forgot Password, Reset Password
- Modern Glassmorphism UI
- Animated Background
- PostgreSQL Database
- Password Hashing (bcryptjs)
- Responsive Design

## Tech Stack
- **Frontend:** HTML, CSS, Vanilla JS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

---

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd login
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database (locally or on a service like Supabase/Render).
   - Run the SQL commands in `schema.sql` to create the `users` table.

4. **Environment Variables**
   - Create a `.env` file in the root directory.
   - Add your connection string:
     ```env
     PORT=3000
     DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_db_name
     ```

5. **Run the application**
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

---

## Deployment to Render

1. **Create a PostgreSQL Database on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/).
   - Click **New** -> **PostgreSQL**.
   - Copy the **Internal Database URL** (or External for setup).
   - Once the DB is created, go to the **Connect** button and copy the connection string.

2. **Deploy the Web Service**
   - Click **New** -> **Web Service**.
   - Connect your GitHub repository.
   - **Environment:** `Node`.
   - **Build Command:** `npm install`.
   - **Start Command:** `npm start`.

3. **Configure Environment Variables on Render**
   - Go to the **Environment** tab of your Web Service.
   - Add `DATABASE_URL` and paste your PostgreSQL connection string.
   - Add `PORT` (e.g., `3000`).

4. **Database Migration**
   - Use a tool like `psql` or the Render Dashboard's shell to run `schema.sql`.

---

## Folder Structure
```text
/
├── public/           # Frontend files
│   ├── index.html    # Login
│   ├── signup.html   # Signup
│   ├── reset.html    # Reset Password
│   ├── message.html  # Status messages
│   └── style.css     # UI Styles
├── .env.example      # Environment variables template
├── package.json      # Dependencies
├── schema.sql        # Database schema
├── server.js         # Backend server
└── README.md         # Documentation
```
