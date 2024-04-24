import chalk from "chalk";
import getProcessForPort from "react-dev-utils/getProcessForPort";

export function detectPort(port: number) {
  const existingProcess = getProcessForPort(port);
  if (existingProcess === null) {
    console.log(`Port ${port} is not in use.`);
    return;
  }

  console.log(
    chalk.yellow(
      `Something is already running on port ${port}.` +
        `${existingProcess ? ` Probably:\n  ${existingProcess}` : ""}`
    )
  );
}
