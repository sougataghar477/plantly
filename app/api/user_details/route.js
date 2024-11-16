import db from "@/mongo";
export async function POST(req) {
    const { email } = await req.json();
    console.log(email)
    const users = db.collection("users");
    const user = await users.findOne({ email });
     console.log(user)
   
    return Response.json({name:user.name,address:user.address})
  }