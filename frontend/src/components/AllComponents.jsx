import { useLocation, Route, Routes } from 'react-router-dom'
import Navigation from "./Navigation"
import NoPage from "./NoPage"
import LandingPage from "./LandingPage"
import Login from "./Authentication/Login.jsx"

function AllComponents(props) {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigation />} >
                <Route index element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default AllComponents;