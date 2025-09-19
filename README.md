# Digital Signage Application
*Digital Signage Platform for Internal Communications*  
*Maintained by et3rnal.xyz*  

---

## 📖 Overview
The **Digital Signage Application** is a React + Node.js based platform designed to display rotating content on TVs. It automatically cycles through a set of slides every 10 seconds with smooth fade transitions and a progress bar.

Slides cover key categories such as **Looking Ahead (Announcements)**, **Birthdays**, **Events**, **New Hires**, **Promotions**, **Reminders**, **Weather & Traffic**, and a customizable **Message** slide.

An **Admin Panel** allows staff to add, edit, or remove entries in each section via a simple web interface. All content is stored in local JSON files and served via a lightweight Express backend.

---

## ⚙️ System Requirements
- Node.js v18 or later  
- npm or yarn package manager  
- Web browser (Chrome, Edge, or Firefox)  
- OpenWeatherMap API Key (for weather data)  
- (Optional) Internet connection (for traffic map)  

---

## 📂 Project Structure
\`\`\`
digital-signage/
├── src/
│   ├── assets/               # Images, logos, backgrounds, flags
│   ├── components/           # React components (slides & admin)
│   ├── data/                 # JSON data files (editable)
│   ├── App.jsx               # Router (Signage / Admin views)
│   ├── Signage.jsx           # Main rotating signage component
│   └── config.js             # Global settings (timers, formats)
├── server.js                 # Express backend for JSON API
├── package.json              # Dependencies & scripts
└── DOCUMENTATION.md          # This documentation file
\`\`\`

---

## 🖥️ Slides & Features

### Looking Ahead (Announcements)
Displays upcoming company news. Title + optional details (hidden if 'N/A').

### Birthdays
Automatically shows [Month] Birthdays! with employee names and dates (MM/DD).

### Events
Displays events with **title, date, location, description**.

### New Hires
Welcomes new employees with name, role, hire date, and area.

### Promotions
Highlights promotions with old role → new role. Title auto-updates to [Month] Promotions!.

### Reminders
Displays reminders with title and details. Title auto-updates to [Month] Reminders!.

### Weather & Traffic
Shows current weather + 5-day forecast for up to 4 cities (OpenWeatherMap).  
Displays **Waze live traffic map** for Nashville, TN.

### Message (Vision)
Displays Company logo and editable company message (e.g., vision/mission).

---

## 🛠️ Admin Panel
Accessible at: `http://localhost:5173/admin`  

Features:  
- Sidebar navigation for each section  
- Collapsible entry cards (click to expand & edit)  
- Add, edit, or delete entries  
- Save changes directly to JSON files (`src/data/`)  
- Custom names: **Announcements → Looking Ahead**, **Message → Message (Vision)**  

---

## 🚀 How to Run

1. Clone repository:  
   \`\`\`bash
   git clone <repo-url>
   cd digital-signage
   \`\`\`

2. Install dependencies:  
   \`\`\`bash
   npm install
   \`\`\`

3. Add OpenWeatherMap API key in `.env`:  
   \`\`\`
   VITE_WEATHER_API_KEY=your_api_key_here
   \`\`\`

4. Run Express backend:  
   \`\`\`bash
   node server.js
   \`\`\`

5. Run React app (development):  
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open in browser:  
   - Signage → http://localhost/
   - Admin → http://localhost:0000/admin

---

## 📊 Technical Details
- Frontend: React + Vite, TailwindCSS  
- Backend: Node.js + Express  
- Data: JSON files served via REST API  
- Weather: OpenWeatherMap API  
- Traffic: Waze embedded map (4 cities max)
- Hosting (planned): Local server, Docker, or cloud  

---

## 🔮 Future Enhancements
- Authentication for Admin Panel (SSO/Keycloak)  
- Rich media support (images, videos, PDFs)  
- Custom scheduling for slides  
- Multiple TV screen rotations  
- Themes & branding options  
