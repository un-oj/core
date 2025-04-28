import { NotFoundError } from '@un-oj/core';
import Codeforces from '@un-oj/core/platforms/codeforces';
import { UnOJError } from '@un-oj/core/utils';
import { describe, expect, it } from 'bun:test';

describe('Codeforces platform', () => {
  const cf = new Codeforces();

  it('should fetch problem 1A', async () => {
    expect(await cf.getProblem('1A')).toMatchSnapshot();
  });

  it('should fetch problem 2050E', async () => {
    expect(await cf.getProblem('2050E')).toMatchSnapshot();
  });

  it('should fetch gym problem 105863A', async () => {
    expect(await cf.getProblem('105863A')).toMatchSnapshot();
  });

  it.todo('should throw for not-ready problem 105851A', async () => {
    expect(cf.getProblem('105851A')).rejects.toThrow(new UnOJError('Statement not ready'));
  });

  it('should throw NotFoundError for non-existent problem 114514A', async () => {
    expect(cf.getProblem('114514A')).rejects.toThrow(NotFoundError);
  });
});
