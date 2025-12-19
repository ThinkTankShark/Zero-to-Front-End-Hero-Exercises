# Project 1: Blog Platform with React

## Overview

Build a modern, multi-page blog platform from scratch using React. This progressive project guides you through building reusable components, implementing routing, managing state, and styling at scale.

**What you'll build:**
- Multi-page blog with routing
- Post listing with pagination
- Individual post view
- Search and filter functionality
- Responsive, accessible design

## Learning Objectives

- ✅ React components and hooks
- ✅ React Router for navigation
- ✅ State management (Context API or Redux)
- ✅ CSS architecture (Choose: Tailwind, CSS-in-JS, or CSS Modules)
- ✅ Code splitting and lazy loading
- ✅ Performance optimization
- ✅ Form handling in React

## Requirements

### Pages & Routes

1. **Home Page** (`/`)
   - [ ] Hero section
   - [ ] Featured posts
   - [ ] Recent posts list
   - [ ] Categories sidebar

2. **Blog List** (`/blog`)
   - [ ] All posts grid/list
   - [ ] Pagination (12 posts per page)
   - [ ] Sort options (newest, oldest, popular)
   - [ ] Filter by category
   - [ ] Search functionality

3. **Single Post** (`/blog/:slug`)
   - [ ] Post title and meta (date, author, category)
   - [ ] Post content (formatted)
   - [ ] Related posts
   - [ ] Social share buttons

4. **About Page** (`/about`)
   - [ ] Author bio
   - [ ] Mission statement
   - [ ] Contact info

### Components to Build

1. **Layout Components**
   - [ ] Header with navigation
   - [ ] Footer
   - [ ] Container/Wrapper
   - [ ] Sidebar

2. **Post Components**
   - [ ] PostCard (for listings)
   - [ ] PostDetail (full post view)
   - [ ] PostMeta (author, date, category)
   - [ ] PostContent (formatted markdown/HTML)

3. **UI Components**
   - [ ] Button
   - [ ] SearchBar
   - [ ] Pagination
   - [ ] CategoryTag
   - [ ] Loading Spinner
   - [ ] ErrorBoundary

### Features

1. **Search & Filter**
   - [ ] Real-time search
   - [ ] Filter by category
   - [ ] Clear filters button
   - [ ] Results count

2. **State Management**
   - [ ] Posts data management
   - [ ] Search/filter state
   - [ ] Pagination state
   - [ ] Selected post state

3. **Performance**
   - [ ] Code splitting by route
   - [ ] Lazy load images
   - [ ] Memoize expensive calculations
   - [ ] Optimize re-renders

4. **Styling**
   - [ ] Responsive design
   - [ ] Dark mode support (stretch)
   - [ ] Consistent theme
   - [ ] Accessible colors

### Technical Requirements

- Create React App or Vite
- React Router v6
- State management solution
- Chosen CSS approach
- ESLint configuration
- PropTypes or TypeScript (stretch)

## Checkpoints

### Checkpoint 1: Setup & Basic Structure
**Goal:** Project setup and basic routing

- [ ] Create React app
- [ ] Install dependencies (React Router, etc.)
- [ ] Set up folder structure
- [ ] Create basic routes
- [ ] Build Layout component
- [ ] Header and Footer

**Test:** Can navigate between pages

### Checkpoint 2: Post Display & Components
**Goal:** Display posts and build core components

- [ ] Create mock post data (JSON file)
- [ ] Build PostCard component
- [ ] Build PostDetail component
- [ ] Display posts on blog listing
- [ ] Implement single post view
- [ ] Style components

**Test:** Can view list and individual posts

### Checkpoint 3: State Management
**Goal:** Implement state management solution

- [ ] Choose state solution (Context/Redux)
- [ ] Set up state structure
- [ ] Create actions/reducers
- [ ] Connect components to state
- [ ] Handle data flow

**Test:** State management works throughout app

### Checkpoint 4: Search & Filter
**Goal:** Implement search and filtering

- [ ] Build SearchBar component
- [ ] Implement search logic
- [ ] Create category filters
- [ ] Build Pagination component
- [ ] Connect everything

**Test:** Can search, filter, and paginate posts

### Checkpoint 5: Polish & Optimization
**Goal:** Optimize and add final touches

- [ ] Implement code splitting
- [ ] Add loading states
- [ ] Optimize performance
- [ ] Add animations
- [ ] Accessibility audit
- [ ] Responsive testing

**Test:** App is performant and polished

## Project Structure

```
src/
  components/
    common/         # Reusable UI components
    layout/         # Layout components
    posts/          # Post-related components
  pages/            # Page components
  context/          # Context providers
  hooks/            # Custom hooks
  utils/            # Helper functions
  data/             # Mock data
  styles/           # Global styles
  App.jsx
  index.jsx
```

## Data Structure

```javascript
{
  id: "1",
  slug: "getting-started-with-react",
  title: "Getting Started with React",
  excerpt: "Learn the basics...",
  content: "Full markdown content...",
  author: {
    name: "John Doe",
    avatar: "url"
  },
  category: "React",
  tags: ["javascript", "react", "tutorial"],
  publishedDate: "2024-01-15",
  readTime: "5 min",
  featured: true,
  image: "url"
}
```

## Stretch Goals

1. **Markdown Support** - Write posts in Markdown
2. **Reading Progress** - Show progress bar
3. **Comments System** - Add comment functionality
4. **Newsletter Signup** - Email collection
5. **RSS Feed** - Generate RSS feed
6. **Post Reactions** - Like/love reactions
7. **Author Pages** - Filter by author
8. **Table of Contents** - For long posts
9. **Dark Mode** - Theme toggle
10. **PWA** - Make it installable

## Styling Options

### Option 1: Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Option 2: Styled Components
```bash
npm install styled-components
```

### Option 3: CSS Modules
- Built-in with Create React App
- Use `.module.css` extension

Choose based on your preference and Volume 3 learning!

## Testing

**What to test:**
- [ ] Components render correctly
- [ ] Search functionality works
- [ ] Filtering works
- [ ] Pagination works
- [ ] Routing works
- [ ] State updates correctly

## Deployment

Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: `npm run build && gh-pages`

## Common Pitfalls

**❌ Avoid:**
- Prop drilling (use Context)
- Unnecessary re-renders
- Not code splitting
- Inline styles everywhere
- Ignoring accessibility

**✅ Do:**
- Use proper state management
- Memoize when needed
- Split code by route
- Follow styling convention
- Test with keyboard navigation

