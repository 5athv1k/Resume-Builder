# Resume Made Easy — Professional Resume Builder

A modern, feature-rich resume builder built with pure HTML, CSS, and JavaScript. Create stunning, professional resumes with a real-time preview and export them as clean PDF documents.

![Resume Made Easy](https://img.shields.io/badge/version-1.0.0-6c63ff?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square) ![Tech](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-blue?style=flat-square)

---

## ✨ Features

- **Multi-Section Resume Form**
  - Personal Information (name, title, email, phone, location, LinkedIn, website, GitHub)
  - Professional Summary with character counter
  - Work Experience (dynamic add/remove entries)
  - Education (dynamic add/remove entries with optional GPA)
  - Skills (tag-based input with instant add/remove)
  - Projects (dynamic add/remove with tech stack and links)

- **Live Preview**
  - Real-time resume preview that updates as you type
  - Professional, ATS-friendly resume layout
  - Zoom in/out controls for comfortable viewing

- **PDF Export**
  - Clean, high-quality PDF generation using jsPDF + html2canvas
  - A4 format with proper margins and typography
  - Multi-page support for longer resumes
  - Automatic filename based on your name

- **Print Support**
  - Print-friendly CSS that hides the editor and shows only the resume
  - Clean output suitable for professional printing

- **Responsive Design**
  - Desktop: Side-by-side editor and preview layout
  - Tablet/Mobile: Collapsible sidebar with toggle preview
  - Touch-friendly interface

- **Modern UI/UX**
  - Dark navy sidebar with elegant navigation
  - Smooth animations and micro-interactions
  - Toast notifications for user feedback
  - Confirmation dialogs for destructive actions

---

## 🚀 How to Run

### Option 1: Open Directly
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Local Development Server
For the best experience (especially for font loading), use a local server:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure and accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, animations, print styles |
| **JavaScript (ES6+)** | Application logic, DOM manipulation, state management |
| **[jsPDF](https://github.com/parallax/jsPDF)** | PDF document generation |
| **[html2canvas](https://html2canvas.hertzen.com/)** | HTML-to-canvas rendering for PDF export |
| **[Google Fonts](https://fonts.google.com/)** | Inter & Playfair Display typefaces |

> **No frameworks or build tools required.** This is a zero-dependency, pure vanilla web application (external libraries are loaded via CDN for PDF functionality).

---

## 📁 File Structure

```
resume-builder/
├── index.html    # Main application markup
├── style.css     # Complete styling (responsive + print)
├── script.js     # Application logic and PDF generation
└── README.md     # This documentation file
```

---

## 📋 Usage Guide

1. **Fill in your details** — Navigate through sections using the dark sidebar
2. **Watch the live preview** — Your resume updates in real-time on the right panel
3. **Add entries** — Click "Add Experience", "Add Education", or "Add Project" to create dynamic entries
4. **Add skills** — Type a skill name and press Enter or click "Add"
5. **Download PDF** — Click the purple "Download PDF" button in the sidebar
6. **Print** — Click "Print" for browser-native print dialog with clean output
7. **Clear all** — Click "Clear All" to reset everything (with confirmation)

---

## 🎨 Design Principles

- **Corporate & Polished** — Professional typography and spacing suitable for job applications
- **ATS-Friendly Output** — Clean resume layout that works well with Applicant Tracking Systems
- **Accessibility** — Semantic HTML, ARIA labels, keyboard-navigable interface
- **Performance** — No build step, minimal dependencies, instant load

---

## 📄 License

MIT License — free to use, modify, and distribute.
