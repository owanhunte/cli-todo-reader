import { Command } from "commander";

/**
 * @param {Command} program
 */
export const getOptions = program => {
  let options = program.opts();

  if (typeof options.count === "string" || options.count instanceof String) {
    options.count = parseInt(options.count);
  }

  return options;
};
