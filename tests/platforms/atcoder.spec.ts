import { NotFoundError } from '@un-oj/core';
import AtCoder from '@un-oj/core/platforms/atcoder';
import { describe, expect, it } from 'bun:test';

describe('AtCoder platform', () => {
  const at = new AtCoder();

  it('should fetch problem abc403_a', async () => {
    expect(await at.getProblem('abc403_a')).toMatchSnapshot();
  });

  it('should fetch problem abc403_a with ja locale', async () => {
    const at = new AtCoder({ locale: 'ja' });
    expect(await at.getProblem('abc403_a')).toMatchSnapshot();
  });

  it('shoud fetch interactive problem arc070_d', async () => {
    const at = new AtCoder();
    const p = await at.getProblem('arc070_d');
    expect(p.type).toBe('interactive');
    expect(p).toMatchSnapshot();
  });

  it('should throw NotFoundError for non-existent problem abc114514_z', async () => {
    expect(at.getProblem('abc114514_z')).rejects.toThrow(NotFoundError);
  });

  it('should throw NotFoundError for invalid problem ID format', async () => {
    expect(at.getProblem('invalid-id')).rejects.toThrow(NotFoundError);
  });
});
