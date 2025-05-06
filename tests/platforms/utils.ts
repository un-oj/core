import type { Problem } from '@un-oj/core';
import { expect } from 'bun:test';

export function assertProblem(problem: Problem, expected?: Partial<{
  type: string
}>): void {
  if (expected?.type)
    expect(problem.type).toBe(expected.type);
  expect(problem).toMatchSnapshot();
}
