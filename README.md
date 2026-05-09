# AlibiOS 🕵️‍♂️

**AlibiOS** is an AI-powered, terminal-themed excuse generator and simulation dashboard. Need a bulletproof excuse for missing a deadline, skipping a meeting, or ghosting an event? AlibiOS has you covered. It uses Google's Gemini AI to craft creative, context-aware excuses based on different categories, modes, and adjustable "truth levels". It can even generate official-looking PDF reports to back up your claims!

## ✨ Features

- **AI-Powered Excuse Generation:** Leverages Google's Gemini API to generate contextual and highly creative excuses.
- **Multiple Categories & Modes:**
  - **Categories:** Tech Disaster, Family Chaos, Medical Emergency, Internet Collapse, Existential Crisis, Emotional Breakdown.
  - **Modes:** Safe Mode, Netflix Drama, Corporate Employee, Chaotic Neutral, Indian Student Ranked.
- **Truth Slider:** Adjust the plausibility of your excuse from completely grounded in reality to absolutely absurd.
- **Fake Terminal UI:** An immersive, matrix-style cyberpunk dashboard aesthetic.
- **PDF Report Generation:** Generate plausible (and fake) PDF reports to serve as "evidence" for your excuse.
- **Probability Charts & Threat Meters:** Interactive data visualizations measuring the "success probability" of your excuse.

## 🛠 Tech Stack

**Frontend:**
- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS (v4), Custom CSS (`scanlines`, terminal effects)
- **Animations:** Framer Motion, React TS Particles, React Type Animation
- **Icons & Charts:** Lucide React, Recharts
- **PDF/Image Generation:** HTML2Canvas, jsPDF

**Backend:**
- **Framework:** FastAPI
- **AI Integration:** Google Generative AI (`google-generativeai`)
- **PDF Generation:** FPDF
- **Environment Management:** python-dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18+)
- Python 3.9+
- A Google Gemini API Key

## 🚀 Installation & Setup

### 1. Clone the repository (if applicable)
```bash
git clone https://github.com/your-username/AlibiOS.git
cd AlibiOS
```

### 2. Backend Setup
Navigate to the backend directory, set up a virtual environment, and install dependencies:

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory to point to your local backend API:
```env
VITE_API_URL=http://127.0.0.1:8000
```

## 💻 Running the Application

You will need two terminal windows to run both the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
# Make sure your venv is activated
uvicorn main:app --reload
```
*The backend will be available at `http://127.0.0.1:8000`*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*The frontend will typically be available at `http://localhost:5173`*

## 📁 Project Structure

```
AlibiOS/
├── backend/
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   ├── prompts/              # System prompts for Gemini AI
│   └── services/
│       ├── gemini.py         # AI interaction logic
│       ├── pdf.py            # PDF generation logic
│       └── scoring.py        # Logic for excuse metrics
└── frontend/
    ├── package.json          # Node dependencies and scripts
    ├── index.html            # Entry HTML file
    ├── vite.config.js        # Vite configuration
    ├── public/               # Static assets (audio, favicons)
    └── src/
        ├── App.jsx           # Main React component
        ├── main.jsx          # React DOM render entry
        ├── cards/            # Reusable UI card components
        ├── charts/           # Recharts components
        ├── components/       # UI elements (Navbar, FakeTerminal, etc.)
        ├── pages/            # Page components (Dashboard)
        └── styles/           # Global and component-specific CSS
```

## 🔌 API Endpoints

- `GET /`: Health check endpoint. Returns `{"message": "ALIBI OS ACTIVE"}`.
- `POST /generate`: Generates an excuse. Expects JSON body with `assignment`, `deadline`, `situation`, `category`, `mode`, and `truthLevel`.
- `POST /report`: Generates a PDF report based on excuse data and returns the file.

---
*Disclaimer: AlibiOS is built for entertainment and parody purposes. Please use responsibly.*
