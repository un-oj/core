import { NotFoundError } from '@un-oj/core';
import LeetCode from '@un-oj/core/platforms/leetcode';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils.ts';

describe('LeetCode platform', () => {
  const lc = new LeetCode();
  const lcCN = new LeetCode({ baseURL: 'https://leetcode.cn' });

  it('should fetch problem', async () => {
    assertProblem(await lc.getProblem('two-sum'));
  });

  it('should fetch problem w/ LeetCode CN', async () => {
    assertProblem(await lcCN.getProblem('two-sum'));
  });

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(lc.getProblem('this-problem-does-not-exist')).rejects.toThrow(NotFoundError);
  });
});
