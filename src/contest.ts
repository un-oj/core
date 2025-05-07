/** General contest information. */
export interface Contest<
  Problem = never,
  Format extends string | undefined = string | undefined,
> {
  id: string
  title: string
  description: string
  format: Format
  startTime?: Date
  endTime?: Date
  problems: Problem extends never ? never : Problem[]
}
