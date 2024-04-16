import axios from "axios";
import { Command } from "commander";
import { jest } from "@jest/globals";
import { consumeTODOs, getOptions } from "../src/helper";
import { DEFAULT_FETCH_COUNT } from "../src/constants";
import evenNumberedTodos from "./data/todos-even.json";
import oddNumberedTodos from "./data/todos-odd.json";

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("getOptions tests", () => {
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

describe("consumeTODOs tests", () => {
  test("only fetches options.count number of TODOs", async () => {
    const options = {
      count: 3,
      selection: "odd"
    };

    const spy = jest
      .spyOn(axios, "get")
      .mockImplementationOnce(() => Promise.resolve({ data: oddNumberedTodos[0] }))
      .mockImplementationOnce(() => Promise.resolve({ data: oddNumberedTodos[1] }))
      .mockImplementationOnce(() => Promise.resolve({ data: oddNumberedTodos[2] }));

    const data = await consumeTODOs(options);

    expect(spy).toHaveBeenCalledTimes(options.count);
    expect(data).toHaveLength(options.count);
  });

  test("returns correct title and completed status (yes or no) for each TODO fetched", async () => {
    const options = {
      count: 3,
      selection: "even"
    };

    const spy = jest
      .spyOn(axios, "get")
      .mockImplementationOnce(() => Promise.resolve({ data: evenNumberedTodos[0] }))
      .mockImplementationOnce(() => Promise.resolve({ data: evenNumberedTodos[1] }))
      .mockImplementationOnce(() => Promise.resolve({ data: evenNumberedTodos[2] }));

    const data = await consumeTODOs(options);

    expect(data).toHaveLength(options.count);

    data.forEach((element, index) => {
      expect(element).toHaveProperty("title", evenNumberedTodos[index].title);
      expect(element).toHaveProperty("completed", evenNumberedTodos[index].completed ? "yes" : "no");
    });
  });
});
