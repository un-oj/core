export { version } from '../package.json' with { type: 'json' };

/** Get the first key of an object. */
export function getFirstKey<T extends Record<never, never>>(obj: T): keyof T {
  return Object.keys(obj)[0] as keyof T;
}

/**
 * Parses a human-readable time string.
 * @param s The string to parse.
 * @returns The time in milliseconds, or undefined if failed.
 */
export function parseTime(s: string): number | undefined {
  const val = Number.parseInt(s);
  if (Number.isNaN(val))
    return;
  switch (s) {
    case `${val} second`:
    case `${val} seconds`:
    case `${val} sec`:
    case `${val} secs`:
      return val * 1000;
  }
}

const MEMORY_UNITS: Record<string, number> = {
  megabyte: 1024 * 1024,
  megabytes: 1024 * 1024,
  MB: 1024 * 1024,
  MiB: 1024 * 1024,
};

/**
 * Parses a human-readable memory size string.
 *
 * @param s The string to parse.
 * @returns The memory size in bytes, or undefined if failed.
 */
export function parseMemory(s: string): number | undefined {
  const [, val, unit] = s.match(/^(\d+) ([a-z]+)$/i) ?? [];
  if (!val || !unit)
    return;
  return Number(val) * MEMORY_UNITS[unit];
}

/**
 * Adds key-value pairs to the provided headers object if they aren't present.
 *
 * @param h The original headers object.
 * @param add The key-value pairs to add.
 * @returns A **new** headers object.
 */
export function addHeaders(h: HeadersInit | undefined, add: Array<[string, string]>): Record<string, string> {
  if (h instanceof Headers)
    h = h.toJSON();
  if (Array.isArray(h))
    h = Object.fromEntries(h);
  else if (h == null)
    h = {};
  else
    h = structuredClone(h);

  for (const item of add) {
    if (!(item[0] in h))
      h[item[0]] = item[1];
  }
  return h;
}

/** General error class for UnOJ. */
export class UnOJError extends Error {}
