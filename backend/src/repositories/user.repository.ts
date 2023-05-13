import pool from "../database/connectionPool";
import { OkPacket, RowDataPacket } from "mysql2";
import IUser from "../interfaces/iuser.interface";
import { isOkPacket } from "../utils/helpers";

export async function createUser(user: IUser): Promise<IUser> {
  await pool.query("INSERT INTO users SET ?", [user]);
  return user;
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  const row = rows[0];
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    password_hash: row.password_hash,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getUserById(id: string | number): Promise<IUser | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  const row = rows[0];
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    password_hash: row.password_hash,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
