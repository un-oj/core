/** A sample input/output pair for a {@link Problem}. */
export interface ProblemIOSample {
  input: string
  output: string
  hint?: string
}

/** Well-classified {@link Problem} information. */
export interface ProblemDescriptionObject {
  background: string
  details: string
  input: string
  output: string
  hint: string
}

/** General problem information. */
export interface Problem<
  Desc extends string | ProblemDescriptionObject = string | ProblemDescriptionObject,
  Limits extends number | number[] | undefined = number | number[] | undefined,
  Difficulty extends string | number | undefined = string | number | undefined,
  Tags extends string[] | number[] | undefined = string[] | number[] | undefined,
  Type extends string = string,
> {
  id: string
  type: Type
  title: string
  /** The problem description without the samples (unless otherwise specified). */
  description: Desc
  link: string
  samples: ProblemIOSample[]
  /** The time limit in milliseconds. */
  timeLimit: Limits
  /** The memory limit in bytes. */
  memoryLimit: Limits
  tags: Tags
  difficulty: Difficulty
}
