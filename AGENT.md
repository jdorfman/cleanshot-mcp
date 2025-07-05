# CleanShot MCP Server

## Commands

- Build: `npm run build`
- Dev: `npm run dev` (TypeScript watch mode)
- Start: `npm start`
- Test: `node dist/index.js` (basic functionality test)

## Architecture

- **MCP Server**: Single-file TypeScript server using @modelcontextprotocol/sdk
- **Entry Point**: src/index.ts (compiled to dist/index.js)
- **Types**: src/types.ts (TypeScript interfaces)
- **URL Scheme**: CleanShot URL scheme integration via macOS `open` command
- **Tools**: 17 CleanShot tools (screenshot, recording, annotation, settings)

## Code Style

- **ES Modules**: Uses ES2022 target with ESNext modules
- **TypeScript**: Strict mode enabled, all imports use .js extensions
- **Zod**: Schema validation for all tool parameters
- **Async/Await**: Promisified exec for URL launching
- **Naming**: camelCase for variables, kebab-case for URL commands
- **Error Handling**: Try/catch with Error objects, return isError: true for tool errors
- **Interfaces**: Optional parameters with ? notation, union types for enums

## Git

When `/git` is included in a prompt, you will exclusively use the following Git commands to help you accomplish the following tasks:

- `git status --short` - To check the current state of your repository
- `git add` - To stage files for commit
- `git -no-pager diff` - To view changes between commits or working
directory and index
- `git commit` - To record changes to the repository (summarizing git status and git diff)
- `git push` - To push changes to the remote repository
- `gh pr create --fill` - Use GitHub CLI to create a pull request
