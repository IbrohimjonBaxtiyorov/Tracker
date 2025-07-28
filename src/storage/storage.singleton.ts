import { StorageFactory } from "./storage.factory";
import { storageStrategy } from "./storage.staregy";

export class StorageSingleton {
  private static instance: storageStrategy;

  static getInstance(): storageStrategy {
    if (!this.instance) {
      this.instance = StorageFactory.create("json");
    }
    return this.instance;
  }
}
