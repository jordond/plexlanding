import { TestClass } from "./";

let testClass: TestClass;
let consoleSpy: jasmine.Spy;

beforeEach(() => {
  testClass = new TestClass("Test");
  consoleSpy = spyOn(console, "log");
});

test("Should create a TestClass instance", () => {
  expect(testClass).toBeInstanceOf(TestClass);
});

test("Should have public 'output' method that calls console.log", () => {
  expect(testClass.output).toBeDefined();
  expect(testClass.output).toBeInstanceOf(Function);
});

test("output should call console.log", () => {
  testClass.output();
  expect(consoleSpy).toHaveBeenCalled();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Hello there, one is equal to Test + 5"
  );
});
