'use client'

export default function Error({ error, reset }) {
    return (
        <>
            <h4>에러 발생</h4>
            <button onClick={() => { reset() }}>원인</button>
        </>
    )
}