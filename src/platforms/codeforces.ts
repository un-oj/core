/**
 * [Codeforces](https://codeforces.com) platform.
 * @module
 */

import type { PlatformOptions } from '../platform.ts';
import type { Problem as BaseProblem, ProblemIOSample } from '../problem.ts';
import { load } from 'cheerio';
import { NotFoundError, Platform } from '../platform.ts';
import { parseMemory, parseTime } from '../utils.ts';

export type ProblemType = 'traditional' | 'interactive' | 'communication' | 'submission';

/**
 * Codeforces-specific problem type.
 *
 * Description is HTML.
 */
export type Problem = BaseProblem<
  string,
  number | undefined,
  number | undefined,
  string[],
  ProblemType
>;

export const DEFAULT_BASE_URL = 'https://codeforces.com';

/** Codeforces platform. */
export default class Codeforces extends Platform {
  constructor(options?: PlatformOptions) {
    super(options, DEFAULT_BASE_URL);
  }

  /**
   * Fetches a problem from Codeforces, extracting information from HTML.
   *
   * Automatically switches to gym mode if {@link id} > `100000`.
   */
  override async getProblem(id: string): Promise<Problem> {
    const contest = Number.parseInt(id);
    const num = id.replace(String(contest), '');
    const path = contest > 100000
      ? `/gym/${contest}/problem/${num}`
      : `/problemset/problem/${contest}/${num}`;

    const $ = load(await this.ofetch(path, { responseType: 'text' }));
    const body = $('.problem-statement'), sidebar = $('#sidebar');

    const description = body
      .find('.header ~ *')
      .not('.sample-test')
      .html();
    if (!description)
      throw new NotFoundError('problem');

    const examples: ProblemIOSample[] = [];
    for (const el of body.find('.sample-test').children()) {
      const raw = $(el.lastChild!).html() ?? '';
      if (el.attribs.class === 'output')
        examples.at(-1)!.output = raw.replaceAll('<br>', '\n');
      else
        examples.push({ input: raw.replaceAll('<br>', '\n'), output: '' });
    }

    return {
      id,
      type: description.includes('This is an interactive problem.')
        ? 'interactive'
        : 'traditional',
      title: body.find('.header .title').text().replace(`${num}. `, ''),
      link: new URL(path, this.baseURL).href,
      description,

      samples: examples,
      timeLimit: parseTime(body.find('.time-limit').contents().last().text()),
      memoryLimit: parseMemory(body.find('.memory-limit').contents().last().text()),

      difficulty: Number(sidebar.find('.tag-box[title="Difficulty"]').text().trim().slice(1)) || undefined,
      tags: sidebar.find('.tag-box').not('[title="Difficulty"]').contents().map(
        (_, el) => $(el).text().trim(),
      ).get(),
    };
  }
}
