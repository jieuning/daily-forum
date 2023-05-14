'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton({ session }) {

    console.log(session.user)
    return (
            <div className='signout'>
                <span>{session.user.name}님</span>
                <img className='profile-img' src={session.user.image} />
                <button onClick={() => { signOut() }}>로그아웃</button>
            </div>
    )
}