import db from "@/mongo"
export async function POST(req) {
    const { email,address } = await req.json();
     
    const users = db.collection("users");
        users.updateOne(
        { email }, // Query to find the document
        { $set: { address } }                 // Update operation
      );
    return Response.json({message:'Hello'})
  }