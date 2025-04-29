import type { Problem as BaseProblem, PlatformOptions, ProblemIOSample } from '../platform';
import * as cheerio from 'cheerio';
import { FetchError } from 'ofetch';
import { NotFoundError, Platform } from '../platform';
import { parseMemory, parseTime, UnOJError } from '../utils';

export type Locale = 'en' | 'ja';

/**
 * AtCoder-specific problem type.
 *
 * For interactive problems, {@link Problem.samples} is empty. The samples are
 * included in {@link Problem.description}.
 */
export type Problem = BaseProblem<string, number, undefined, undefined>;

/**
 * [AtCoder](https://atcoder.jp) platform.
 *
 * I18n is supported.
 */
export default class AtCoder extends Platform<Locale> {
  static readonly DEFAULT_BASE_URL = 'https://atcoder.jp';

  constructor(options?: PlatformOptions<Locale>) {
    super(options, AtCoder.DEFAULT_BASE_URL, 'en');
  }

  /**
   * Fetches a problem from AtCoder, extracting information from HTML.
   */
  override async getProblem(id: string): Promise<Problem> {
    const contest = id.split('_')[0];
    const path = `/contests/${contest}/tasks/${id}`;
    const url = new URL(path, this.baseURL).toString();

    let $: cheerio.CheerioAPI;
    try {
      $ = cheerio.load(await this.ofetch(path, { responseType: 'text' }));
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 404)
        throw new NotFoundError('problem');
      throw new UnOJError(`Failed to fetch problem ${id}`, { cause: e });
    }

    const statement = $('#task-statement');
    if (!statement.length)
      throw new NotFoundError('problem');

    const title = $('.h2')
      .first()
      .text()
      .trimStart()
      .split('\n')[0]
      .split(' - ')[1];
    const descContainer = statement.find(`span.lang-${this.locale}`);
    const hr = descContainer.find('hr').first();
    if (hr.length) {
      hr.nextAll().remove();
      hr.remove();
    }

    const description = descContainer.html()?.trim();
    if (!description)
      throw new NotFoundError('statement');

    const limitsText = statement.prev('p').text();
    // "Time Limit: 2 sec / Memory Limit: 1024 MB"
    const tlMatch = limitsText.match(/Time Limit: (\w+ \w+)/);
    const mlMatch = limitsText.match(/Memory Limit: (\w+ \w+)/);

    const type = description.includes('This is an interactive task.')
      || description.includes('これはインタラクティブな問題です')
      ? 'interactive'
      : 'traditional';
    const samples: ProblemIOSample[] = [];

    if (type === 'traditional') {
      statement.find(`span.lang-${this.locale} .part`).each((_, part) => {
        const h3 = $(part).find('h3').text();
        if (h3.startsWith('Sample Input')) {
          samples.push({ input: $(part).find('pre').text(), output: '' });
        } else if (h3.startsWith('Sample Output')) {
          if (samples.length)
            samples.at(-1)!.output = $(part).find('pre').text();
        }
      });
    }

    return {
      id,
      type,
      title,
      link: url,

      description,
      samples,
      timeLimit: parseTime(tlMatch![1])!,
      memoryLimit: parseMemory(mlMatch![1])!,

      difficulty: undefined,
      tags: undefined,
    };
  }
}
