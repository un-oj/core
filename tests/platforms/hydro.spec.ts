import { NotFoundError } from '@un-oj/core';
import Hydro from '@un-oj/core/platforms/hydro';
import { describe, expect, it } from 'bun:test';

const TIMEOUT = 10 * 1000;

describe('Hydro platform', () => {
  const hydro = new Hydro();

  it('should fetch problem H1000', async () => {
    expect(await hydro.getProblem('H1000')).toMatchSnapshot();
  }, TIMEOUT);

  it('should fetch interactive problem H1026', async () => {
    const p = await hydro.getProblem('H1026');
    expect(p.type).toBe('interactive');
    expect(p).toMatchSnapshot();
  }, TIMEOUT);

  it('should fetch submission problem H1022', async () => {
    const p = await hydro.getProblem('H1022');
    expect(p.type).toBe('submission');
    expect(p).toMatchSnapshot();
  }, TIMEOUT);

  it('should throw NotFoundError for non-existent problem P114514', async () => {
    expect(hydro.getProblem('P114514')).rejects.toThrow(NotFoundError);
  }, TIMEOUT);

  it('should fetch problem w/ i18n', async () => {
    const hydroEn = new Hydro({ locale: 'en' });
    expect(await hydroEn.getProblem('H1000')).toMatchSnapshot();
  }, TIMEOUT);

  it('should fetch problem w/ domain', async () => {
    expect(await hydro.getProblem('1', 'system_test')).toMatchSnapshot();
  }, TIMEOUT);

  it('should throw NotFoundError for non-existent domain', async () => {
    expect(hydro.getProblem('1', '_')).rejects.toThrow(NotFoundError);
  }, TIMEOUT);
});
