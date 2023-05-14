import { connectDB } from "@/util/database";
import ListItem from "./listItem";

export const dynamic = 'force-dynamic'

export default async function List() {

  const db = (await connectDB).db("daily-forum");
  let result = await db.collection('post').find().toArray();
  console.log(result[0]._id)

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  )
} 