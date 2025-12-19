# Portfolio Project - Detailed Requirements

## Minimum Viable Product (MVP)

### Must Have Features

#### 1. Navigation
- Fixed/sticky header that stays visible on scroll
- Logo or name on the left
- Navigation links on the right
- Links scroll smoothly to sections
- Mobile: Hamburger menu (CSS-only, no JavaScript)
- Active state for current section
- Hover effects on links

#### 2. Hero Section
- Full viewport height (100vh)
- Centered content
- Your name (H1)
- Title/role
- Brief tagline (1 sentence)
- Call-to-action button
- Optional: Animated background or subtle animation

#### 3. About Section
- Professional photo (min 300x300px, optimized)
- Bio (200-300 words about you, your journey, interests)
- Why you're passionate about web development
- Personal touch (hobbies, fun fact)
- Clear, readable typography

#### 4. Projects Section
- Minimum 3 projects displayed
- Grid layout (1 column mobile, 2 tablet, 3 desktop)
- Each project card must include:
  - Project image (screenshot or mockup)
  - Project title
  - Short description (50-100 words)
  - Technologies used (badges or list)
  - "View Live" button/link
  - "View Code" button/link (GitHub)
- Hover effects on cards
- Images optimized and load fast

#### 5. Skills Section
- Organized categories:
  - Front-End Technologies
  - Tools & Workflow
  - Currently Learning
- Visual representation (your choice):
  - Icon grid
  - Skill list
  - Badges
  - Progress bars (avoid fake percentages!)
- Minimum 8-12 skills listed

#### 6. Contact Section
- Heading explaining how to reach you
- Contact form with:
  - Name input (required)
  - Email input (required, validated with HTML5)
  - Message textarea (required, min 10 characters)
  - Submit button with hover state
  - Form validation styling
- Alternative contact methods:
  - Email address (linked with mailto:)
  - LinkedIn profile link
  - GitHub profile link
  - Optional: Twitter, CodePen, etc.
- All social links open in new tab

#### 7. Footer
- Copyright notice with current year
- Your name
- Social media icon links
- Optional: "Back to top" button
- Subtle background different from main sections

---

## Responsive Design Requirements

### Mobile (320px - 767px)
- Single column layout
- Hamburger menu (CSS-only toggle)
- Touch-friendly buttons (min 44x44px)
- Readable text without zooming
- Images scale appropriately
- Form inputs full width

### Tablet (768px - 1023px)
- 2-column project grid
- Larger typography
- More spacing/padding
- Navigation can be horizontal
- Images larger

### Desktop (1024px+)
- 3-column project grid
- Maximum content width (1200px)
- Larger hero text
- More whitespace
- Full desktop navigation always visible

---

## Accessibility Requirements

### WCAG AA Compliance
- [ ] All text has 4.5:1 contrast ratio minimum (3:1 for large text)
- [ ] All interactive elements keyboard accessible
- [ ] Skip to main content link
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skipping)
- [ ] Form labels associated with inputs
- [ ] Form errors clearly indicated
- [ ] All images have descriptive alt text
- [ ] Links have descriptive text (no "click here")
- [ ] Focus indicators visible on all interactive elements
- [ ] ARIA labels where needed (icons, buttons)

### Screen Reader Friendly
- Semantic HTML elements used
- Landmarks defined (header, nav, main, footer)
- Lists for navigation and skills
- Descriptive link text
- Form labels and instructions

---

## Performance Requirements

### Load Time
- [ ] Initial page load < 3 seconds on 3G
- [ ] Images optimized (WebP preferred, JPEG fallback)
- [ ] No images larger than 500KB
- [ ] CSS file < 50KB
- [ ] No unused CSS

### Optimization
- [ ] Images lazy-loaded (native loading="lazy")
- [ ] Images properly sized for viewport
- [ ] Fonts loaded efficiently
- [ ] CSS minified for production
- [ ] HTML validated (W3C)

---

## Code Quality Requirements

### HTML
- [ ] Valid HTML5 (W3C validator)
- [ ] Semantic elements used appropriately
- [ ] Proper document structure
- [ ] Meta tags for SEO
- [ ] Proper indentation (2 or 4 spaces consistent)
- [ ] Comments for major sections
- [ ] No inline styles

### CSS
- [ ] Organized structure:
  ```
  1. CSS Reset/Normalize
  2. CSS Variables
  3. Base styles
  4. Layout
  5. Components
  6. Utilities
  7. Media queries
  ```
- [ ] CSS Variables for colors, spacing, fonts
- [ ] BEM or consistent naming convention
- [ ] Mobile-first media queries
- [ ] No !important unless absolutely necessary
- [ ] Comments for complex sections
- [ ] Proper indentation

---

## Visual Design Requirements

### Typography
- [ ] Maximum 2 font families
- [ ] Consistent font sizes (type scale)
- [ ] Readable line-height (1.5-1.8 for body text)
- [ ] Good text/background contrast
- [ ] Responsive font sizes

### Color
- [ ] Consistent color palette (3-5 colors)
- [ ] Primary, secondary, accent colors defined
- [ ] Neutral colors for backgrounds
- [ ] Colors meet contrast requirements
- [ ] CSS variables for all colors

### Spacing
- [ ] Consistent spacing scale (8px base)
- [ ] Adequate whitespace
- [ ] Section padding consistent
- [ ] Card/element spacing consistent

### Imagery
- [ ] Professional quality images
- [ ] Consistent aspect ratios
- [ ] Images compressed/optimized
- [ ] Alt text on all images
- [ ] Images enhance content

---

## Content Requirements

### About Section
- [ ] 200-300 words minimum
- [ ] Clear and professional tone
- [ ] Proofread (no typos!)
- [ ] Authentic and personal
- [ ] Explains your journey/goals

### Projects Section
- [ ] Minimum 3 projects
- [ ] Each project has:
  - Clear title
  - 50-100 word description
  - Technologies listed
  - Working links
- [ ] Projects demonstrate growth/variety
- [ ] Screenshots are current and accurate

### Skills Section
- [ ] Honest skill representation
- [ ] Organized logically
- [ ] Include soft skills
- [ ] Show continuous learning

### Contact Section
- [ ] Professional email address
- [ ] Active social profiles
- [ ] Form with clear purpose
- [ ] Response expectation set

---

## Nice-to-Have Features (Bonus)

### Advanced Features
- [ ] Dark mode toggle (CSS only!)
- [ ] Smooth scroll animations (CSS)
- [ ] Scroll progress indicator
- [ ] Animated statistics/counters (CSS)
- [ ] Project filtering by technology
- [ ] Testimonials section
- [ ] Blog section preview
- [ ] Timeline of experience

### Polish
- [ ] Custom 404 page
- [ ] Loading states for images
- [ ] Skeleton screens
- [ ] Micro-interactions
- [ ] Easter eggs
- [ ] Print stylesheet

---

## Testing Checklist

### Before Submission
- [ ] Test on real iPhone
- [ ] Test on real Android
- [ ] Test on tablet
- [ ] Test on laptop
- [ ] Test on large desktop monitor
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Validate HTML (W3C)
- [ ] Validate CSS (W3C)
- [ ] Run Lighthouse audit (90+ score)
- [ ] Check all links work
- [ ] Verify images load
- [ ] Test form validation
- [ ] Check loading speed
- [ ] Ask someone to review

---

## Submission Requirements

### What to Submit
1. Live URL (deployed site)
2. GitHub repository URL
3. README.md with:
   - Project description
   - Features implemented
   - Technologies used
   - Screenshots
   - Setup instructions
   - What you learned
4. Self-evaluation against rubric

### Repository Structure
```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── images/
│   ├── hero-bg.jpg
│   ├── profile.jpg
│   └── projects/
│       ├── project1.jpg
│       ├── project2.jpg
│       └── project3.jpg
├── assets/
│   └── resume.pdf
└── README.md
```

---

**Questions?** Review the hints.md file or check the solution folder for reference!

