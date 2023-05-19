import api from "../services/api";

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
      console.log("List created in database!");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllLists() {
  // Get all lists from the backend
  try {
    const response = await api.get("/lists");
    if (response.status == 401) {
      console.log("No user ID was provided during list fetching");
    } else if (response.status == 200) {
      console.log("Got all lists.");
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}
