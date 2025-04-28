import type { Problem as BaseProblem, PlatformOptions, ProblemDescriptionObject } from '../platform';
import { FetchError } from 'ofetch';
import { NotFoundError, Platform } from '../platform';
import { addHeaders, UnOJError } from '../utils';

export type Difficulty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const DifficultyLabel: Record<Difficulty, string> = {
  0: '暂无评定',
  1: '入门',
  2: '普及-',
  3: '普及/提高-',
  4: '普及+/提高',
  5: '提高+/省选-',
  6: '省选/提高-',
  7: 'NOI/NOI+/CTSC',
};

export type Problem = BaseProblem<ProblemDescriptionObject, number[], Difficulty>;

/** [Luogu](https://www.luogu.com.cn) platform. */
export default class Luogu extends Platform {
  static readonly DEFAULT_BASE_URL = 'https://www.luogu.com.cn';

  constructor(options?: PlatformOptions) {
    super({
      ...options,
      ofetchDefaults: {
        ...options?.ofetchDefaults,
        headers: addHeaders(
          options?.ofetchDefaults?.headers,
          [['x-lentille-request', 'content-only']],
        ),
      },
    }, Luogu.DEFAULT_BASE_URL);
  }

  override async getProblem(id: string): Promise<Problem> {
    const path = `/problem/${id}`;
    let data: any;
    try {
      data = await this.ofetch(path, { responseType: 'json' });
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 404)
        throw new NotFoundError('problem');
      throw new UnOJError(`Failed to fetch problem ${id}`, { cause: e });
    }

    const content: {
      name: string
      background: string
      description: string
      formatI: string
      formatO: string
      hint: string
      locale: string
    } = this.locale
      ? (data.translations[this.locale] || data.problem.content)
      : data.problem.content;
    const tags: number[] = data.problem.tags;

    return {
      id,
      type: tags.includes(103)
        ? 'interactive'
        : tags.includes(104)
          ? 'submission'
          : tags.includes(351)
            ? 'communication'
            : 'traditional',
      title: content.name,
      link: new URL(path, this.baseURL).toString(),

      description: {
        background: content.background,
        details: content.description,
        input: content.formatI,
        output: content.formatO,
        hint: content.hint,
      },

      samples: (data.problem.samples as Array<[string, string]>).map(([a, b]) => ({
        input: a,
        output: b,
      })),

      timeLimit: data.problem.limits.time,
      memoryLimit: (data.problem.limits.memory as number[]).map(v => v * 1024),
      difficulty: data.problem.difficulty as Difficulty,
      tags: tags.map(String),
    };
  }
}
