import { NotFoundError } from '@un-oj/core';
import Luogu from '@un-oj/core/platforms/luogu';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils';

describe('Luogu platform (problem)', () => {
  const luogu = new Luogu();

  it('should work', async () => {
    assertProblem(await luogu.getProblem('B2001'));
    assertProblem(await luogu.getProblem('P2573'));
  });

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(luogu.getProblem('P114514')).rejects.toThrow(NotFoundError);
  });
});

describe('Luogu platform (contest)', () => {
  const luogu = new Luogu();

  it('should work', async () => {
    expect(await luogu.getContest('48455')).toMatchSnapshot();
  });

  it('should throw NotFoundError w/ non-existent contest', async () => {
    expect(luogu.getContest('1919810')).rejects.toThrow(NotFoundError);
  });
});
