import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
    const db = (await connectDB).db("daily-forum");
    let result = await db.collection('post').findOne({_id: 
    new ObjectId(props.params.id)});

    return(
        <div className="p-20">
            <h4>수정하기</h4>
            {/* form 태그를 이용하면 get요청을 쉽게 할 수 있다.(POST, GET만 가능)*/}
            <form action="/api/post/edit" method="POST">
                <input className="write-title txt" name="title" defaultValue={result.title} />
                <textarea className="write-content txt" name="content" defaultValue={result.content} />
                <input style={{display:"none"}} name="_id" defaultValue={result._id.toString()} />
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}