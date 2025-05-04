/**
 * [LeetCode](https://leetcode.com) platform.
 * @module
 */

import type { Problem as BaseProblem, PlatformOptions, ProblemIOSample } from '../platform';
import { load } from 'cheerio';
import { FetchError } from 'ofetch';
import { NotFoundError, Platform, UnexpectedResponseError } from '../platform';
import { UnOJError } from '../utils';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

/**
 * LeetCode-specific problem type.
 *
 * Description is HTML.
 */
export type Problem = BaseProblem<
  string,
  undefined,
  Difficulty,
  string[]
>;

const QUESTION_QUERY = /* GraphQL */ `
query ($slug: String!) {
  question(titleSlug: $slug) {
    title
    content
    translatedTitle
    translatedContent
    difficulty
    exampleTestcases
    topicTags {
      slug
    }
    sampleTestCase
  }
}`;

/**
 * LeetCode platform.
 *
 * If you want to use LeetCode CN, set `baseURL` to `https://leetcode.cn`.
 */
export default class LeetCode extends Platform {
  static readonly DEFAULT_BASE_URL = 'https://leetcode.com';

  constructor(options?: PlatformOptions) {
    const baseURL = options?.baseURL ?? LeetCode.DEFAULT_BASE_URL;
    super(options, baseURL);
  }

  /** Fetches a problem from LeetCode using GraphQL API. */
  override async getProblem(slug: string): Promise<Problem> {
    let data: any;
    try {
      const res = await this.ofetch('/graphql', {
        method: 'POST',
        body: {
          query: QUESTION_QUERY,
          variables: { slug },
        },
        responseType: 'json',
      });
      data = res.data?.question;
    } catch (e) {
      if (e instanceof FetchError && e.data?.errors) {
        const errorMsg = e.data.errors[0]?.message;
        if (errorMsg?.includes('Not found'))
          throw new NotFoundError('problem');
      }
      throw new UnOJError(`Failed to fetch problem ${slug}`, { cause: e });
    }

    if (!data)
      throw new NotFoundError('problem');

    const content = data.translatedContent || data.content;
    const title = data.translatedTitle || data.title;
    const samples: ProblemIOSample[] = [];

    const $ = load(content);
    $('strong.example').each((_, el) => {
      const contents = $(el).parent().next().contents();
      if (contents.length < 4)
        throw new UnexpectedResponseError();
      const sample: ProblemIOSample = {
        input: contents.eq(1).text().trim(),
        output: contents.eq(3).text()!.trim(),
      };
      if (contents.length > 4)
        sample.hint = contents.eq(5).text().trim();
      samples.push(sample);
    });

    return {
      id: slug,
      type: 'traditional',
      title,
      link: new URL(`/problems/${slug}/`, this.baseURL).toString(),
      description: content,
      samples,

      timeLimit: undefined,
      memoryLimit: undefined,
      difficulty: data.difficulty,
      tags: data.topicTags.map((t: { slug: string }) => t.slug),
    };
  }
}
