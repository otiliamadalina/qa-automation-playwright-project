import test from "../tests/test";

type TestStep = "Given" | "When" | "Then" | "And";

export default class AnnotateUtils {
  readonly test: typeof test;

  constructor(testInstance: typeof test) {
    this.test = testInstance;
  }

  annotate(step: TestStep, annotation: string): void {
    this.test.info().annotations.push({
      type: `${step} ${annotation}`,
    });
  }
}

const gherkin = new AnnotateUtils(test);

export function Given(annotation: string): void {
  gherkin.annotate("Given", annotation);
}

export function When(annotation: string): void {
  gherkin.annotate("When", annotation);
}

export function Then(annotation: string): void {
  gherkin.annotate("Then", annotation);
}

export function And(annotation: string): void {
  gherkin.annotate("And", annotation);
}
