import { describe, expect, it } from 'bun:test';
import { Platform, UnsupportedError } from '../src/platform';

class TestPlatform extends Platform {
  constructor() {
    super(undefined, 'http://example.com');
  }
}

describe('Platform Base Class', () => {
  const platform = new TestPlatform();

  it('should throw UnsupportedError for getProblem', async () => {
    expect(platform.getProblem('wtf')).rejects.toThrow(UnsupportedError);
  });
});
