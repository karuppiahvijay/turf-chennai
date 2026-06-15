# TurfNet Chennai 🏟️

A high-fidelity, interactive single-page application (SPA) designed to find, explore, and book sports turfs in Chennai. Built using modern Vanilla HTML, CSS (Vanilla Design System), and JavaScript.

## 🚀 Features

- **Dynamic Hero Section**: Provides clear CTAs and live simulated statistics on active bookings.
- **Advanced Explore Grid**: Filter turfs in real-time by:
  - Chennai Localities (Adyar, Velachery, Nungambakkam, Anna Nagar, T. Nagar, ECR).
  - Sport categories (Football 5v5/7v7/11v11, Box Cricket, Cricket Nets, Sand Volleyball, Indoor Volleyball).
  - Max hourly price (interactive range slider).
  - Amenities (Floodlights, Locker rooms, Cafeteria, Parking, Showers, etc.).
- **Interactive Booking Simulator**:
  - Live slot selector (peak hours automatically adjust pricing).
  - Multi-date picker (next 7 days).
  - Sports selection dropdown.
  - Equipment rentals and add-on checkboxes (Bibs, matchballs, booking referees, drinking water).
  - Simulated payment checkout flow with animated loading indicators.
- **My Bookings Dashboard**: Lists all active and past slots, manages simulated cancellations, and displays total costs.
- **Host a Turf Portal**: A registration form for Chennai turf owners to list their venues. Submitted venues instantly become filterable in the Explore tab during the active session.
- **Premium Aesthetics**:
  - Dark mode sporty HSL palette with lime-neon and cyan glow accents.
  - Full Glassmorphism panels and buttons.
  - Custom scrollbar, fade-in animations, and micro-interactions on hover.

## 📁 File Structure

- `index.html` - The semantic structure of the SPA and modal containers.
- `css/styles.css` - Custom styling tokens, layout definitions, and neon effects.
- `js/data.js` - High-fidelity mock database containing default Chennai turfs.
- `js/app.js` - Routing, state management, filtering calculations, and DOM rendering.
- `assets/images/` - High-quality generated turf images.

## 💻 How to Run Locally

You can run this website instantly using one of the following methods:

### Method 1: Python HTTP Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Method 2: VS Code Live Server
If you use VS Code, install the **Live Server** extension, open the project folder, and click **Go Live** in the status bar.

### Method 3: Direct File Open
You can also simply double-click the `index.html` file to open it directly in any modern web browser.

---

## 🐙 Git Hosting Instructions

To push this project to your remote repository (e.g., GitHub, GitLab):

1. **Install Git**: Make sure Git is installed on your machine and added to your system environment variables (PATH).
2. **Initialize Git**:
   ```bash
   git init
   ```
3. **Commit the files**:
   ```bash
   git add .
   git commit -m "Initial commit - TurfNet Chennai Website"
   ```
4. **Push to your remote repository**:
   ```bash
   git remote add origin <your-git-repo-url>
   git branch -M main
   git push -u origin main
   ```
