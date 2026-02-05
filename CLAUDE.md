# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChoDocs is a Chinese front-end learning documentation website built with VitePress. It contains interview questions, algorithms, design patterns, programming tutorials, and learning resources for front-end developers.

## Technology Stack

- **Framework**: VitePress (Vue 3-based static site generator)
- **Build Tool**: Vite 4
- **Package Manager**: pnpm (v9.15.9, required)
- **Language**: TypeScript
- **Styling**: UnoCSS + PostCSS (with postcss-nested)
- **PWA**: @vite-pwa/vitepress for Progressive Web App support
- **Icons**: unplugin-icons with @iconify/json
- **Linting**: ESLint with @antfu/eslint-config
- **Git Hooks**: simple-git-hooks + lint-staged for pre-commit linting

## Common Commands

### Development
```bash
pnpm dev            # Start dev server on port 8080 with max memory allocation
pnpm build          # Build for production
pnpm serve          # Preview production build locally
```

### Linting
```bash
pnpm lint           # Run ESLint with cache
pnpm lint:fix       # Auto-fix ESLint issues (alias: nr lint --fix)
```

### Release & Updates
```bash
pnpm release        # Interactive version bump with bumpp (auto-updates contributors, commits & tags)
pnpm update         # Manually update contributors list from GitHub API
```

### Testing Single Files
When testing specific files during development, run VitePress dev mode and navigate to the specific route. There are no unit tests configured.

## Project Structure

```
docs/                           # Content root directory
├── .vitepress/                 # VitePress configuration
│   ├── config.ts               # Main VitePress config
│   ├── sidebar.ts              # Sidebar navigation structure
│   ├── algolia.ts              # Algolia search config
│   ├── link.ts                 # Social links configuration
│   ├── meta.ts                 # Site metadata
│   ├── plugins/                # Build-time plugins
│   │   ├── genFeed.ts          # RSS feed generation
│   │   ├── markdownTransform.ts # Markdown transformation plugin
│   │   └── pwa.ts              # PWA configuration
│   ├── sidebar/                # Sidebar configuration by section
│   ├── theme/                  # Custom theme extensions
│   │   ├── index.ts            # Theme entry with medium-zoom, analytics
│   │   ├── components/         # Custom Vue components
│   │   ├── plugins/            # Client-side plugins (Baidu/Google analytics)
│   │   ├── styles/             # Global styles
│   │   └── utils/              # Theme utilities
│   └── cache/                  # Build cache
├── vite.config.ts              # Vite config with UnoCSS, Icons, Components
├── interview/                  # Interview questions content
├── algorithm/                  # Algorithm learning content
├── patterns/                   # Design patterns content
├── program/                    # Programming tutorials
├── tool/                       # Tool guides
├── weekly/                     # Weekly learning updates
├── public/                     # Static assets
└── [other content folders]/
scripts/                        # Build/release scripts
├── update.ts                   # Update contributors
└── utils.ts                    # Shared utilities (Git, fetch, file operations)
```

## Architecture Notes

### Release Workflow
- Uses `bumpp` directly (configured in package.json)
- Automatically updates contributors and commits changes
- Creates git tag and pushes to remote

### VitePress Configuration
- Main config at `docs/.vitepress/config.ts` uses `withPwa()` wrapper
- Output directory: `../dist` (relative to docs/)
- Markdown features: line numbers enabled, deep outline levels
- Build hooks: sitemap generation + RSS feed generation in `buildEnd`

### Custom Plugins
1. **markdownTransform.ts**: Transforms markdown during build (custom Vue component handling)
2. **genFeed.ts**: Generates RSS feed at `/feed.xml` during build
3. **pwa.ts**: PWA configuration with workbox for offline support

### Theme Customization
- Extends default VitePress theme with custom components
- **medium-zoom**: Image zoom functionality auto-initialized on route changes
- **Analytics**: Baidu Tongji + Google Analytics integrated in client-side router
- Custom components auto-imported via unplugin-vue-components

### Styling System
- UnoCSS with presets: Uno, Attributify, Icons
- Custom shortcuts: `border-main`, `bg-main`, `bg-base`
- Theme colors: primary (#3eaf7c), brand (#06f)
- PostCSS with nested syntax support
- Dark mode: VitePress built-in dark mode support

### Component Auto-Import
Components in `docs/.vitepress/theme/components/` are auto-imported:
- Badge.vue, CloudinaryImg.vue, Contributors.vue
- CopyRight.vue, CustomLink.vue, DemoContainer.vue
- HomeContributors.vue, NavCard.vue, PageInfo.vue, VideoLink.vue

Icons from Iconify are auto-imported without prefix using unplugin-icons.

### Contributors System
- Contributors fetched from GitHub API (100 per page, paginated)
- Additional manual contributors list in `scripts/utils.ts`
- Bots filtered out: renovate[bot], dependabot[bot], github-actions[bot]
- Contributors saved to `docs/contributors.json`
- Updated via `pnpm update` or during `pnpm release`

### Build Process
1. VitePress builds markdown → HTML
2. Vite plugins transform Vue components
3. UnoCSS generates atomic CSS
4. PWA manifest + service worker generated
5. Sitemap generated for https://chodocs.cn/
6. RSS feed generated

## ESLint Configuration
- Base: @antfu/eslint-config
- Relaxed rules for markdown files, demo files, and scripts
- Import restrictions: `..` and `../..` paths disallowed (except in specific overrides)
- Pre-commit hook runs `lint-staged` to auto-fix staged files

## Code Style Guidelines

### Comments and Code Language
- **All code and comments MUST be in English**
- **Minimize comments** - write self-explanatory code
- **Only add critical comments** where logic is complex or non-obvious
- Avoid redundant comments that restate what the code does
- Good comment: `// Convert relative paths to absolute URLs for RSS feed compatibility`
- Bad comment: `// Loop through posts` (obvious from code)

### Examples
```typescript
// Good: Minimal, critical comments only
function removeZeroWidthSpace(str: string): string {
  return str
    .replaceAll('\u200B', '')
    .replaceAll('&#8203;', '') // HTML entity form
}

// Bad: Over-commented
function removeZeroWidthSpace(str: string): string {
  // Replace Unicode zero-width space
  return str
    .replaceAll('\u200B', '')
    // Replace HTML entity zero-width space
    .replaceAll('&#8203;', '')
}
```

## Important Conventions

### Content Files
- All content in `docs/` directory
- Markdown files with frontmatter for metadata
- Chinese language content (zh-CN locale)
- Algolia search integration for site-wide search

### Git Workflow
- Main branch: `main`
- Pre-commit hook auto-fixes linting issues
- Release script creates version tags automatically

### Commit Message Convention

Follow **Conventional Commits** format:

```
<type>(<scope>): <description>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `style`: Style/UI changes (CSS, dark mode, layout)
- `refactor`: Code refactoring without behavior change
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `chore`: Build, config, or tooling changes

**Scope examples:**
- Content sections: `interview`, `algorithm`, `patterns`, `program`, `tool`, `weekly`
- Components: `theme`, `sidebar`, `nav`, `contributors`
- Features: `pwa`, `analytics`, `search`, `feed`

**Rules:**
1. Use lowercase
2. No period at end
3. Keep under 72 characters
4. Use imperative mood ("add" not "added")
5. Chinese or English both acceptable for description
6. **DO NOT add Co-Authored-By trailers** (no AI attribution)

**Examples:**
```
style(theme): add dark mode support for code blocks
fix(sidebar): resolve navigation link highlighting issue
feat(interview): add new Vue 3 composition API questions
refactor(theme): extract analytics to separate plugin
docs(contributing): update contribution guidelines
chore(deps): upgrade vitepress to v1.6.4
```

**IMPORTANT: When creating commits, provide the commit message at the end of the response, but DO NOT auto-commit. Let the user review and commit manually. Never include Co-Authored-By or AI attribution in commit messages.**

### Environment Variables
- `UMAMI_WEBSITE_ID`: Analytics website ID (optional)
- `UMAMI_ENDPOINT`: Analytics endpoint (optional)

## Node Requirements
- Node.js >= 20.0.0 required
- pnpm 10.28.2 specified via packageManager field
