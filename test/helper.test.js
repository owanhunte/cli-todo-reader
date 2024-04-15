import { Command } from "commander";
import { jest } from "@jest/globals";
import { getOptions } from "../src/helper";

describe("helper getOptions tests", () => {
  /** @type {Command} */
  let program;

  beforeAll(() => {
    program = new Command();
  });

  test("returns all parsed options", () => {
    const parsedOptions = {
      count: 20,
      selection: "even"
    };

    const spy = jest.spyOn(program, "opts").mockImplementationOnce(() => {
      return parsedOptions;
    });

    const options = getOptions(program);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(options).toMatchObject(parsedOptions);
  });

  test("converts options.count to number if parsed option is a string", () => {
    const spy = jest.spyOn(program, "opts").mockImplementationOnce(() => {
      return {
        count: "10",
        selection: "even"
      };
    });

    const options = getOptions(program);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(options.count).toStrictEqual(10);
  });
});
