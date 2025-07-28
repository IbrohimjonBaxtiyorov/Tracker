import { JSONStorage } from "./json.storage";
import { storageStrategy } from "./storage.staregy";

export class StorageFactory {
  static create(type: "json"): storageStrategy {
    switch (type) {
      case "json":
      default:
        return new JSONStorage();
    }
  }
}
