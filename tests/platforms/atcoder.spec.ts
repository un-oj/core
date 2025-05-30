import { NotFoundError } from '@un-oj/core';
import AtCoder from '@un-oj/core/platforms/atcoder';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils.ts';

describe('AtCoder platform', () => {
  const at = new AtCoder();

  it('should fetch problem', async () => {
    assertProblem(await at.getProblem('abc403_a'));
  });

  it('should fetch problem w/ i18n', async () => {
    const at = new AtCoder({ locale: 'ja' });
    assertProblem(await at.getProblem('abc403_a'));
  });

  it('shoud fetch interactive problem', async () => {
    const at = new AtCoder();
    assertProblem(await at.getProblem('arc070_d'), { type: 'interactive' });
  });

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(at.getProblem('abc114514_z')).rejects.toThrow(NotFoundError);
  });

  it('should throw NotFoundError w/ invalid problem ID format', async () => {
    expect(at.getProblem('invalid-id')).rejects.toThrow(NotFoundError);
  });
});
