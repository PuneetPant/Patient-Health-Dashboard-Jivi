# 🩺 Patient Health Dashboard

A **React-based patient management dashboard** with light/dark theme support, AI-powered insights, and PDF export. The app tracks patient vitals, medications, and appointments while providing a summarized health score and AI recommendations.

---

## 🚀 Tech Stack

- **React**
- **Recharts** for data visualization
- **Google Gemini API**
- **jsPDF** & **html2canvas** for PDF export
- **react-toastify** for notifications
- **CSS variables** for theming

---

## ✨ Features

### 👨‍⚕️ Patient Management

- Sidebar with searchable patient list and profile photos
- Detailed patient header with demographics and health score

### 📈 Vitals & Progress Tracking

- Responsive charts with multiple vital trends
- Progress tracking for recent history

### 🚨 Smart Alerts

- Missed medication reminders
- Appointment alerts (upcoming in the next 24 hours)
- Toast notifications when switching patients

### 🟢 Health Score

- Calculated based on vitals, medication adherence, and appointments
- Color-coded ranges: good, moderate, poor

### 🤖 AI Health Insights

- Integrated with LLM (Gemini / OpenAI / Groq) via a custom hook (`useHealthInsights`)
- Auto-generated health recommendations displayed in a modal
- Includes a disclaimer: _Not a substitute for professional medical advice_

### 📄 Patient Summary PDF

- Downloadable PDF with vitals, medications, appointments, health score, and AI insights
- Generated using jsPDF and html2canvas

### 🎨 Themes

- Dark mode and light mode toggle
- Consistent styling with CSS variables
