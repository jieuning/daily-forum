export default function Write() {
    return(
        <div className="p-20">
            <h4>글작성</h4>
            {/* form 태그를 이용하면 get요청을 쉽게 할 수 있다.(POST, GET만 가능)*/}
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="제목을 입력해주세요" />
                <input name="content" placeholder="내용을 입력해주세요" />
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}