import { ObjectId } from "mongodb"
import { connectDB } from "@/util/database"

export default async function handler(요청, 응답) {
    const db = (await connectDB).db('daily-forum')
    let result = await db.collection('comment')
    .find({parent : new ObjectId(요청.query.id)}).toArray()
    응답.status(200).json(result)
}