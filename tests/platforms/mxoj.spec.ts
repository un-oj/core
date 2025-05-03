import { NotFoundError } from '@un-oj/core';
import MXOJ from '@un-oj/core/platforms/mxoj';
import { describe, expect, it } from 'bun:test';

describe('MXOJ platform', () => {
  const mx = new MXOJ();

  it('should fetch problem A1', async () => {
    expect(await mx.getProblem('A1')).toMatchSnapshot();
  });

  it('should fetch submission problem B1', async () => {
    const p = await mx.getProblem('B1');
    expect(p.type).toBe('submission');
    expect(p).toMatchSnapshot();
  });

  it('should fetch interactive problem B3', async () => {
    const p = await mx.getProblem('B3');
    expect(p.type).toBe('interactive');
    expect(p).toMatchSnapshot();
  });

  it('should fetch objective problem B5', async () => {
    const p = await mx.getProblem('B5');
    expect(p.type).toBe('objective');
    expect(p).toMatchSnapshot();
  });

  it('should throw NotFoundError for non-existent problem P114514', async () => {
    expect(mx.getProblem('P114514')).rejects.toThrow(NotFoundError);
  });
});
