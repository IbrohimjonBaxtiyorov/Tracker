import { Command } from "@/core/command";
import { Context } from "@/core/context";
import { MemorizationProgress } from "@/types/types";
import inquirer from "inquirer";
export class AddentryCommand implements Command {
  constructor(private context: Context) {}
  async exucute() {
    const questions = await inquirer.prompt([
      { type: "input", name: "surah", message: "Enter Surah Name" },
      { type: "input", name: "fromAyah", message: "From which Ayah?" },
      { type: "input", name: "toAyah", message: " To which Ayah?" },
    ]);

    const newEntry: MemorizationProgress = {
      surah: questions.surah,
      fromAyah: parseInt(questions.fromAyah),
      toAyah: +questions.toAyah,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      }),
    };

    const data = this.context.storage.load();
    data.push(newEntry);
    this.context.storage.save(data);
    console.log("Date added successfully!");
  }
}
