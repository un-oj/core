import { NotFoundError } from '@un-oj/core';
import LeetCode from '@un-oj/core/platforms/leetcode';
import { describe, expect, it } from 'bun:test';

describe('LeetCode platform', () => {
  const lc = new LeetCode();
  const lcCN = new LeetCode({ baseURL: 'https://leetcode.cn' });

  it('should fetch problem "two-sum"', async () => {
    expect(await lc.getProblem('two-sum')).toMatchSnapshot();
  });

  it('should fetch problem "two-sum" from LeetCode CN', async () => {
    expect(await lcCN.getProblem('two-sum')).toMatchSnapshot();
  });

  it('should throw NotFoundError for non-existent problem "this-problem-does-not-exist"', async () => {
    expect(lc.getProblem('this-problem-does-not-exist')).rejects.toThrow(NotFoundError);
  });
});
