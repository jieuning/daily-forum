import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청, 응답, authOptions)
    console.log(session)
    if (session) {
        요청.body.author = session.user.email
    }
    console.log(요청.body)
    if (요청.method == 'POST') {
        console.log(요청.body)
        if (요청.body.title == '') {
            return 응답.status(500).json('제목 입력 필수입니다.')
        }
        const db = (await connectDB).db("daily-forum");
        let result = await db.collection('post').insertOne(요청.body);
        // redirect - 응답이 완료되면 해당 경로로 이동
        return 응답.redirect(302, '/list')
    }
}