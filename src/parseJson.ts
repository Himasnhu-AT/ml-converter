import * as fs from "fs";
import { MLModelConfiguration } from "../types/mlconverter.types";

export function parseJson(filePath: string): any {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    try {
      const parsedJson: MLModelConfiguration = JSON.parse(fileContent);
      return parsedJson;
    } catch {
      throw new Error("The Json give isn't as expected");
    }
  } catch (error) {
    throw new Error("Failed to parse JSON: ");
  }
}
