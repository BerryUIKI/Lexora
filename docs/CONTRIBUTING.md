# Contributing to Lexora

Thank you for your interest in contributing to **Lexora**! 🎉 We welcome contributions from developers, technical writers, and designers of all skill levels. Whether you are fixing a bug, proposing a new feature, writing documentation, or enhancing performance, your help makes Lexora better for everyone.

---

## 1. Code of Conduct

All contributors and maintainers are expected to adhere to our Code of Conduct. Please be welcoming, constructive, respectful, and considerate of fellow community members during all interactions within the Lexora ecosystem.

---

## 2. Getting Started & Development Setup

Before making any changes, please review our comprehensive [Development Guide](DEVELOPMENT.md) to ensure your local environment is configured with the required prerequisites:
- Node.js 20+ & pnpm 9+
- Rust 1.85+ (Rust 2024 edition)
- Platform-specific Tauri v2 dependencies

---

## 3. Reporting Bugs

If you encounter an issue while using or developing Lexora, please submit a bug report via GitHub Issues:

1. **Search Existing Issues**: Verify that the bug has not already been reported or resolved.
2. **Use the Bug Report Template**: Include the following details:
   - **Environment**: Operating System, OS version, Lexora version, Rust version, and Node version.
   - **Steps to Reproduce**: Clear, numbered steps to trigger the bug.
   - **Expected vs. Actual Behavior**: What you expected to happen vs. what actually happened.
   - **Screenshots / Video / Logs**: Attach relevant terminal logs or console outputs if applicable.
   - **Sample Markdown**: If the issue relates to editor rendering, provide the sample Markdown content causing the failure.

---

## 4. Suggesting Features & Enhancements

We are eager to hear ideas for improving Lexora:

1. Open a **Feature Request** on GitHub Issues.
2. Clearly explain the motivation and use case for the proposed feature.
3. Detail how the feature should behave and how it aligns with Lexora's Typora-style WYSIWYG philosophy.
4. Discuss architectural considerations (e.g., frontend SolidJS vs. backend Rust implementation) before beginning work on a large pull request.

---

## 5. Branch Naming Conventions

When creating branches for your work, use the following prefix conventions:

- `feature/<short-description>`: New features or capabilities (e.g., `feature/table-editor`)
- `bugfix/<short-description>`: Bug fixes (e.g., `bugfix/file-rename-sync`)
- `docs/<short-description>`: Documentation additions or updates (e.g., `docs/ipc-commands`)
- `refactor/<short-description>`: Code refactoring without behavioral changes (e.g., `refactor/state-cleanup`)
- `test/<short-description>`: Adding or fixing test suites (e.g., `test/e2e-tabs`)

---

## 6. Commit Message Guidelines

Lexora follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This allows automated changelog generation and clear versioning:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Supported Types:
- `feat`: A new user-facing or API feature
- `fix`: A bug fix
- `docs`: Documentation updates only
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Build process, tooling, or dependency updates
- `perf`: Performance improvements

### Examples:
- `feat(editor): implement shortcut for inline math formula`
- `fix(fs): prevent file overwrite on atomic save error`
- `docs(dev): update Tauri v2 installation prerequisites`

---

## 7. Pull Request Process

1. **Fork and Branch**: Fork the repository and create your working branch from `main` (or the active `develop` branch).
2. **Develop & Test**:
   - Write clean, type-safe code adhering to project standards.
   - Add unit tests for new logic (frontend Vitest or backend Rust tests).
   - Ensure all linters and tests pass locally:
     ```bash
     pnpm lint
     pnpm test
     cargo test --manifest-path src-tauri/Cargo.toml
     ```
3. **Submit PR**:
   - Provide a clear summary of changes in the PR description.
   - Reference any related issues (e.g., `Closes #42`).
   - Include before/after screenshots or GIFs for UI changes.
4. **Address Review Feedback**: Collaborate with maintainers during the code review process.

---

## 8. Code Review Guidelines

During code reviews, maintainers evaluate:
- **Performance**: Does the change introduce latency into the typing loop or file opening sequence?
- **Security**: Does the IPC command expose unnecessary filesystem access or violate Tauri capabilities?
- **Type Safety**: Are TypeScript and Rust types strict, avoiding `any` or unchecked unwrap operations?
- **User Experience**: Does the UI match the clean, minimalistic Typora-inspired aesthetic?

Thank you for helping make Lexora great!
