import { OkPacket, RowDataPacket } from "mysql2";

export function isOkPacket(data: RowDataPacket[] | OkPacket): data is OkPacket {
  return "affectedRows" in data;
}
