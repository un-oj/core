import { NotFoundError } from '@un-oj/core';
import Luogu from '@un-oj/core/platforms/luogu';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils';

describe('Luogu platform', () => {
  const luogu = new Luogu();

  it('should fetch problem', async () => {
    assertProblem(await luogu.getProblem('B2001'));
  });

  it('should fetch problem', async () => {
    assertProblem(await luogu.getProblem('P2573'));
  });

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(luogu.getProblem('P114514')).rejects.toThrow(NotFoundError);
  });
});
