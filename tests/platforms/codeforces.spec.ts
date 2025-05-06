import { NotFoundError } from '@un-oj/core';
import Codeforces from '@un-oj/core/platforms/codeforces';
import { UnOJError } from '@un-oj/core/utils';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils';

const TIMEOUT = 10 * 1000;

describe('Codeforces platform', () => {
  const cf = new Codeforces();

  it('should fetch old problem', async () => {
    assertProblem(await cf.getProblem('1A'));
  }, TIMEOUT);

  it('should fetch new problem', async () => {
    assertProblem(await cf.getProblem('2050E'));
  }, TIMEOUT);

  it('should fetch interactive problem', async () => {
    assertProblem(await cf.getProblem('1486C2'), { type: 'interactive' });
  }, TIMEOUT);

  it('should fetch gym problem', async () => {
    assertProblem(await cf.getProblem('105863A'));
  }, TIMEOUT);

  it.todo('should throw w/ not-ready problem', async () => {
    expect(cf.getProblem('105851A')).rejects.toThrow(new UnOJError('Statement not ready'));
  }, TIMEOUT);

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(cf.getProblem('114514A')).rejects.toThrow(NotFoundError);
  }, TIMEOUT);
});
