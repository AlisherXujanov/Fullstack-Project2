import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar';
import './style.scss'

function Navigation() {
    return (
        <>
            <Navbar />

            <div id="outlet-wrapper">
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default Navigation