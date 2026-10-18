# 🪐 Learning Space

An interactive STEM learning platform combining rigorous mathematical derivations, real-time 2D/3D physics simulations, dynamic linear algebra transformations, and an integrated programming laboratory with technical handbook documentation.

![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%2018%20%7C%20Vite%208%20%7C%20KaTeX-blue?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-%3E%3D20.19.0-green?style=flat-square)
![UI](https://img.shields.io/badge/Theme-Dark%20Engineering%20UI-purple?style=flat-square)

---

## 🌟 Key Features

### 🔭 1. Interactive 2D & 3D Visualizations
- **Dual 2D / 3D Dimension Switcher**: Switch between classic 2D interactive canvas/SVG visualizers and full 3D isometric projections with drag-to-orbit rotation and zoom.
- **Physics Engine Simulations**:
  - *Kinematics*: 2D/3D projectile motion with drag, trajectory tracing, launch angle, and velocity vectors.
  - *Forces & Newton's Laws*: Inclined plane with static/kinetic friction, normal force, and gravity vector decomposition.
  - *Energy & Work*: Conservation of mechanical energy on curved tracks, spring-mass harmonic oscillators, and potential-kinetic exchange.
  - *Waves & Oscillations*: Transverse and longitudinal wave propagation, harmonic frequencies, and phase interference.
- **Calculus & Linear Algebra**:
  - *Derivatives*: Tangent line slopes, secant secants, and $\epsilon$-$\delta$ limits.
  - *Integrals Sub-Topic Hub*: Foundations & Riemann sums, Fundamental Theorem of Calculus, $u$-Substitution, Integration by Parts (including tabular $D$-$I$ reduction and cyclic identities for $e^{ax}\cos(bx)$, $e^{ax}\sin(bx)$, and $e^{ax}\tan(bx)$), Trig Substitution, and Partial Fractions.
  - *Linear Algebra*: Vector spans, dot/cross products, matrix transformations, Gaussian elimination, and worked numerical examples in vector/matrix form.

### 💻 2. Integrated IDE & Memory Inspector (Computer Programming)
- **Live Code Testing Lab**: In-browser interactive code editor with syntax formatting, line gutters, and tab indentation support.
- **Simulation Runtime**: Simulated compiler/interpreter execution engine for C (GCC simulation) and Python 3.12 with stdout terminal output, process telemetry, and runtime exit codes.
- **Real-Time Memory & Variable Tracing**: Live inspection table showing variable identifiers, data types, current values, and simulated memory addresses (`0x7ffe...` stack and heap pointers).
- **W3Schools-Style Documentation & Tutorial**:
  - Comprehensive C and Python handbooks based on engineering lecture notes and technical specifications.
  - Numbered sections, blue-header reference tables, memory byte cell diagrams (`0xFFF0`), IPO flowcharts, and null-terminated string array diagrams.
  - **"Try it Yourself in IDE ❯"**: 1-click loading of any handbook code example directly into the IDE with instant execution feedback.

### 📐 3. Mathematical Rigor & Code Syntax Inspection
- **KaTeX LaTeX Rendering**: Fast, crisp rendering of mathematical expressions and derivations.
- **Equation Inspector**: Deep variable breakdown showing physical meaning, SI units, and direct/inverse proportionality.
- **Code Syntax Inspector**: Compiler grammar breakdown, token analysis, execution flow, and programming guidelines.

### 📱 4. Responsive & Accessible Engineering UI
- **Dark Theme Engineering Aesthetic**: Low eye-strain design with subject-specific accent neon colors.
- **Collapsible Sidebar**: Left-hand navigation drawer that can be toggled or hidden to maximize visualization screen space.
- **Split Workbench & Full-Width Modes**: Keep the interactive visualization docked beside explanations while scrolling, or expand to full width.
- **Fully Mobile Responsive**: Adapts seamlessly from ultra-wide monitors to mobile devices.

---

## 📚 Subject & Topic Architecture

| Subject | Route | Highlights |
| :--- | :--- | :--- |
| **Physics** | `/subjects/physics` | Kinematics, Forces & Newton's Laws, Energy & Work, Waves & Oscillations (2D & 3D labs) |
| **Mathematics** | `/subjects/mathematics` | Derivatives, Integrals Hub (6 sub-topics with cyclic IBP reduction), Differential Equations |
| **Linear Algebra** | `/subjects/linear-algebra` | Vectors, Matrix Operations, Systems of Equations, Eigenvalues & Eigenvectors |
| **Computer Programming** | `/subjects/com-prog` | C Programming & Python Handbooks, Integrated IDE, MCU & ROS (*In Development*) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.19.0` or higher (recommended: Node `24` via `.nvmrc`)
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Learning_hub_UI.git
   cd Learning_hub_UI
   ```

2. **Select Node version and install dependencies**:
   ```bash
   nvm use
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to the local URL displayed in the terminal (typically `http://localhost:5173`).

### Production Build

To compile and verify a production-ready bundle:
```bash
npm run build
npm run preview
```

---

## 📁 Project Directory Structure

```
Learning_hub_UI/
├── public/                     # Static assets (favicons, icons)
├── scripts/
│   └── check-node.js           # Pre-dev/pre-build Node version validator
├── src/
│   ├── components/             # Reusable UI & Visualizer components
│   │   ├── CodeSyntaxInspector/# Com-Prog grammar & syntax breakdown
│   │   ├── ComProgDocView/     # W3Schools-style chapter documentation view
│   │   ├── EquationInspector/  # Variable breakdown & dependency cards
│   │   ├── Layout/             # Topbar, collapsible sidebar, footer
│   │   ├── MathView/           # KaTeX LaTeX renderer wrapper
│   │   ├── SubjectCard/        # Home page subject cards
│   │   ├── TopicCard/          # Subject topic cards with status badges
│   │   └── visualizations/     # 2D & 3D Interactive Visualizers
│   │       ├── comProg/        # Integrated IDE & Memory Inspector
│   │       ├── linearAlgebra/  # 2D & 3D Vector / Matrix visualizers
│   │       ├── math/           # Integrals & Derivatives visualizers
│   │       ├── physics/        # Projectile, Newton, Energy, Wave visualizers
│   │       └── shared/         # Universal 3D isometric canvas engine
│   ├── data/                   # Data registries & topic handbooks
│   │   ├── comProgTopics/      # C & Python handbooks and syntax items
│   │   ├── linearAlgebraTopics/# Linear algebra equations & concepts
│   │   ├── mathTopics/         # Math topics (including integration-by-parts)
│   │   ├── physicsTopics/      # Physics equations & concept derivations
│   │   ├── subjects/           # Subject definitions & routes
│   │   └── topicRegistry.js    # Unified registry resolving topic data
│   ├── pages/                  # Top-level view routes
│   │   ├── Home/               # Main landing page
│   │   ├── Subject/            # Subject overview & topic listings
│   │   ├── Topic/              # Topic Page (Split Workbench / Doc View)
│   │   └── NotFound/           # 404 & "In Development" fallbacks
│   ├── App.jsx                 # Client-side routing configuration
│   ├── index.css               # Global engineering theme & CSS variables
│   └── main.jsx                # Application DOM entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Adding or Customizing Topics

### Adding or Modifying a Subject Topic
1. Open the target subject file in `src/data/subjects/` (e.g., `physics.js`, `mathematics.js`).
2. Add or edit an entry in the `topics` array:
   ```javascript
   {
     id: 'new-topic-id',           // Unique URL slug
     title: 'Topic Title',
     description: 'Concise summary of the topic.',
     level: 'Intermediate',        // Beginner | Intermediate | Advanced
     estimatedTime: '25 min',
   }
   ```
3. Add equation derivations, variables, and worked numerical examples in `src/data/<subject>Topics/`.
4. Create or assign an interactive visualizer in `src/components/visualizations/<subject>/`.

---

## 📜 License

This project is open-source and intended for educational and engineering learning purposes.
