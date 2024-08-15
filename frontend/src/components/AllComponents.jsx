import { useLocation, Route, Routes } from 'react-router-dom'
import Navigation from "./Navigation"
import NoPage from "./NoPage"
import LandingPage from "./LandingPage"
import Authentication from "./Authentication"
import Orders from './Orders'
import CreateItem from './CreateItem'


function AllComponents(props) {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigation />} >
                <Route index element={<LandingPage />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="orders" element={<Orders />} />
                <Route path="create-item" element={<CreateItem />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default AllComponents;