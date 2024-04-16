import axios from "axios";
import chalk from "chalk";
import { Command } from "commander";
import { DEFAULT_FETCH_COUNT, TODOS_BASE_URL } from "./constants.js";

/**
 * @param {Command} program
 */
export const getOptions = program => {
  let options = program.opts();

  if (typeof options.count === "string" || options.count instanceof String) {
    options.count = parseInt(options.count);
  }

  if (Number.isNaN(options.count)) {
    options.count = parseInt(DEFAULT_FETCH_COUNT);

    console.log(
      chalk.magentaBright(
        `Unable to parse 'count' option (-c, --count) as a valid number. Defaulting to ${DEFAULT_FETCH_COUNT} as the number of TODOs to consume.`
      )
    );
  }

  if (options.count < 1) {
    console.log(
      chalk.magentaBright(
        `Invalid number passed as the 'count' (-c, --count) option. Must be >= 1. Defaulting to ${DEFAULT_FETCH_COUNT} as the number of TODOs to consume.`
      )
    );
    options.count = DEFAULT_FETCH_COUNT;
  }

  return options;
};

/**
 * @param {import('commander').OptionValues} options
 */
export const consumeTODOs = async options => {
  let CONCURRENCY_LIMIT = 5;
  let counter = 1;
  let currentId = options.selection === "even" ? 2 : 1;
  let promises = [];
  let data = [];
  let response;

  while (counter <= options.count) {
    promises = [];

    await wait(250);

    for (let i = 0; i < CONCURRENCY_LIMIT && counter <= options.count; i++) {
      promises.push(
        axios.get(`${TODOS_BASE_URL}/${currentId}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
      );

      currentId += 2;
      ++counter;
    }

    response = await Promise.all(promises);
    response.forEach(res => {
      data.push({
        "TODO # (id)": res.data.id,
        title: res.data.title,
        completed: res.data.completed ? "yes" : "no"
      });
    });
  }

  return data;
};

/**
 * @param {number} delay
 */
function wait(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}
