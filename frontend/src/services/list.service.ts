import api from "./api.service";
import { AxiosError } from "axios";

interface NewListParams {
  userId: number;
  name: string;
}

export async function newList(listData: NewListParams) {
  // Create the new list in the database, api call
  try {
    const response = await api.post("/lists", listData);
    if (response.status == 401) {
      console.log("No user ID was provided while creating a new list.");
    } else if (response.status == 201) {
      // console.log("List created in database!");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getAllLists() {
  // Get all lists from the backend
  try {
    const response = await api.get("/lists");
    // console.log("Got all lists.");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status == 401) {
      console.log("No user ID was provided during list fetching");
    } else {
      console.log(axiosError);
    }
  }
}

export async function deleteList(listId: number) {
  try {
    const response = await api.delete(`/lists/${listId}`);
    if (response.status == 404) {
      console.log("List could not be found.");
    } else if (response.status == 200) {
      // console.log("Deleted list");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
