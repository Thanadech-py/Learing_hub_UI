# Learning Space

Explanations and visualizations for each topic in every subject.

**Tech stack:** Node.js · React · Vite

## Getting started

Requires Node.js 20.19+ (Vite 8). The repo pins Node 24 via `.nvmrc`.

```bash
nvm use
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| URL                                | Page                                                           |
| ---------------------------------- | -------------------------------------------------------------- |
| `/`                                | Home — list of subjects                                        |
| `/subjects/:subjectId`             | Subject — list of its topics                                   |
| `/subjects/:subjectId/:topicId`    | Dedicated Topic Page — Interactive Lab & Equation Explanations |

## Project structure

```
src/
├── main.jsx                      # React entry point
├── App.jsx                       # Routes
├── index.css                     # Global theme, resets, shared styles
├── data/
│   └── subjects/
│       ├── index.js              # Subject registry (order shown on Home)
│       ├── physics.js            # ← edit topics here
│       ├── mathematics.js
│       ├── linear-algebra.js
│       └── com-prog.js
├── components/
│   ├── Layout/                   # Shared nav + footer
│   ├── SubjectCard/              # Subject card + icons (Home)
│   ├── TopicCard/                # Topic card (Subject page)
│   └── ScrollToTop.jsx
└── pages/
    ├── Home/
    ├── Subject/                  # Topic list for one subject
    └── NotFound/
```

## Editing topics

Open the subject's file in `src/data/subjects/` and edit its `topics` array:

```js
{
  id: 'kinematics',            // unique, lowercase-with-dashes (used in URLs later)
  title: 'Kinematics',
  description: 'Describe motion with displacement, velocity, and acceleration.',
  level: 'Beginner',           // optional: Beginner | Intermediate | Advanced
},
```

The Home card preview and the subject page both update automatically.

## Adding a subject

1. Copy an existing file in `src/data/subjects/` and edit it.
2. Import it in `src/data/subjects/index.js` and add it to the `subjects` array.
3. (Optional) add an icon in `src/components/SubjectCard/SubjectIcon.jsx`.
