import { Command } from "@/core/command";
import { Context } from "@/core/context";

export class ShowEntriesCommand implements Command {
  constructor(private context: Context) {}

  async exucute() {
    const data = this.context.storage.load();
    if (data.length === 0) {
      console.log("No entries found.");
      return;
    }
    console.log("Memorization Progress Entries:");
    data.forEach((entry, index) => {
      console.log(
        `${index + 1}.  ${entry.surah},  ${entry.fromAyah}, ${entry.toAyah})- ${
          entry.date
        }`
      );
    });
  }
}
