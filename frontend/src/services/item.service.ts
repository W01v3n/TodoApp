import api from "./api.service";

interface NewItemParams {
  listId: number;
  title: string;
  content?: string;
  completed: boolean;
}

export async function createNewItem(itemData: NewItemParams) {
  // Create the new list in the database, api call
  try {
    const response = await api.post(
      `/lists/${itemData.listId}/items`,
      itemData
    );
    if (response.status == 401) {
      console.log("No list ID was provided while creating a new item.");
    } else if (response.status == 201) {
      // console.log("Item created in database!");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getAllItemsByListId(listId: number) {
  // Get all lists from the backend
  try {
    const response = await api.get(`/lists/${listId}/items`);
    if (response.status == 401) {
      console.log("No list ID was provided during items fetching");
    } else if (response.status == 200) {
      // console.log(`Got all items for list id of ${listId}.`);
      // console.log(response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(listId: number, itemId: number) {
  try {
    const response = await api.delete(`/lists/${listId}/items/${itemId}`);
    if (response.status == 404) {
      console.log("Item could not be found.");
    } else if (response.status == 200) {
      // console.log("Deleted item");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
