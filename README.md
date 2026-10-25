# Resident Evil Characters Website

A modern React website featuring Resident Evil characters with stunning animations using **Three.js**, **GSAP**, and **Framer Motion**.

## Features

- **4 Characters**: Leon Kennedy, Jill Valentine, Albert Wesker, Ada Wong
-**Three.js**: 3D particle background with floating orbs
- **GSAP**: Text reveal animations with letter-by-letter effects
- Framer Motion**: Smooth page transitions and hover effects
- *Dark Theme**: Red/pink accent colors matching Resident Evil aesthetic
- **Keyboard Navigation**: Use arrow keys to switch characters

## Tech Stack

- React 18
- Vite
- Three.js + @react-three/fiber + @react-three/drei
- GSAP
- Framer Motion

## Installation

```bash
# Navigate to project folder
cd resident-evil-react

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

- Click on character thumbnails in the left sidebar to switch characters
- Use arrow keys (Up/Down or Left/Right) for keyboard navigation
- Enjoy the 3D particle effects in the background!

## Project Structure

```
resident-evil-react/
├── public/
│   └── images/          # Character images
├── src/
│   ├── components/
│   │   ├── ParticleBackground.jsx  # Three.js 3D scene
│   │   ├── Sidebar.jsx             # Character navigation
│   │   ├── CharacterSection.jsx    # Main content with GSAP
│   │   ├── Navigation.jsx          # Top navigation
│   │   └── RightSidebar.jsx        # Right sidebar links
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Credits

- Character images from Resident Evil franchise
- Design inspired by Marvel character showcase
