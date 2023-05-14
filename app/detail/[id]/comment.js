'use client'

import { useEffect, useState } from "react"

export default function Comment({ _id }) {

    let [comment, setCommet] = useState('');
    let [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/comment/list?id=${_id}`).then(r => r.json())
            .then((result) => {
                setData(result)
            })
    }, [])

    return (
        <div>
            <hr></hr>
            {
                data.length > 0 ?
                    data.map((data, i) =>
                        <p key={i}>{data.content}</p>
                    )
                    : '댓글이 없습니다.'
            }
            <input onChange={(e) => { setCommet(e.target.value) }} />
            <button onClick={() => {
                console.log(comment)
                fetch('/api/comment/new', {
                    method: 'POST',
                    body: JSON.stringify({ comment: comment, _id: _id })
                })
            }}>댓글전송</button>
        </div>
    )
}