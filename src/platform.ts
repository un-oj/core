/* eslint-disable jsdoc/require-returns-check */
import type { $Fetch, CreateFetchOptions, FetchOptions } from 'ofetch';
import { ofetch } from 'ofetch';
import { addHeaders, UnOJError, version } from './utils';

export type ProblemType = 'traditional' | 'interactive' | 'communication' | 'submission';

export interface ProblemIOSample {
  input: string
  output: string
}

export interface ProblemDescriptionObject {
  background: string
  details: string
  input: string
  output: string
  hint: string
}

export interface Problem<
  Desc extends string | ProblemDescriptionObject = string | ProblemDescriptionObject,
  Limits extends number | number[] = number | number[],
  Difficulty extends string | number = string | number,
> {
  id: string
  type: ProblemType
  title: string
  description: Desc
  link?: string
  samples?: ProblemIOSample[]
  /** The time limit in milliseconds. */
  timeLimit?: Limits
  /** The memory limit in bytes. */
  memoryLimit?: Limits
  tags?: string[]
  difficulty?: Difficulty
}

export interface PlatformOptions {
  /**
   * {@link ofetch} instance to use.
   *
   * Overrides {@link ofetchDefaults} {@link ofetchCreateOptions} {@link baseURL}
   */
  ofetch?: $Fetch
  ofetchDefaults?: FetchOptions
  ofetchCreateOptions?: CreateFetchOptions
  baseURL?: string
  /** I18n locale if the platform supports i18n. */
  locale?: string
}

/** An Online Judge platform. */
export abstract class Platform {
  abstract readonly name: string;
  readonly ofetch: $Fetch;
  readonly baseURL: string;

  /** I18n locale if supported. */
  locale?: string;

  constructor(
    options: PlatformOptions | undefined,
    defaultBaseURL: string,
  ) {
    const { headers } = options?.ofetchDefaults ?? {};
    this.baseURL = options?.baseURL ?? defaultBaseURL;

    this.ofetch = options?.ofetch ?? ofetch.create({
      ...options?.ofetchDefaults,
      baseURL: this.baseURL,
      headers: addHeaders(headers, [['user-agent', `UnOJ/${version}`]]),
    }, options?.ofetchCreateOptions);

    this.locale = options?.locale;
  }

  /**
   * Fetch a problem from the platform.
   * @param _id The problem ID.
   * @returns The problem object.
   */
  getProblem(_id: string): Promise<Problem> {
    throw new UnsupportedError(this.name, 'getProblem');
  }
}

/** An error that indicates a platform does not support a certain operation. */
export class UnsupportedError extends UnOJError {
  constructor(platform: string, operation: string) {
    super(`${platform} does not support '${operation}'`);
  }
}

/** An error that indicates a platform does not have a certain resource. */
export class NotFoundError extends UnOJError {
  constructor(platform: string, thing: string, id: string) {
    super(`${platform} does not have ${thing} '${id}'`);
  }
}
