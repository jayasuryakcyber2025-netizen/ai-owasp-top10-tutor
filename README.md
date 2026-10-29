# AI OWASP Top 10 Tutor

A responsive, beginner-friendly web app for learning the **OWASP Top 10:2025 Web Application Security Risks**. Built with HTML, CSS, and vanilla JavaScript—no framework, backend, API key, or installation required.

> **Project note:** The “AI Tutor” in this version is a local, rule-based study assistant backed by a small knowledge base. It is not connected to a live large language model. This keeps the project free to run and avoids sending questions to a server.

## Features

- Study cards for all 10 OWASP Top 10:2025 categories.
- Search and open topic notes, examples, and prevention tips.
- Local study assistant with topic-aware answers and suggested prompts.
- Five-question quiz with feedback and score tracking.
- Progress and best quiz score saved in browser `localStorage`.
- Light/dark theme toggle and responsive mobile layout.
- No account, backend, dependencies, or API key needed.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

Optional local server (Python installed):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new repository on GitHub, for example `ai-owasp-top10-tutor`.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the other project files.
3. Open **Settings → Pages** in the repository.
4. Under the build/deployment section, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish your site.

## Project structure

```text
ai-owasp-top10-tutor/
├── index.html       # Page structure
├── style.css        # Responsive styling and themes
├── script.js        # Topic content, tutor, quiz, progress
├── README.md        # Project overview and setup
├── LICENSE          # MIT license for this project code
└── .gitignore
```

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

## Safety and scope

This is an educational awareness tool, not a vulnerability scanner or a substitute for a professional security review. Use security testing techniques only on systems you own or have explicit permission to test.

## Official reference

The topics are based on the OWASP Top 10:2025 list. Refer to the [official OWASP Top 10:2025 site](https://top10.owasp.org/2025/) for the authoritative documentation. OWASP categories and wording may be updated over time.

## License

The project code is provided under the MIT License. OWASP is a separate organization; this project is an independent educational demo and is not an official OWASP product.
