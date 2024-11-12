import React from 'react'
import Navbar from './Navbar'
import UserList from './UserList'

const Home = () => {
    return (
        <div className='sm:mx-20'>
            <Navbar />
            <UserList />
        </div>
    )
}

export default Home