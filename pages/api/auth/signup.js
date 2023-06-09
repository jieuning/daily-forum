import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {
        // 암호화
        let hash = await bcrypt.hash(요청.body.password, 10)
        요청.body.password = hash;
        console.log(hash)
        console.log(요청.body)
        const db = (await connectDB).db("daily-forum")
        await db.collection('user_cred').insertOne(요청.body)
        응답.status(200).json('가입성공')

    }
}