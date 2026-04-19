# claude-code-skill-test

Test repository for exploring the Claude Code github-git skill workflow — issue tracking, branching, conventional commits, PRs, and releases.

## Contributing

1. Create an issue describing the change
2. Create a branch from `develop` (`feature/<issue-number>-<slug>`)
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a PR into `develop`
5. Wait for review and CI to pass

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **State Management/API**: Axios (configured for Laravel Sanctum)
- **Testing**: Vitest + React Testing Library
- **Linting/Formatting**: ESLint + Prettier

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run test`: Run tests with Vitest

## License

This project is licensed under the [MIT License](LICENSE).
