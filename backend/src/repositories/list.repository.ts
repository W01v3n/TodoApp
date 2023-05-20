import pool from "../database/connectionPool";
import { OkPacket, RowDataPacket } from "mysql2";
import IUser from "../interfaces/iuser.interface";
import { isOkPacket } from "../utils/helpers";
import ITodoList from "../interfaces/itodoList.interface";

export async function createList(
  list: ITodoList,
  userId: number
): Promise<ITodoList | null> {
  // Create a todo list in the database, and in the field user_id, insert the id of the user who created the list.
  // Return the created list.
  // If the list was not created, return null.

  const createdAt = new Date();
  const updatedAt = new Date();

  const query =
    "INSERT INTO todo_lists (name, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)";
  const queryParams = [list.name, userId, createdAt, updatedAt];

  try {
    const [result] = await pool.query<OkPacket>(query, queryParams);

    if (isOkPacket(result)) {
      const createdList = {
        id: result.insertId,
        name: list.name,
        userId: userId,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
      return createdList;
    }

    return null;
  } catch (error) {
    console.error("Error creating todo list:", error);
    return null;
  }
}

// Function to find all todo lists with the same user id
export async function findListsByUserId(
  userId: number
): Promise<ITodoList[] | null> {
  // Return all todo lists with the same user id
  // If no lists are found, return null

  const query = "SELECT * FROM todo_lists WHERE user_id = ?";
  const queryParams = [userId];

  try {
    const [result] = await pool.query<RowDataPacket[]>(query, queryParams);

    if (result.length) {
      const lists: ITodoList[] = result.map((list) => {
        return {
          id: list.id,
          name: list.name,
          userId: list.user_id,
          createdAt: list.created_at,
          updatedAt: list.updated_at,
        };
      });

      return lists;
    }

    return null;
  } catch (error) {
    console.error("Error finding todo lists:", error);
    return null;
  }
}

export async function deleteListById(listId: number) {
  const query = "DELETE FROM todo_lists WHERE id = ?";
  const queryParams = [listId];
  try {
    const [result] = await pool.query<RowDataPacket[]>(query, queryParams);
    if (isOkPacket(result)) {
      return result.affectedRows > 0;
    }
  } catch (error) {
    console.error("Error finding this list.");
  }

  return null;
}
