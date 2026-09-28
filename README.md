# 🚀 Full-Stack Personal Portfolio Website

A sleek, responsive, and high-performance personal portfolio website built with pure **HTML5**, **CSS3**, and **Modern JavaScript (ES6+)**. Designed specifically for Computer Science students and aspiring software developers to showcase their skills, full-stack projects, and technical achievements to recruiters and engineering managers.

---

## 🌟 Key Features

- **⚡ Zero External Dependencies**: 100% pure vanilla web standards. No heavy frameworks, npm installs, or build tools required — works right out of the box!
- **🌓 Dark & Light Theme Switcher**: Modern glassmorphism aesthetic with seamless theme toggling and `localStorage` persistence.
- **⌨️ Dynamic Typing Hero**: Engaging headline animation highlighting diverse developer competencies (Full-Stack Developer, API Architect, CS Student).
- **📊 Interactive Skill Arsenal**:
  - Categorized skill filter tabs (*All*, *Frontend*, *Backend & API*, *Database & Tools*, *CS Fundamentals*).
  - Animated proficiency indicators that trigger automatically when scrolled into view.
- **📁 Full-Stack Project Showcase**:
  - Filterable project grid (*All*, *Full-Stack*, *Frontend*, *Backend*).
  - Code mockup preview cards.
  - Interactive **Project Details Modal** (`<dialog>`) detailing architecture, features, database models, and engineering challenges solved.
- **💻 Interactive Developer CLI / Playground**:
  - Built-in terminal simulation supporting commands like `skills`, `projects`, `about`, `contact`, `whoami`, `quote`, `clear`, and `sudo hire`.
  - Recruiter command `sudo hire` triggers celebratory confetti animation!
- **📄 Printable Online Resume**:
  - Integrated modal resume with print-ready CSS (`@media print`) so visitors can save as PDF or print cleanly.
- **📬 Contact Form with Full-Stack Simulation**:
  - Client-side real-time form validation.
  - Simulated async network latency with spinner.
  - Saves submitted messages into browser `localStorage`.
  - **Local Inbox Modal** allows testing form submissions and inspecting simulated backend data flow.
- **📱 Fully Responsive**: Seamless experience across mobile phones (with hamburger drawer), tablets, laptops, and ultra-wide displays.

---

## 📂 File Structure

```text
HTML LEARNIG/
├── index.html       # Semantic HTML5 markup, accessible dialogs & structure
├── style.css        # Modern CSS with custom properties, glassmorphism & responsive layouts
├── script.js        # Modular ES6+ JavaScript (theme, terminal, filters, modals, canvas confetti)
└── README.md        # Documentation and customization guide
```

---

## 🚀 How to Run

1. **Option 1: Direct Browser Launch (Easiest)**:
   - Double-click `index.html` or right-click and choose **Open with > Google Chrome / Microsoft Edge / Firefox**.
2. **Option 2: VS Code Live Server**:
   - Right-click `index.html` inside VS Code and select **Open with Live Server**.

---

## 🛠️ How to Customize for Yourself

### 1. Update Name and Personal Info
- Open `index.html` and search for `Alex Rivera` or `Alex.dev`. Replace with your own name and preferred handle.
- Update your bio paragraph in the `#about` section.
- Change the degree, university, GPA, and graduation year in the Education card.

### 2. Update Social Links & Contact Details
- In `index.html`, update the email address (`alex.rivera.dev@example.com`) and links to your actual **GitHub**, **LinkedIn**, and **Twitter/X** profiles.

### 3. Add or Modify Projects
- In `index.html`, update the project cards inside `<section id="projects">`.
- In `script.js`, locate `projectsDatabase` (around line 185) to customize the detailed modal popups with your real architecture details, live URLs, and GitHub links.

### 4. Customize Skills
- In `index.html`, add, remove, or modify the `.skill-card` elements in `<section id="skills">`. Adjust the `--level: 90%` CSS variable in the progress bar to match your proficiency.

---

## 🌐 Free Deployment Options

### Deploy to GitHub Pages (Recommended)
1. Initialize git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a new repository on GitHub (e.g., `portfolio`).
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Repository Settings > Pages** and set branch to **main**, folder to **/(root)**, then click **Save**. Your site will be live within seconds!

### Deploy to Netlify / Vercel
- Simply drag and drop this project folder into the [Netlify Drop](https://app.netlify.com/drop) dashboard or import your GitHub repo on [Vercel](https://vercel.com).
