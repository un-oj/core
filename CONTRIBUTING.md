# Contributing Guide

UnOJ is made by love, thank you for your interest in contributing to UnOJ Core! This document will guide you through the contribution process.

## Project Overview

UnOJ is:

- A unified online judge information collector
- A library makes things like [VJudge](https://vjudge.net) easier to implement

UnOJ is NOT:

- A competitive programming platform or toolkit
- A service for end-users

## Questions and Support

If you have any questions or need help, please search on GitHub. If can't find the answer, you can open a [discussion](https://github.com/un-oj/core/discussions).

Or if you think it's a bug, feature request etc., opening an issue a better choice. See the next section.

## Workflow

1. **(optional)** Create an issue on GitHub to describe the bug, feature, etc.
2. Fork the repository and make your changes in a new branch
    1. Write tests ([TDD](https://en.wikipedia.org/wiki/Test-driven_development)) if applicable
    2. Make your ideas into code
    3. Check if tests, ESLint and TypeScript feel okay
3. Create a pull request to `un-oj/core:main`

    The title is usually the final commit message of the merged commit, so make it clear
4. Wait for review
5. The changes will be squashed and merged into `main`

## Commit Message

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Checkout [commitlint config](./commitlint.config.js) for details.

## Scripts

- `bun run build`: Compile the project into JS to `dist/`
- `bun run dev`: Run `./scripts/dev.ts`
- `bun run lint`: Lint the code
- `bun run lint --fix`: Lint and fix the code
- `bun run test`: Run tests (see [`bun test` docs](https://bun.sh/docs/cli/test))
- `bun run type-check`: Type check the project

## Releasing

We use [SemVer](https://semver.org/spec/v2.0.0.html).

1. Write changelog
2. Bump version field in `jsr.json` `package.json`
3. Commit with message `release: v{version}`
4. Push to `main`
5. Create a release on GitHub:

    Tag: `v{version}`

    Title: `UnOJ v{version}`

    Description: the content added in step 1
6. Publish the release, GitHub Actions will build and publish the package
7. If publishing failed:

    1. Unpublish GitHub release
    2. Delete the tag
    3. Fix the code on `main`, goto step 3

Thank you for contributing to UnOJ!
