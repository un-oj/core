import { NotFoundError } from '@un-oj/core';
import Lyrio from '@un-oj/core/platforms/lyrio';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils.ts';

describe('Lyrio platform (problem)', () => {
  const loj = new Lyrio();

  it('should work', async () => {
    assertProblem(await loj.getProblem('1'));
    assertProblem(await loj.getProblem('2'));
  });

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(loj.getProblem('999999')).rejects.toThrow(NotFoundError);
  });
});
