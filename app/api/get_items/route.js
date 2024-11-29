 
import db from "@/mongo";
export async function GET(req) {
    
 
    const itemsCollection =await db.collection("items").find().toArray();
    console.log(itemsCollection)
 
    // await itemsCollection.insertMany(market)
   
    return Response.json({items:itemsCollection})
  }