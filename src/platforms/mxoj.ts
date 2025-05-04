/**
 * [MXOJ](https://oier.team) platform.
 * @module
 */

import type { Problem as BaseProblem, PlatformOptions, ProblemIOSample } from '../platform';
import { FetchError } from 'ofetch';
import { NotFoundError, Platform, UnexpectedResponseError } from '../platform';
import { UnOJError } from '../utils';

export type ProblemType = 'traditional' | 'interactive' | 'communication' | 'submission' | 'objective';

/**
 * MXOJ-specific problem type.
 *
 * - Samples are extracted from the problem description, but not removed from it
 * - Description is Markdown
 */
export type Problem = BaseProblem<
  string,
  number,
  number,
  string[],
  ProblemType
>;

/** MXOJ platform. */
export default class MXOJ extends Platform {
  static readonly DEFAULT_BASE_URL = 'https://oier.team';

  constructor(options?: PlatformOptions) {
    super(options, MXOJ.DEFAULT_BASE_URL);
  }

  /** Fetches a problem from MXOJ using internal API. */
  override async getProblem(id: string): Promise<Problem> {
    const path = `/api/p/${id}`;
    let pdoc: any;
    try {
      ({ pdoc } = await this.ofetch(path, { responseType: 'json' }));
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 404)
        throw new NotFoundError('problem');
      throw new UnOJError(`Failed to fetch problem ${id}`, { cause: e });
    }

    if (!pdoc)
      throw new UnexpectedResponseError(pdoc);

    const content = JSON.parse(pdoc.content || '{}').zh || '';
    const samples: ProblemIOSample[] = [];
    const r = (i: number, s: string): RegExp => new RegExp(`\`\`\`${s}${i}\\n([\\s\\S]+?)\`\`\``);
    for (let i = 1, match: any; match = r(i, 'input').exec(content); i++) {
      samples.push({
        input: match[1].trim(),
        output: r(i, 'output').exec(content)?.[1].trim() || '',
      });
    }

    return {
      id: pdoc.pid,
      type: pdoc.tag.includes('交互题')
        ? 'interactive'
        : pdoc.tag.includes('提交答案题')
          ? 'submission'
          : pdoc.tag.includes('客观题')
            ? 'objective'
            : 'traditional',
      title: pdoc.title,
      link: new URL(`/problems/${pdoc.pid}`, this.baseURL).toString(),

      description: content,
      samples,
      timeLimit: pdoc.config?.timeMax,
      memoryLimit: pdoc.config?.memoryMax * 1024 * 1024,
      difficulty: pdoc.difficulty,
      tags: pdoc.tag,
    };
  }
}
