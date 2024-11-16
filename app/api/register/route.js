 
import db from "@/mongo";
export async function POST(req) {
  try {
    // Parse the request body
    const { email, password,name,address } = await req.json();

    // Validate the input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Connect to the database and access the "users" collection
    const users = db.collection("users");

    // Check if the user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password for security
 

    // Save the user to the database
    const newUser = {
      email,
      password,
      name,
      address,
      createdAt: new Date(),
    };
    await users.insertOne(newUser);

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during registration" }),
      { status: 500 }
    );
  }
}
