'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
    return (
        <button className='login' onClick={() => { signIn() }}>로그인</button>
    )
}