# AI-Powered Job Application Assistant

## Plan for this project
### Autofill Agent Developer
- **responsibilities**:
    - Create a user profile schema (MongoDB or JSON).
    - Build a secure form to store and autofill name, contact, work history, and education.
    - Implement frontend form (React).
    - Connect form to backend API to store/fetch data.
### Key Files:

###  Resume-to-JD Scoring Agent Developer
- **responsibilities**:
    - Implement backend logic to compare resumes and job descriptions.
    - Return a "match score" and improvement suggestions.
    - Build a minimal UI for file upload and score display.

### Tailored Answer Agent Developer
- **responsibilities**:
    - Implement backend logic to compare resumes and job descriptions.
    - Build a minimal UI for file upload and score display.

### Tailored Answer Agent Developer
- **responsibities**:
    - Build an input field for JD and a button to generate answers.
    - Output: AI-generated answers to:
        - “Why are you a good fit for this role?”
        - “What is your biggest strength?”

### Application Dashboard
- **responsibity**:
    - Design UI to show job applications and current status.
    - Implement backend to track application states:
        `Not Submitted`, `Submitted`, `Interview`, `Rejected`, etc. 
    - Add ability to update status per job.

### 
- **responsibility**:
    - Ensure all APIs are wired to frontend components.
    - Set up Postman or Swagger for testing routes.
    - Handle authentication (optional).
    - Deploy to Vercel/Render or localhost demo.

## Setup
### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Techs
### Frontend
| Technology            | How It's Used                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **React**             | Core framework used to build reusable UI components (`App.jsx`, pages under `src/pages/`)             |
| **Vite**              | Fast build tool for local dev server, HMR, and optimized builds (`vite.config.js`)                    |
| **Tailwind CSS**      | Utility-first CSS used for styling all components (`App.css`, `index.css`, JSX class names)           |
| **React Router DOM**  | Handles page routing and navigation between views (`useNavigate`, `<Route>`, `<Link>`)                |
| **React Context API** | Global state management used via `useContext` to share auth state, preferences, or user info globally |
| **FormData API**      | Used in `ResumeScore.jsx` to send multipart form data (resume file + job description) to the backend  |
| **Fetch API**         | Makes HTTP requests to backend REST APIs for posting questions, analyzing resumes, etc.               |
| **HTML/CSS**          | Used in static files (`public/` folder), `index.html`, and in JSX for layout and semantic structure   |
| **localStorage**      | Stores user tokens, preferences, and temporary state like resume uploads between page reloads         |
| **useNavigate**       | Redirects users to different pages after events like login/signup or posting answers                  |
| **useContext**        | Shares state such as user authentication and preferences across components                            |

### Backend
| Technology             | How It's Used                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Node.js**            | JavaScript runtime used to run the Express server (`backend/index.js`)                                           |
| **Express.js**         | Web framework for defining all RESTful API endpoints (`routes/`)                                                 |
| **MongoDB**            | Stores all persistent data: users, forum posts, answers, resume analysis logs                                    |
| **Mongoose**           | Defines schemas and interacts with MongoDB (e.g., `User.js`, `Question.js`, `Application.js`)                    |
| **Multer**             | Handles file uploads, particularly resumes (`upload.single("resume")` in `analyze.js`)                           |
| **pdf-parse**          | Parses uploaded resumes (PDF) and extracts raw text for GPT analysis                                             |
| **OpenAI API**         | Used in `analyze.js` and `answers.js` to send resume + job description or answer custom questions to GPT model (e.g., `gpt-4o-mini`) and receive match score |
| **dotenv**             | Loads environment variables (e.g., `OPENAI_API_KEY`) from `.env` into `process.env`                              |
| **CORS**               | Allows cross-origin requests between frontend (`localhost:5173`) and backend (`localhost:5000`)                  |
| **bcrypt**             | Used in `auth.js` to hash passwords before saving them to the database                                           |


## Project Structure
### frontend
```
├── public/
│   ├── appstore.png
│   ├── favicon.ico
│   ├── googleplay.png
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/           # Reusable UI components
│   ├── context/              # Context API providers and global state
│   └── pages/                # Page-level components / routes
│       ├── Dashboard.jsx
│       ├── ForgotPassword.jsx
│       ├── Forum.jsx
│       ├── GenerateAnswers.jsx
│       ├── HomePage.jsx
│       ├── JobApplicationPage.jsx
│       ├── Preferences.jsx
│       ├── ResumeForm.jsx
│       ├── ResumeManual.jsx
│       ├── ResumeScore.jsx
│       ├── SelectInputMethod.jsx
│       ├── Signup.jsx
│       └── Welcome.jsx
│
├── App.jsx                   # Main app wrapper with routing
├── App.css                   # Global styles
├── App.test.js               # Basic test file
├── index.css                 # Entry stylesheet
├── index.html                # HTML template
├── main.jsx                  # React entry point
├── reportWebVitals.js        # Performance metrics
├── setupTests.js             # Test setup
│
├── .env                      # Environment variables
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js            # Vite build configuration
├── README.md
└── old_package.txt           # (Possibly backup or archived config)


```
### backend
```
backend/
│
├── models/                 # Mongoose schemas
│   ├── Application.js      # Job application model
│   ├── Question.js         # Forum Q&A schema
│   └── User.js             # User schema
│
├── routes/                 # API route handlers
│   ├── analyze.js          # Resume analysis with OpenAI API
│   ├── answers.js          # Post and manage answers to forum questions
│   ├── applications.js     # Job application endpoints
│   ├── auth.js             # Authentication endpoints (login/signup)
│   ├── autofill.js         # Resume autofill logic
│   ├── dashboard.js        # Dashboard-related endpoints
│   ├── forum.js            # Post and fetch forum questions
│   ├── manuallyfill.js     # Manual resume entry endpoints
│   ├── preference.js       # User job preference endpoints
│   ├── profile.js          # User profile updates
│   └── upload.js           # Resume upload handling (Multer + OpenAI)
│
├── uploads/                # Temporary storage for uploaded resumes
│
├── index.js                # Entry point for Express server
├── package.json
└── package-lock.json

```