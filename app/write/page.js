'use client'

import { useState } from "react"

export default function Write() {
    let [src, setSrc] = useState('');
    
    return (
        <div className="p-20">
            <h4>글쓰기</h4>
            {/* form 태그를 이용하면 method요청을 쉽게 할 수 있다.(POST, GET만 가능)*/}
            <form action="/api/post/new" method="POST">
                <input className="write-title txt" name="title" placeholder="제목을 입력해주세요" />
                {/* <input className="write-content" name="content" placeholder="내용을 입력해주세요" /> */}
                <textarea className="write-content txt" name="content" placeholder="내용을 입력해주세요" />
                <input type="file" accept="image/*"
                    onChange={async (e) => {
                        let file = e.target.files[0]
                        let filename = encodeURIComponent(file.name)
                        let res = await fetch(`/api/post/image?file=file=${filename}`)
                        res = await res.json()
                        console.log(res)

                        //S3 업로드
                        const formData = new FormData()
                        Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                            formData.append(key, value)
                        })
                        let uploadResult = await fetch(res.url, {
                            method: 'POST',
                            body: formData,
                        })
                        console.log(uploadResult)

                        if (uploadResult.ok) {
                            setSrc(uploadResult.url + '/' + filename)
                        } else {
                            console.log('실패')
                        }
                    }}
                />
                <img src={src} />
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}