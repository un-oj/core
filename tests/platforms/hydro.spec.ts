import { NotFoundError } from '@un-oj/core';
import Hydro from '@un-oj/core/platforms/hydro';
import { describe, expect, it } from 'bun:test';
import { assertProblem } from './utils.ts';

const TIMEOUT = 10 * 1000;

describe('Hydro platform', () => {
  const hydro = new Hydro();

  it('should fetch problem', async () => {
    assertProblem(await hydro.getProblem('H1000'));
  }, TIMEOUT);

  it('should fetch interactive problem', async () => {
    assertProblem(await hydro.getProblem('H1026'), { type: 'interactive' });
  }, TIMEOUT);

  it('should fetch submission problem', async () => {
    assertProblem(await hydro.getProblem('H1022'), { type: 'submission' });
  }, TIMEOUT);

  it('should throw NotFoundError w/ non-existent problem', async () => {
    expect(hydro.getProblem('P114514')).rejects.toThrow(NotFoundError);
  }, TIMEOUT);

  it('should fetch problem w/ i18n', async () => {
    const hydroEn = new Hydro({ locale: 'en' });
    assertProblem(await hydroEn.getProblem('H1000'));
  }, TIMEOUT);

  it('should fetch problem w/ domain', async () => {
    assertProblem(await hydro.getProblem('1', 'system_test'));
  }, TIMEOUT);

  it('should throw NotFoundError w/ non-existent domain', async () => {
    expect(hydro.getProblem('1', '_')).rejects.toThrow(NotFoundError);
  }, TIMEOUT);
});
