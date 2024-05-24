import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {

    return (
        <div>
            <div> <Navbar /></div>
            {children}
            <div> <Footer /></div>
        </div>
    )
}

export default Layout
