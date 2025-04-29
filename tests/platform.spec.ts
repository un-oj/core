import { Platform, UnsupportedError } from '@un-oj/core/platform';
import { describe, expect, it } from 'bun:test';

class TestPlatform extends Platform {
  constructor() {
    super(undefined, 'https://example.com');
  }
}

describe('Platform base class', () => {
  const platform = new TestPlatform();

  it('should throw UnsupportedError for getProblem', async () => {
    expect(platform.getProblem('wtf')).rejects.toThrow(UnsupportedError);
  });
});
