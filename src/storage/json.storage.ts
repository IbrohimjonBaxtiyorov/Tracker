import fs from "fs";
import path from "path";
import { storageStrategy } from "./storage.staregy";
import { MemorizationProgress } from "@/types/types";

const filePath = path.join(__dirname, "../../data/progress.json");

export class JSONStorage implements storageStrategy {
  load(): MemorizationProgress[] {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  save(data: MemorizationProgress[]): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
