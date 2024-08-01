import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar';
import './style.scss'

function Navigation() {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    )
}

export default Navigation