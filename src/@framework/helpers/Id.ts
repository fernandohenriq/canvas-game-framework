import crypto from "crypto";

let incremental = 0;

export class Id {
  static generateIncrementalId() {
    return `#${(incremental++).toString().padEnd(4, "0")}`;
  }

  static generateUniqueId() {
    return crypto.randomUUID();
  }
}
