# Fireside Holidaze - Project Exam 2

## About the Project

This project is a collaboration between Veronika Aas, Herman Hylland, and Madelen Sletteberg.

**Welcome to Holidaze**
"Each getaway is handpicked to deliver the essence of slow living — think crackling fireplaces, cozy interiors, and snow-dusted pines just outside your window. From serene forest hideaways to mountainside retreats, our collection invites you to pause, breathe, and rediscover the beauty of being still. At Holidaze, comfort isn't a feature — it's the entire experience."

This project is the **frontend implementation** of Holidaze, built on an existing backend API provided by Noroff. The API handles user management, venue listings, and booking functionality, while this frontend will bring the user interface to life with a cozy, responsive design.

![Skjermbilde 2025-06-02 195003](https://github.com/user-attachments/assets/8368e20e-ce46-4ca4-b677-3d918d8a6f11)

---

## Table of Contents

1. [Features](#features)
2. [Target Audience](#target-audience)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation and Setup](#installation-and-setup)
4. [Development Tools and Configuration](#development-tools-and-configuration)
   - [Tools Used](#tools-used)
   - [Linting and Formatting](#linting-and-formatting)
5. [Commit Message Guidelines](#commit-message-guidelines)
   - [Format](#format)
   - [Types](#types)
6. [Authors](#authors)
7. [License](#license)


---

## Features

- User registration and login for authenticated access for both customers and venue managers.
- Browse and search venues (available to all users).
- Create, edit and delete venues, as well as see upcoming bookings on the venues (authenticated users - venue managers).
- Book venues and view upcoming bookings (authenticated users - customers).
- Profile management, including avatar updates (authenticated users - customers and venue managers).
- To ensure a professional feed of venues and avoid clutter, only venues created containing the phrase "Only available through Fireside Holidaze" in the venue description will be displayed on the app. 

---

## Target Audience

Young to middle-aged adults (25–45) who live busy, possibly urban lives and crave rest, quiet, and intentional slow living. They value comfort, nature, and mindfulness.

---

## Getting Started

### Prerequisites

To run the project locally, you’ll need:

- **Node.js** (v16 or later)
- **npm** (Node Package Manager, comes with Node.js)
- A code editor like **Visual Studio Code**

### Installation and Setup

1. **Clone the Repository**

```bash
   git clone https://github.com/your-username/Fireside-Holidaze.git
```

2. **Install Dependencies**

```bash
   npm install
```

3. **Run the Development Server**

```bash
   npm run dev
```

Open the development server in your browser at the provided local host port link.

4. **Build for Production**
   To create an optimized production build:

```bash
   npm run build
```

5. **Preview the Build**
   To preview the production build locally:

```bash
   npm run preview
```

---

## Development Tools and Configuration

### Tools Used

- Vite: For fast and modern frontend tooling.
- ESLint: To enforce consistent code quality.
- Prettier: For automatic code formatting.
- Husky: To enforce pre-commit hooks, ensuring quality at every step.
- Lint-Staged: Runs linters and formatters on staged files.

### Linting and Formatting

To manually run linting and formatting:

- **Lint the code:**

```bash
   npm run lint
```

- **Format the code:**

```bash
   npm run format
```

---

## Commit Message Guidelines

We follow the Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard to maintain a clear and consistent commit history. This ensures commits are easy to understand and align with best practices for version control.

### Format

Commit messages should follow this format:
<type>: <short description>
Use present tense and the imperative mood (e.g., "add," not "added" or "adds").
Keep the description concise but meaningful.

### Types

- **`feat:`** Adding a new feature.  
  _Example_: `feat: implement user registration form`

- **`fix:`** Fixing a bug.  
  _Example_: `fix: resolve broken API integration`

- **`build:`** Changes related to the build system or external dependencies.  
  _Example_: `build: configure ESLint and Prettier`

- **`chore:`** Maintenance tasks that don't affect functionality.  
  _Example_: `chore: update README.md`

- **`style:`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).  
  _Example_: `style: run prettier formatting on files`

- **`docs:`** Updates to documentation.  
  _Example_: `docs: add setup instructions to README`

- **`refactor:`** Code restructuring without changing functionality.  
  _Example_: `refactor: simplify user authentication logic`

- **`test:`** Adding or updating tests.  
  _Example_: `test: add unit tests for login functionality`

---

## Authors

Veronika Aas - [@VeronikaAas](https://github.com/VeronikaAas)

Herman Hylland - [@Hermanhyl](https://github.com/Hermanhyl)

Madelen Sletteberg - [@maddipaddi](https://github.com/maddipaddi)

---

## License

This project is for educational purposes only as part of the Noroff Frontend Development curriculum. It is not intended for commercial use.

---
