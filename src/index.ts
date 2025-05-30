/**
 * This entry point exports some utilities.
 * Most of the time, you will want to do like this:
 *
 * ```ts
 * import Codeforces from '@un-oj/core/platforms/codeforces';
 * const cf = new Codeforces();
 * ```
 *
 * See {@link Platform} for the common behavior and conventions of all platforms,
 * such as method names, error handling, etc.
 *
 * @module
 */

// eslint-disable-next-line unused-imports/no-unused-imports
import type { Platform } from './platform';

export * from './contest';
export * from './platform';
export * from './problem';
