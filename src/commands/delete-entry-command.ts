import { Command } from "@/core/command";
import { Context } from "@/core/context";

import inquirer from "inquirer";

export class DeleteEntryCommand implements Command {
  constructor(private context: Context) {}

  async exucute() {
    const data = this.context.storage.load();
    if (data.length === 0) {
      console.log("No entries found to delete.");
      return;
    }

    const {index} = await inquirer.prompt([
      {
        type: "list",
        name: "index",
        message: "Select the entry to delete:",
        choices: data.map((entry, index) => ({
          name: `${entry.surah} (${entry.fromAyah}-${entry.toAyah}) - ${entry.date}`,
          value: index,
        })),
      },
    ]);
    data.splice(index, 1);
    this.context.storage.save(data);
    console.log("Entry deleted successfully!");
  }
}
