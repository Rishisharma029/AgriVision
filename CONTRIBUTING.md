# Contributing to LeafSense AI 🌿

Thank you for your interest in contributing to LeafSense AI! We welcome contributions from developers, agronomists, data scientists, and anyone interested in improving agricultural technology.

---

## 🛠️ How Can I Contribute?

### 1. Reporting Bugs
* Check the existing issues/discussions to see if the bug has already been reported.
* Open a new issue with a clear title and description.
* Include steps to reproduce the issue, the expected behavior, and screenshots or logs if possible.

### 2. Suggesting Enhancements
* Open an issue explaining the proposed feature and why it would be beneficial.
* Provide mockups or design outlines if the suggestion includes UI changes.

### 3. Pull Requests (PRs)
* Fork the repository and create your branch from `master`.
* If you've added code that should be tested, add tests.
* Ensure the test suite passes (`pytest` for the backend, `npm run build` for the frontend).
* Document any changes to the API or configuration parameters.
* Make sure your code lints and compiles clean.

---

## 💻 Development Workflow

### Frontend Guidelines
* The frontend uses **React 19**, **TypeScript**, and **Tailwind CSS**.
* Keep components clean, modular, and reusable.
* Always check performance profiles: optimize rendering for lower-end devices.
* Save persistent diagnostic session records locally via `useHistoryStore` and **Dexie.js**.

### Backend Guidelines
* The backend is built on **FastAPI**, **SQLite**, and **PyTorch**.
* Use the repository pattern for database accesses.
* Ensure all endpoints include proper exception handling via custom handlers in `app/main.py`.
* Ensure that logging captures `correlation_id` correctly.

---

## 📜 Code of Conduct
We are committed to providing a friendly, safe, and welcoming environment for all contributors. Please be respectful and professional in all communications.
