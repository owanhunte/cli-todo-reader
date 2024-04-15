import chalk from "chalk";
import { Command } from "commander";

/**
 * @param {Command} program
 */
export const getOptions = program => {
  let options = program.opts();

  if (typeof options.count === "string" || options.count instanceof String) {
    options.count = parseInt(options.count);
  }

  if (Number.isNaN(options.count)) {
    options.count = parseInt(process.env.DEFAULT_READER_COUNT);

    console.log(
      chalk.magentaBright(
        `Unable to parse 'count' option (-c, --count) as a valid number. Defaulting to ${process.env.DEFAULT_READER_COUNT} as the number of TODOs to consume.`
      )
    );
  }

  return options;
};
