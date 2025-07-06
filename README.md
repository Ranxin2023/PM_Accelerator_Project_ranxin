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
Built using **React (Create React App)**. It collects user input, interacts with the backend, and renders AI results.
- **React+jsx**:
- **React Router DOM**:
- **State Management**: useState, useEffect for form handling and async data.
- **Form Components**:  Collects user profile, resumes, job descriptions.
- **Axios**:
- **Agentic UX**:
- **Pages**:

### Backend
- **Express.js**
- **Body-parser / JSON Middleware**:
- **MongoDB + Mongoose**:
- **dotenv**:
- **Route Controllers**:
    - `POST /api/resume/analyze`:
    - 
- **Tools**:
### AI Agent
- **LLM Integration**:
    - Uses `fetch` or `axios` to call Azure-hosted DeepSeek APIs.
    - Authenticated with Azure API key and endpoint.
- **Prompt Engineering**:
    - All inputs are wrapped in structured prompts like:
        > "Compare the following resume with this job description. Return a JSON object with a match_score and 3 improvement suggestions."
- **Output Format**:
    - Structured **Json**:
    ```json
     {
        "match_score": 85,
        "suggestions": [
        "Add keywords like 'React' and 'Node.js'",
        "Include quantifiable achievements",
        "Tailor summary to match the JD tone"
        ]
    }
    ```

## Project Structure
### frontend
```
src/
│
├── components/             # Reusable UI components
│   ├── AuthLeftPanel.jsx   # Left panel for auth screens (Signup/Login)
│   └── Navbar.jsx          # Top navigation bar
│
├── context/                # Global React Contexts
│   └── UserContext.jsx     # User state context for login/session
│
├── pages/                  # Top-level route views
│   ├── ManuallyFill/       # Multi-step manual form input pages
│   │   └── step1.jsx        # Step 1: Role preference selection
│   ├── ForgotPassword.jsx  # Forgot password page
│   ├── HomePage.jsx        # Main dashboard/homepage after login
│   ├── SelectInputMethod.jsx # User picks upload vs manual form
│   ├── Signup.jsx          # Signup form
│   └── Welcome.jsx         # Welcome/Login screen
│
├── App.jsx                 # Root component, defines router layout
├── App.css                 # Global CSS
├── index.css               # Tailwind or reset styles
├── main.jsx                # Entry point, ReactDOM render logic
├── logo.svg                # App logo
├── reportWebVitals.js      # Performance monitoring (optional)
├── setupTests.js           # Test setup file for Jest/React Testing Library
└── App.test.js             # App-level unit test (sample)

```
### backend
```
backend/
├── routes/
│   ├── autofill.js
│   ├── answers.js
│   └── dashboard.js
│   ├── manuallyfill.js
│   ├── score.js
│   └── upload.js
├── models/
│   ├── User.js
│   └── Application.js
├── index.js
├── .env
└── ai/
    └── deepseek.js
```