import inquirer from "inquirer";
import { CommandExecutor } from "./core/command-execuitor";
import { StorageSingleton } from "./storage/storage.singleton";
import { Context } from "./core/context";
import { AddentryCommand } from "./commands/add-entry-common";
import { ShowEntriesCommand } from "./commands/show-entries-command";
import { ExitCommand } from "./commands/exit-command";
import { DeleteEntryCommand } from "./commands/delete-entry-command";
import { EditEntryCommand } from "./commands/edit-entry-command";
import { StatsCommand } from "./commands/stats.command";

const context = new Context(StorageSingleton.getInstance());
const executor = new CommandExecutor();

async function bootstrap() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "➕ New memorization record",
        "📜 Show all records",
        "🗑️ Delete",
        "🔄 Edition",
        "📈 statistics",
        "❌ Exit",
      ],
    },
  ]);

  switch (action) {
    case "➕ New memorization record":
      await executor.run(new AddentryCommand(context));
      break;
    case "📜 Show all records":
      await executor.run(new ShowEntriesCommand(context));
      break;
    case "🗑️ Delete":
      await executor.run(new DeleteEntryCommand(context));
    case "🔄 Edition":
      await executor.run(new EditEntryCommand(context));
    case "📈 statistics":
      await executor.run(new StatsCommand(context));
    case "❌ Exit":
      await executor.run(new ExitCommand());
      break;
  }
  bootstrap();
}
bootstrap();
