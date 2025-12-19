# Project 1: Personal Portfolio Website

**Difficulty:** ⭐⭐ Beginner-Friendly
**Estimated Time:** 20-30 hours
**Perfect for:** First capstone project, job applications

---

## 🎯 Project Overview

Build a professional portfolio website to showcase your projects, skills, and experience. This is the portfolio you'll actually use when applying for jobs!

**Live Example Inspiration:**
- [brittanychiang.com](https://brittanychiang.com/)
- [jacekjeznach.com](https://jacekjeznach.com/)
- Simple, clean, professional designs

---

## 📋 Required Pages

### 1. Home / Hero Section
- Professional photo or avatar
- Your name and title (e.g., "Front-End Developer")
- Brief tagline or introduction
- Call-to-action buttons (View Work, Contact)
- Smooth scroll to sections

### 2. About Section
- Longer bio (2-3 paragraphs)
- Skills displayed visually
- Your background and interests
- Professional photo
- Download resume button (PDF)

### 3. Projects Section
- At least 3 project showcases
- Each project includes:
  - Project image/screenshot
  - Project title and description
  - Technologies used
  - Live demo link
  - GitHub repo link
- Grid or card layout

### 4. Skills Section
- Technical skills organized by category
  - Front-End (HTML, CSS, JavaScript)
  - Tools (Git, VS Code, etc.)
  - Currently Learning
- Visual representation (icons, progress bars, or simple list)

### 5. Contact Section
- Contact form with:
  - Name (required)
  - Email (required, with validation)
  - Message (required, textarea)
  - Submit button
- Alternative contact methods
  - Email link
  - LinkedIn
  - GitHub
  - Twitter (optional)

### 6. Footer
- Copyright notice
- Social media links
- Back to top button
- Links to privacy policy (optional)

---

## ✅ Required Features

### Design & Layout
- [ ] Clean, professional design
- [ ] Consistent color scheme (2-3 main colors)
- [ ] Professional typography (2 fonts max)
- [ ] Smooth scrolling between sections
- [ ] Sticky navigation bar
- [ ] Responsive on all devices

### Technical Requirements
- [ ] Single-page application (SPA) or multi-page
- [ ] Semantic HTML5 structure
- [ ] CSS Grid for project gallery
- [ ] Flexbox for navigation and cards
- [ ] CSS Variables for colors/spacing
- [ ] Mobile-first responsive design
- [ ] Smooth CSS transitions/animations

### Accessibility
- [ ] Keyboard navigation
- [ ] Skip to main content link
- [ ] Proper ARIA labels
- [ ] Alt text for all images
- [ ] Color contrast WCAG AA
- [ ] Focus indicators visible

### Performance
- [ ] Optimized images
- [ ] Minimal CSS file size
- [ ] Valid HTML & CSS
- [ ] Fast load time (<3 seconds)

---

## 🎨 Design Specifications

### Color Palette
Choose ONE of these approaches:
- **Option A:** Monochromatic (shades of one color + neutral)
- **Option B:** Complementary (two contrasting colors)
- **Option C:** Professional (navy/blue + accent color)

**Example Palettes:**
```
Primary: #2C3E50 (Dark blue-gray)
Secondary: #3498DB (Bright blue)
Accent: #E74C3C (Red)
Background: #ECF0F1 (Light gray)
Text: #2C3E50 (Dark)
```

### Typography
- **Headings:** Modern sans-serif (Inter, Poppins, Montserrat)
- **Body:** Readable sans-serif (Open Sans, Roboto, System fonts)
- **Scale:**
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 28px (mobile)
  - H3: 24px (desktop), 20px (mobile)
  - Body: 18px (desktop), 16px (mobile)

### Spacing
- Section padding: 80px top/bottom (desktop), 60px (tablet), 40px (mobile)
- Container max-width: 1200px
- Grid gap: 30px
- Card padding: 30px

### Animations
- Fade-in on scroll (optional but impressive)
- Hover effects on project cards
- Smooth page transitions
- Button hover states
- Navigation active states

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
/* Base: 320px-768px */

/* Tablet */
@media (min-width: 768px) {
  /* 2-column layouts */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 3-column layouts, larger text */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Max widths applied */
}
```

---

## 🏗️ Suggested HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Front-End Developer</title>
  <meta name="description" content="Portfolio of Your Name, a front-end developer specializing in HTML, CSS, and JavaScript.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Skip Link -->
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- Navigation -->
  <header>
    <nav>
      <a href="#" class="logo">YourName</a>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="hero">
    <h1>Hi, I'm Your Name</h1>
    <p class="tagline">Front-End Developer</p>
    <a href="#projects" class="btn">View My Work</a>
  </section>

  <main id="main">
    <!-- About -->
    <section id="about" class="about">
      <h2>About Me</h2>
      <!-- content -->
    </section>

    <!-- Projects -->
    <section id="projects" class="projects">
      <h2>My Projects</h2>
      <!-- project grid -->
    </section>

    <!-- Skills -->
    <section id="skills" class="skills">
      <h2>Skills</h2>
      <!-- skills list -->
    </section>

    <!-- Contact -->
    <section id="contact" class="contact">
      <h2>Get In Touch</h2>
      <!-- contact form -->
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2025 Your Name. All rights reserved.</p>
  </footer>
</body>
</html>
```

---

## 💡 Hints & Tips

### Getting Started
1. Create a mood board of portfolios you like
2. Sketch your layout on paper first
3. Choose your color palette before coding
4. Write all HTML structure before any CSS
5. Start with mobile layout

### Common Pitfalls
- ❌ Too much information (keep it concise!)
- ❌ Poor quality project screenshots
- ❌ Broken links to projects
- ❌ Contact form that doesn't work
- ❌ Slow loading images
- ❌ No real projects to showcase yet

### Solutions
- ✅ Quality over quantity - 3 great projects better than 10 mediocre ones
- ✅ Use placeholder projects from previous chapters if needed
- ✅ Optimize all images (compress, resize)
- ✅ Form can show success message (no backend needed)
- ✅ Use WebP format for images

### Impressive Additions (Optional)
- Dark mode toggle
- Scroll progress indicator
- Animated SVG icons
- Project filter by technology
- Typing animation for hero text
- Parallax scrolling effects

---

## 📊 Evaluation Checklist

### Design (25 points)
- [ ] Professional, clean aesthetic
- [ ] Consistent visual style
- [ ] Good use of whitespace
- [ ] Strong visual hierarchy
- [ ] Mobile-first responsive

### Content (20 points)
- [ ] Clear, concise bio
- [ ] Real/realistic projects showcased
- [ ] Professional photo/avatar
- [ ] Up-to-date skills listed
- [ ] Working contact information

### Technical (30 points)
- [ ] Semantic HTML throughout
- [ ] Clean, organized CSS
- [ ] Proper use of Grid/Flexbox
- [ ] CSS Variables implemented
- [ ] Valid HTML/CSS

### Functionality (15 points)
- [ ] All links work
- [ ] Navigation functions smoothly
- [ ] Form validates input
- [ ] Responsive on all devices
- [ ] Fast load time

### Accessibility (10 points)
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA labels where needed
- [ ] Good color contrast
- [ ] Alt text on images

**Total: 100 points**

---

## 🚀 Deployment Options

Once complete, deploy your portfolio:

### GitHub Pages (Free, Easy)
```bash
# In your project folder
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
# Enable GitHub Pages in repo settings
```

### Netlify (Free, Recommended)
- Drag and drop your folder to [netlify.com](https://www.netlify.com/)
- Automatic HTTPS
- Custom domain support
- Continuous deployment

### Vercel (Free, Fast)
- Similar to Netlify
- Great performance
- Easy custom domains

---

## 📚 Resources

- [Coolors.co](https://coolors.co/) - Color palette generator
- [Google Fonts](https://fonts.google.com/) - Free fonts
- [Font Awesome](https://fontawesome.com/) - Icons
- [Unsplash](https://unsplash.com/) - Free photos
- [TinyPNG](https://tinypng.com/) - Image compression

---

## ✨ Success Story

*"I built my portfolio as my first capstone project. Within 2 weeks of sharing it on LinkedIn, I had 3 interview requests. The portfolio showed I could build real things, not just complete tutorials."* - Former Student

---

**Ready to build your portfolio?** Start with the `starter/` folder or build from scratch!

Good luck! 🎨✨

