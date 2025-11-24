# 🌌 HAN - Connecting the Dots (3D Portfolio)

Welcome to my interactive 3D portfolio, **"Connecting the Dots"**.
This project is a visual representation of my journey as a Product Hacker, where every experience (dot) connects to form who I am today.

> *"Just as stars form constellations, individual systems connect to form powerful infrastructure."*

## ✨ Key Features

### 1. **Interactive 3D Narrative**
- **Scroll-based Storytelling**: A seamless journey through space, starting from chaos and organizing into a structured career path.
- **Phased Experience**:
  - **Intro**: "Connecting the Dots" - Chaos to Order.
  - **Profile**: "Life is about Connecting the Dots" - Philosophy & Identity.
  - **Timeline**: A spiral timeline of projects, visualizing the journey.
  - **Skill Universe**: A solar system visualization where skills orbit around core clusters (Cloud, DevOps, Dev, Tools).
  - **Contact**: "The Next Dot Is You" - An invitation to connect.

### 2. **Immersive Visuals**
- **Particle Systems**: Dynamic starfields and floating particles using `Three.js`.
- **Solar System Skills**: Skills represented as planets orbiting their respective domains.
- **Dynamic Lighting & Fog**: Atmospheric depth and mood.
- **Responsive 3D Layout**: Adapts to scroll position and interaction.

### 3. **Notion Integration**
- **Real-time Content**: All project data (titles, descriptions, tags, images) is fetched dynamically from a **Notion Database**.
- **Notion Renderer**: Custom renderer to display Notion page content within the portfolio modal.

## 🛠 Tech Stack

### Core
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### 3D & Animation
- **3D Library**: [Three.js](https://threejs.org/)
- **React Adapter**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Helpers**: [@react-three/drei](https://github.com/pmndrs/drei)
- **UI Animation**: [Framer Motion](https://www.framer.com/motion/)

### Data & Backend
- **CMS**: Notion API (`@notionhq/client`)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/BaekKunHee/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file and add your Notion credentials:
   ```env
   NOTION_SECRET_KEY=your_notion_secret_key
   NOTION_DATABASE_ID=your_notion_database_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the 3D experience.

## 📂 Project Structure

```
app/
├── api/notion/          # Notion API routes
├── components/
│   ├── 3d/              # 3D Components (Scene, Stars, Timeline, etc.)
│   │   ├── Scene.tsx        # Main Canvas & ScrollControls
│   │   ├── IntroSection.tsx # "Connecting the Dots" Intro
│   │   ├── ProfileSection.tsx # Bio & Philosophy
│   │   ├── Timeline.tsx     # Project Spiral
│   │   ├── SkillSection.tsx # Solar System Visualization
│   │   └── ContactSection.tsx # "The Next Dot Is You"
│   └── portfolio/       # UI Components (Modal, NotionRenderer)
├── data/                # Static data (Skills, Links)
└── types/               # TypeScript interfaces
```

## 📬 Contact
- **Email**: [hanbaek1643@gmail.com](mailto:hanbaek1643@gmail.com)
- **GitHub**: [BaekKunHee](https://github.com/BaekKunHee)
- **Bio Link**: [Developer Bear](https://bit.ly/m/developer_bear)

---
© 2025 Han Baek. All rights reserved.
