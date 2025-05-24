/**
 * Lyrio platform, which is used by [LibreOJ](https://loj.ac) under the hood.
 * @module
 */

import type { PlatformOptions } from '../platform';
import type { Problem as BaseProblem } from '../problem';
import { NotFoundError, Platform, UnexpectedResponseError } from '../platform';
import { UnOJError } from '../utils';

export type ProblemType = 'Traditional' | 'SubmitAnswer' | 'Interaction';

/**
 * Lyrio-specific problem type.
 *
 * Description is JSON-encoded Markdown.
 *
 * @example
 * ```ts
 * ({
 *   description: `[{"sectionTitle":"题目描述","type":"Text","text":"输入 $ a $ 和 $ b $，输出 $ a + b $ 的结果。"},{"sectionTitle":"输入格式","type":"Text","text":"一行两个正整数 $ a $ 和 $ b $。"},{"sectionTitle":"输出格式","type":"Text","text":"一行一个正整数 $ a + b $。"},{"sectionTitle":"样例","type":"Sample","sampleId":0,"text":"根据数学知识有 $ 1 + 2 = 3 $。"},{"sectionTitle":"数据范围","type":"Text","text":"对于 $ 100\\% $ 的数据，$ 1 \\leq a, b \\leq 10 ^ 6 $。"}]`,
 *   difficulty: undefined,
 *   id: '1',
 *   link: 'https://loj.ac/p/1',
 *   memoryLimit: 536870912,
 *   samples: [{
 *     input: '1 2',
 *     output: '3',
 *   }],
 *   tags: [{
 *     color: 'black',
 *     id: 1,
 *     name: '系统测试',
 *     nameLocale: 'zh_CN',
 *   }],
 *   timeLimit: 2000,
 *   title: 'A + B 问题',
 *   type: 'Traditional',
 * })
 * ```
 */
export type Problem = BaseProblem<
  string,
  number,
  undefined,
  Array<{ id: number, name: string, color: string }>,
  ProblemType
>;

export const DEFAULT_BASE_URL = 'https://api.loj.ac';

/**
 * Lyrio platform.
 *
 * I18n is supported.
 */
export default class Lyrio extends Platform<string> {
  constructor(options?: PlatformOptions<string>) {
    super(options, DEFAULT_BASE_URL);
  }

  /** Fetches a problem from LibreOJ using API. */
  override async getProblem(id: string): Promise<Problem> {
    const displayId = Number.parseInt(id);
    if (Number.isNaN(displayId))
      throw new NotFoundError('problem');

    let data: any;
    try {
      data = await this.ofetch('/api/problem/getProblem', {
        method: 'POST',
        body: {
          displayId,
          localizedContentsOfLocale: this.locale || 'zh_CN',
          tagsOfLocale: this.locale || 'zh_CN',
          samples: true,
          judgeInfo: true,
          judgeInfoToBePreprocessed: true,
          statistics: false,
          discussionCount: false,
          permissionOfCurrentUser: false,
          lastSubmissionAndLastAcceptedSubmission: false,
        },
        responseType: 'json',
      });
    } catch (e) {
      throw new UnOJError(`Failed to fetch problem ${id}`, { cause: e });
    }

    if (data.error === 'NO_SUCH_PROBLEM')
      throw new NotFoundError('problem');
    if (!data.meta || !data.localizedContentsOfLocale)
      throw new UnexpectedResponseError(data);

    return {
      id,
      type: data.meta.type,
      title: data.localizedContentsOfLocale.title,
      link: `https://loj.ac/p/${displayId}`,
      description: JSON.stringify(data.localizedContentsOfLocale.contentSections),

      samples: data.samples.map((sample: any) => ({
        input: sample.inputData,
        output: sample.outputData,
      })),
      timeLimit: data.judgeInfo.timeLimit,
      memoryLimit: data.judgeInfo.memoryLimit * 1024 * 1024,
      tags: data.tagsOfLocale || [],
      difficulty: undefined,
    };
  }
}
