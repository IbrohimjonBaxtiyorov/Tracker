import { storageStrategy } from "@/storage/storage.staregy";

export class Context {
  constructor(public storage: storageStrategy) {}
}
