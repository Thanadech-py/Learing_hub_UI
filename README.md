# 🪐 Learning Space (Learning Hub UI)

An interactive bilingual (EN / TH) STEM learning platform combining rigorous mathematical derivations, real-time 2D/3D physics simulations, dynamic linear algebra transformations, an integrated programming laboratory, and a cloud-synchronized repository of master reference PDF handbooks.

![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%2018%20%7C%20Vite%208%20%7C%20KaTeX-blue?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-%3E%3D20.19.0-green?style=flat-square)
![Language Support](https://img.shields.io/badge/Edition-Bilingual%20(EN%20%2F%20TH)-06b6d4?style=flat-square)
![UI](https://img.shields.io/badge/Theme-Dark%20Engineering%20UI-purple?style=flat-square)

---

## 🌟 Key Features

### 🔭 1. Interactive 2D & 3D Visualizations
- **Dual 2D / 3D Dimension Switcher**: Switch between classic 2D interactive canvas/SVG visualizers and full 3D isometric projections with drag-to-orbit rotation and zoom.
- **Physics Engine Simulations**:
  - *Kinematics*: 2D/3D projectile motion with drag, trajectory tracing, launch angle, and velocity vectors.
  - *Forces & Newton's Laws*: Inclined plane with static/kinetic friction, normal force, and gravity vector decomposition.
  - *Energy & Work*: Conservation of mechanical energy on curved tracks, spring-mass harmonic oscillators, and potential-kinetic exchange.
  - *Waves, Elasticity, Fluids & Thermodynamics*: Transverse/longitudinal wave propagation, stress-strain curves, Bernoulli fluid transport, and ideal gas thermodynamic cycles.
- **Calculus & Linear Algebra**:
  - *Derivatives*: Tangent line slopes, secant lines, and $\epsilon$-$\delta$ limits.
  - *Integrals Sub-Topic Hub*: Foundations & Riemann sums, Fundamental Theorem of Calculus, $u$-Substitution, Integration by Parts (including tabular $D$-$I$ reduction and cyclic identities for $e^{ax}\cos(bx)$, $e^{ax}\sin(bx)$, and $e^{ax}\tan(bx)$), Trig Substitution, and Partial Fractions.
  - *Linear Algebra*: Vector spans, dot/cross products, matrix transformations, Gaussian elimination, determinants, orthogonality, eigenvalues, diagonalization, positive definite quadratic forms, and Singular Value Decomposition (SVD).

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

### ☁️ 4. Cloud Master Handbooks & Dynamic Google Drive Sync (`/handbooks`)
- **Zero-Repo-Bloat Cloud Storage**: All 24+ master reference handbook volumes (45+ Thai & English PDF editions) are hosted on Google Drive instead of bloating the Git repository.
- **Instant Direct-to-Device Download**: Clicking any **Download (`📥`)** button triggers an immediate device download via Google Drive's `uc?export=download` attachment stream inside a sandboxed hidden frame—**without opening new tabs or redirecting away from the app**.
- **Separate Browser Preview**: Clicking **Read / Preview (`👁️`)** opens the document in Google Drive's PDF viewer in a separate tab.
- **Dynamic Folder & File Auto-Discovery**:
  - Uploading new PDFs or creating new subject folders on Google Drive automatically updates the `/handbooks` release table and generates new subject filter tabs without code changes.
  - Automatically pairs Thai (`th/`) and English (`en/`) editions of the same filename into a single bilingual release strip.

### 🌐 5. Bilingual (EN / TH) Responsive Engineering UI
- **Instant EN / TH Language Switcher**: Toggle between English and Thai interfaces, topic explanations, equation variable breakdowns, and handbook editions.
- **Dark Theme Engineering Aesthetic**: Low eye-strain design with subject-specific accent neon colors.
- **Collapsible Sidebar & Split Workbench**: Keep interactive visualizations docked beside derivations while scrolling, or expand to full width.

---

## 📚 Subject & Route Architecture

| Area / Subject | Route | Highlights |
| :--- | :--- | :--- |
| **Physics** | `/subjects/physics` | Kinematics, Newton's Laws, Work & Energy, Momentum, Rotation, Elasticity, Fluids, Oscillations, Waves, Thermodynamics |
| **Mathematics** | `/subjects/mathematics` | Number Systems, Algebraic Expressions, Functions, Trigonometry, Limits, Derivatives, Integrals Hub (7 sub-topics) |
| **Linear Algebra** | `/subjects/linear-algebra` | Volumes 01–10: Vectors, Elimination, Subspaces, Determinants, Transformations, Diagonalization, Spectral Theorem, Positive Definite, SVD |
| **Computer Programming** | `/subjects/com-prog` | C Programming & Python Handbooks, Integrated IDE, MCU & ROS (*In Development*) |
| **Master Handbooks** | `/handbooks` | Ubuntu-style bilingual PDF release ledger with Google Drive direct downloads & dynamic folder sync |

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

3. **Configure Environment Variables (Optional for Custom Drive Sync)**:
   Copy `.env.example` to `.env` and set your Google Apps Script Web App URL:
   ```bash
   cp .env.example .env
   ```
   ```env
   VITE_GDRIVE_SYNC_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
   *(Note: `.env` is git-ignored so your deployment endpoint URL is never committed to public Git history. During local `npm run dev` / `npm run preview`, a built-in Vite middleware also scans the public Google Drive folder automatically).*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:5173`.

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
├── public/                     # Static assets (favicon, 404 fallback)
├── scripts/
│   ├── check-node.js           # Pre-dev/pre-build Node version validator
│   └── google-drive-folder-api.gs # Read-only Google Apps Script for dynamic Drive sync
├── src/
│   ├── components/             # Reusable UI & Visualizer components
│   │   ├── CodeSyntaxInspector/# Com-Prog grammar & syntax breakdown
│   │   ├── ComProgDocView/     # W3Schools-style chapter documentation view
│   │   ├── EquationInspector/  # Variable breakdown & dependency cards
│   │   ├── IntegrationSeriesNav/# Sub-topic navigation bar for Integrals series
│   │   ├── LanguageSlider/     # EN / TH bilingual toggle switch
│   │   ├── Layout/             # Topbar, collapsible sidebar, footer
│   │   ├── MarkdownReader/     # KaTeX + GFM Markdown article renderer
│   │   ├── MathView/           # KaTeX LaTeX renderer wrapper
│   │   ├── SubjectCard/        # Home page subject cards
│   │   ├── TopicCard/          # Subject topic cards with status badges
│   │   ├── TopicDownloadBtn/   # Contextual Google Drive PDF handbook download card
│   │   └── visualizations/     # 2D & 3D Interactive Visualizers
│   │       ├── comProg/        # Integrated IDE & Memory Inspector
│   │       ├── linearAlgebra/  # 2D & 3D Vector / Matrix visualizers
│   │       ├── math/           # Integrals & Derivatives visualizers
│   │       ├── physics/        # Projectile, Newton, Energy, Wave visualizers
│   │       └── shared/         # Universal 3D isometric canvas engine
│   ├── database/               # 🗄️ File-Based Mini-Database (Markdown + YAML)
│   │   ├── content/            # Knowledge base .md records by subject
│   │   ├── client.js           # In-memory query engine & indexer
│   │   ├── parser.js           # YAML frontmatter + Markdown extractor
│   │   └── schema.js           # Record normalizer & schema defaults
│   ├── data/                   # Data registries & topic definitions
│   │   ├── comProgTopics/      # C & Python handbooks and syntax items
│   │   ├── linearAlgebraTopics/# Linear algebra equations & concepts
│   │   ├── mathTopics/         # Math topics (including integration-by-parts)
│   │   ├── physicsTopics/      # Physics equations & concept derivations
│   │   ├── subjects/           # Subject definitions & routes
│   │   ├── handbooksRegistry.js# Google Drive File ID ledger & direct download helpers
│   │   └── topicRegistry.js    # Unified registry resolving DB & legacy data
│   ├── i18n/                   # Thai/English translation dictionaries & LanguageContext
│   ├── pages/                  # Top-level view routes
│   │   ├── Handbooks/          # Official Master Reference Handbooks release page
│   │   ├── Home/               # Main landing page
│   │   ├── Subject/            # Subject overview & topic listings
│   │   ├── Topic/              # Topic Page (Split Workbench / Doc View)
│   │   └── NotFound/           # 404 & "In Development" fallbacks
│   ├── services/
│   │   └── googleDriveSync.js  # Dynamic Google Drive folder & file synchronization service
│   ├── App.jsx                 # Client-side routing configuration
│   ├── index.css               # Global engineering theme & CSS variables
│   └── main.jsx                # Application DOM entry point
├── .env.example                # Template for environment variables
├── package.json
├── vite.config.js              # Vite config + zero-config Google Drive dev sync plugin
└── README.md
```

---

## ☁️ Managing Handbooks on Google Drive (Dynamic Auto-Sync)

### Folder Structure on Google Drive
```
📁 handbooks (Root Folder: 1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl)
 ├── 📁 physics
 │    ├── 📁 th   (Thai PDF editions)
 │    └── 📁 en   (English PDF editions)
 ├── 📁 linear-algebra
 │    ├── 📁 th
 │    └── 📁 en
 ├── 📁 com-prog
 │    ├── 📁 th
 │    └── 📁 en
 └── 📁 <any-new-subject> (e.g. mathematics, robotics, electronics)
      ├── 📁 th
      └── 📁 en
```

1. **Adding a New Handbook Volume**:
   - Upload the Thai PDF to `<subject>/th/` and the English PDF to `<subject>/en/` using the same base filename (e.g. `Mathematics - 01 Limits & Continuity.pdf`).
   - The web app automatically merges both files into a single release strip, extracts the volume code (`MATH-01`), calculates the file sizes (`KB`/`MB`), and enables instant direct-to-device downloads.
2. **Adding a New Subject Folder**:
   - Create a new folder under the Root Folder on Google Drive (e.g. `mathematics`).
   - *(Optional)* Add a folder description in Google Drive using the format `ชื่อภาษาไทย | English Name | Icon | #HexColor` (e.g. `คณิตศาสตร์ | Mathematics | ∫ | #f59e0b`) to customize its subject tab pill.
3. **Optional File Metadata via Google Drive Description**:
   - In Google Drive, right-click any PDF -> *File information* -> **Description**, and add optional lines:
     ```text
     titleTh: คณิตศาสตร์ เล่ม 1: ลิมิตและความต่อเนื่อง
     pages: 24
     topics: limits, derivatives
     #Limits #Calculus
     สรุปทฤษฎีบทลิมิตและความต่อเนื่องพร้อมตัวอย่างโจทย์
     ```

### 🔒 Security Architecture
- **No Secret Keys in Git**: `.env` is excluded via `.gitignore`; only `.env.example` is tracked.
- **Server-Side Locked Folder Scope**: `scripts/google-drive-folder-api.gs` hardcodes `ROOT_FOLDER_ID` server-side and operates strictly in read-only mode (`drive.readonly`). External users cannot query other folders in your Google Drive or modify any files.
- **Anti-Abuse Cooldown Guard**: Enforces a minimum 60-second cooldown between live Drive scans even when `?refresh=1` is requested repeatedly, protecting daily Google Apps Script quotas.
- **Strict ID & Origin Validation**: All Drive File IDs and download URLs are validated against strict regular expressions (`isValidDriveId`, `isSafeDownloadUrl`) prior to rendering or downloading.

---

## 🛠️ Adding or Customizing Topics in the Mini-Database

### Creating a Knowledge Record (`src/database/content/`)
1. Create a Markdown file with YAML frontmatter at `src/database/content/<subjectId>/<topicId>.md` (or `src/database/content/<subjectId>/<topicId>/<subTopicId>.md`):
   ```markdown
   ---
   id: topic-slug
   title: Topic Title
   subtitle: Concise summary of the topic.
   level: Intermediate
   estimatedTime: 25 min read + interactive lab
   equations:
     - name: Governing Equation
       latex: "E = mc^2"
       summary: Relates mass and energy.
       variables:
         - symbol: E
           name: Energy
           unit: "\\text{J}"
           description: Rest energy of the body.
   ---

   ## 1. Derivation & Theory
   Write standard Markdown with inline LaTeX ($v = dx/dt$) and block formulas:
   $$\int_a^b f(x)\,dx = F(b) - F(a)$$
   ```
2. The mini-database client (`src/database/client.js`) automatically indexes all `.md` files via Vite's `import.meta.glob` and hot-reloads changes in real time.

---

## 📜 License

This project is open-source and intended for educational and engineering learning purposes.
