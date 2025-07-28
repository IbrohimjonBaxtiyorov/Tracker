import { Command } from "@/core/command";
import { Context } from "@/core/context";
import inquirer from "inquirer";

export class EditEntryCommand implements Command {
  constructor(private context: Context) {}

  async exucute(): Promise<void> {
    const entries = this.context.storage.load(); 

    if (entries.length === 0) {
      console.log("No entries found to edit.");
      return;
    }

    const response = await inquirer.prompt([
      {
        type: "list",
        name: "index",
        message: "Select the entry to edit:",
        choices: entries.map((entry, idx) => ({
          name: `${entry.surah} (${entry.fromAyah}-${entry.toAyah}) - ${entry.date}`,
          value: idx,
        })),
      },
    ]);

    const index = response.index;
    const entry = entries[index];

    const updated = await inquirer.prompt([
      {
        type: "input",
        name: "surah",
        message: "Enter Surah Name",
        default: entry.surah,
      },
      {
        type: "input",
        name: "fromAyah",
        message: `From Ayah (${entry.fromAyah}):`,
        default: entry.fromAyah.toString(),
      },
      {
        type: "input",
        name: "toAyah",
        message: `To Ayah (${entry.toAyah}):`,
        default: entry.toAyah.toString(),
      },
    ]);

    entries[index] = {
      ...entry,
      surah: updated.surah,
      fromAyah: parseInt(updated.fromAyah),
      toAyah: parseInt(updated.toAyah),
    };

    this.context.storage.save(entries);

    console.log("Entry updated successfully!");
  }
}
