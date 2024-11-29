 
import db from "@/mongo";
export async function GET(req) {
    const itemsCollection =await db.collection("items").find().toArray();   
    return Response.json({items:itemsCollection})
 
  }