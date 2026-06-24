# Project Rules

- **English Only**: Write all code, components, variable names, functions, comments, and commit messages strictly in English.
- **TypeScript Always**: Always use explicit TypeScript types. Avoid `any` at all costs. Use interfaces for props and strict types for state.
- **Functional Components**: Use strict functional components with arrow functions. Define props clearly and avoid legacy React patterns.
- **Hooks First**: Extract complex stateful logic, data fetching, or heavy operations into dedicated custom hooks (`useCustomHook`).
- **No Repetitive Code**: Do not duplicate or repeat massive blocks of code. Rely on clean utility functions or shared helper components.
- **Avoid DRY Dogma**: Avoid over-engineering and premature abstractions just to follow DRY. Prefer readability and local simplicity over complex, generic logic.
- **Tailwind Utility First**: Rely strictly on Tailwind CSS utility classes. Avoid inline styles or custom CSS files unless completely necessary.
- **No Code Placeholders**: Always output complete, functional code blocks. Do not insert placeholders like `// TODO:` or `// ... previous code here`.
- **Incremental Changes**: When modifying existing code, preserve intact logic and only rewrite the specific lines or blocks necessary.
- **Concise Explanations**: Prioritize actual code implementation. Keep explanations brief, clear, and focused on the solution.