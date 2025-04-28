import { NotFoundError } from '@un-oj/core';
import Luogu from '@un-oj/core/platforms/luogu';
import { describe, expect, it } from 'bun:test';

describe('Luogu platform', () => {
  const luogu = new Luogu();

  it('should fetch problem B2001', async () => {
    expect(await luogu.getProblem('B2001')).toMatchSnapshot();
  });

  it('should fetch problem P2573', async () => {
    expect(await luogu.getProblem('P2573')).toMatchSnapshot();
  });

  it('should throw NotFoundError for non-existent problem P114514', async () => {
    expect(luogu.getProblem('P114514')).rejects.toThrow(NotFoundError);
  });
});
