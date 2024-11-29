 import { revalidatePath } from "next/cache";
import db from "@/mongo";
export async function GET(req) {
    const itemsCollection =await db.collection("items").find().toArray();
    const pathsToRevalidate = ["/", "/herbs", "/shrubs", "/trees","/search"];

  // Revalidate each path
  pathsToRevalidate.forEach((path) => {
    revalidatePath(path);
  });   
    return Response.json({items:itemsCollection})
 
  }