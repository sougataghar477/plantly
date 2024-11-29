 import { revalidatePath } from "next/cache";
import db from "@/mongo";
export async function GET(req) {
    const itemsCollection =await db.collection("items").find().toArray();
    revalidatePath('/')   
    return Response.json({items:itemsCollection})
 
  }