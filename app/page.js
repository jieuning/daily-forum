import { MongoClient } from "mongodb"
import { connectDB } from "@/util/database"

export default async function Home() {

  const db = (await connectDB).db("daily-forum");
  let result = await db.collection('post').find().toArray();

  return (
    <div>하이</div>
  )
}
