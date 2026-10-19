# 🗄️ Learning Space Mini-Database (`src/database/`)

This directory operates as the **file-based Mini-Database** for **Learning Space**, storing knowledge in **Markdown (`.md`) files with YAML frontmatter**.

## Architecture Overview

- **`src/database/content/`**: Contains `.md` documents organized by subject (`physics/`, `mathematics/`, `linear-algebra/`, `com-prog/`).
- **`src/database/parser.js`**: Extracts YAML frontmatter (`js-yaml`) and Markdown body.
- **`src/database/schema.js`**: Normalizes frontmatter metadata (`equations`, `keyConcepts`, `overview`, `interactiveLab`) and attaches the `markdownBody`.
- **`src/database/client.js`**: Auto-discovers all `.md` files via Vite's `import.meta.glob('./content/**/*.md')` and exposes `db.getTopic()`, `db.resolveTopicWithDb()`, `db.getAllForSubject()`, and `db.search()`.

## Adding a New Knowledge Record

Create a `.md` file at `src/database/content/<subjectId>/<topicId>.md` (or `src/database/content/<subjectId>/<topicId>/<subTopicId>.md` for multi-chapter topics like `integrals`):

```markdown
---
id: topic-slug
title: Topic Title
subtitle: Concise one-sentence summary
level: Intermediate
estimatedTime: 25 min read + interactive lab
overview:
  - First overview paragraph.
  - Second overview paragraph.
equations:
  - name: Governing Equation Title
    latex: "E = mc^2"
    summary: Brief explanation of the formula.
    variables:
      - symbol: E
        name: Rest Energy
        unit: "\\text{J}"
        description: Total energy stored in mass m.
        connections: Directly proportional to mass m.
---

## 1. Section Heading

Write standard Markdown prose with inline LaTeX ($v = dx/dt$) and block LaTeX:

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

> [!NOTE]
> Use GitHub-style alerts (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) for callout boxes.
```
