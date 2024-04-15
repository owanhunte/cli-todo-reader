import { Command } from "commander";
import { jest } from "@jest/globals";
import { getOptions } from "../src/helper";
import { DEFAULT_FETCH_COUNT } from "../src/constants";

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
        count: "10"
      };
    });

    const options = getOptions(program);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(options.count).toStrictEqual(10);
  });

  test(`sets options.count to default number ${DEFAULT_FETCH_COUNT} if option cannot be parsed correctly`, () => {
    const spy = jest.spyOn(program, "opts").mockImplementationOnce(() => {
      return {
        count: "tea"
      };
    });

    const options = getOptions(program);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(options.count).toStrictEqual(DEFAULT_FETCH_COUNT);
  });

  test(`sets options.count to default number ${DEFAULT_FETCH_COUNT} if option has a value less than 1`, () => {
    const spy = jest.spyOn(program, "opts").mockImplementationOnce(() => {
      return {
        count: -5
      };
    });

    const options = getOptions(program);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(options.count).toStrictEqual(DEFAULT_FETCH_COUNT);
  });
});
