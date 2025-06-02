/**
 * This entry point exports some utilities. Most of the time, you will want to import from the specific platform like `/platforms/codeforces`.
 *
 * See {@link Platform} for the common behavior and conventions of all platforms,
 * such as method names, error handling, etc.
 *
 * @module
 */

// eslint-disable-next-line unused-imports/no-unused-imports
import type { Platform } from './platform.ts';

export * from './contest.ts';
export * from './platform.ts';
export * from './problem.ts';
