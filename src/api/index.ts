export class TestClass {
  public one: string;
  constructor(parameter: string) {
    this.one = parameter;
  }

  public output() {
    console.log(`Hello there, one is equal to ${this.one} + 5`);
  }
}

const test = new TestClass("Test");
test.output();
