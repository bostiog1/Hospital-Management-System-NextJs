import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Creating user with data:", user); // Log the input data
    const newUser = await users.create(
      ID.unique(), // Unique user ID
      user.email, // User email
      user.phone, // User phone number
      undefined, // Password (optional)
      user.name // User name
    );

    console.log("New User Created:", newUser); // Log the created user
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Error creating user:", error); // Log the error
    if (error && error?.code === 409) {
      console.log("User already exists, fetching existing user...");
      const documents = await users.list([Query.equal("email", [user.email])]);
      console.log("Existing User Found:", documents.users[0]); // Log the existing user

      return documents?.users[0];
    }
    throw error; // Re-throw the error to handle it in the `onSubmit` function
  }
};
