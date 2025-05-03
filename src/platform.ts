import type { $Fetch, CreateFetchOptions, FetchOptions } from 'ofetch';
import { ofetch } from 'ofetch';
import { addHeaders, UnOJError, version } from './utils';

/** A sample input/output pair for a {@link Problem}. */
export interface ProblemIOSample {
  input: string
  output: string
}

/** Well-classified {@link Problem} information. */
export interface ProblemDescriptionObject {
  background: string
  details: string
  input: string
  output: string
  hint: string
}

/** General problem information. */
export interface Problem<
  Desc extends string | ProblemDescriptionObject = string | ProblemDescriptionObject,
  Limits extends number | number[] | undefined = number | number[] | undefined,
  Difficulty extends string | number | undefined = string | number | undefined,
  Tags extends string[] | number[] | undefined = string[] | number[] | undefined,
  Type extends string = string,
> {
  id: string
  type: Type
  title: string
  /** The problem description without the samples (unless otherwise specified). */
  description: Desc
  link: string
  samples: ProblemIOSample[]
  /** The time limit in milliseconds. */
  timeLimit: Limits
  /** The memory limit in bytes. */
  memoryLimit: Limits
  tags: Tags
  difficulty: Difficulty
}

export interface PlatformOptions<Locale extends string | never = never> {
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
  locale?: Locale
}

/** An Online Judge platform. */
export abstract class Platform<Locale extends string | never = never> {
  readonly ofetch: $Fetch;
  readonly baseURL: string;

  /**
   * I18n locale if supported.
   *
   * Only platforms/methods that explicitly support i18n will use this, and the
   * format requirements are up to the platform.
   */
  locale?: Locale;

  constructor(
    options: PlatformOptions<Locale> | undefined,
    defaultBaseURL: string,
    defaultLocale?: Locale,
  ) {
    const { headers } = options?.ofetchDefaults ?? {};
    this.baseURL = options?.baseURL ?? defaultBaseURL;

    this.ofetch = options?.ofetch ?? ofetch.create({
      ...options?.ofetchDefaults,
      baseURL: this.baseURL,
      headers: addHeaders(headers, [['user-agent', `UnOJ/${version}`]]),
    }, options?.ofetchCreateOptions);

    this.locale = options?.locale ?? defaultLocale;
  }

  /**
   * Fetch a problem from the platform.
   * @param _id The problem ID.
   * @returns The problem object.
   */
  getProblem(_id: string): Promise<Problem> {
    return Promise.reject(new UnsupportedError());
  }
}

/** An error that indicates a platform does not support a certain operation. */
export class UnsupportedError extends UnOJError {
  constructor() {
    super('Unsupported operation');
  }
}

/** An error that indicates a platform does not have a certain resource. */
export class NotFoundError extends UnOJError {
  constructor(public thing: string) {
    super(`Cannot find ${thing}`);
  }
}

export class UnexpectedResponseError extends UnOJError {
  constructor(public data: unknown) {
    super('Unexpected response, see the "Compabtibility" section of README.md of @un-oj/core (or un-oj) package.');
  }
}
