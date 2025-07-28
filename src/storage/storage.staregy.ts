import { MemorizationProgress } from "@/types/types";

export interface storageStrategy {
  load(): MemorizationProgress[];
  save(data: MemorizationProgress[]): void;
}
