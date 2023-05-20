'use client'

import Link from "next/link"

export default function ListItem({ result }) {
    console.log(result.length) 
    
    return (
        <>
            {result.length !== 0 ?
                <>
                    {result.map((list, i) =>
                        <div className="list-item" key={i}>
                            <div className="list-title">
                                <Link prefetch={false} href={`/detail/${result.length !== 0 ? result[i]._id : null}`}>
                                    <h3>{result[i].title}</h3>
                                </Link>
                                <p>{result[i].content}</p>
                            </div>
                            <div className="edit-menu">
                                <Link href={`/edit/${result.length !== 0 ? result[i]._id : null}`}>✏️</Link>
                                <span onClick={(e) => {
                                    fetch('/api/post/delete', { method: 'POST', body: result[i]._id })
                                        .then((r) => r.json())
                                        .then(() => {
                                            e.target.parentElement.parentElement.style.opacity = 0;
                                            setTimeout(() => {
                                                e.target.parentElement.parentElement.style.display = "none";
                                            }, 1000)
                                        })
                                }}>🗑️</span>
                            </div>
                        </div>
                    )}
                </>
                :
                <p>게시물이 없습니다. 오늘의 일상을 공유해 보세요.</p>
            }
        </>
    )
}