import { NotFoundError } from '@un-oj/core';
import MXOJ from '@un-oj/core/platforms/mxoj';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils';

describe('MXOJ platform', () => {
  const mx = new MXOJ();

  it('should fetch problem', async () => {
    assertProblem(await mx.getProblem('A1'));
  });

  it('should fetch interactive problem', async () => {
    assertProblem(await mx.getProblem('B3'), { type: 'interactive' });
  });

  it('should fetch submission problem', async () => {
    assertProblem(await mx.getProblem('B1'), { type: 'submission' });
  });

  it('should fetch objective problem', async () => {
    assertProblem(await mx.getProblem('B5'), { type: 'objective' });
  });

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(mx.getProblem('P114514')).rejects.toThrow(NotFoundError);
  });
});
