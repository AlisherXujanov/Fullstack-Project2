import { useLocation, Route, Routes } from 'react-router-dom'
import Navigation from "./Navigation"
import NoPage from "./NoPage"
import LandingPage from "./LandingPage"
import Authentication from "./Authentication"
import Orders from './Orders'
import CreateItem from './CreateItem'
import Cart from './Cart'
import Profile from './Profile'
import ProductDetails from './Products/ProductDetails.jsx'
import AuthControl from './AuthControl.jsx'


const AuthCreateItem = AuthControl(CreateItem)
const AuthProductDetails = AuthControl(ProductDetails)
const AuthCart = AuthControl(Cart)
const AuthProfile = AuthControl(Profile)


function AllComponents(props) {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigation />} >
                <Route index element={<LandingPage />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="orders" element={<Orders />} />
                <Route path="create-item" element={<AuthCreateItem />} />
                <Route path="update-item/:id" element={<AuthCreateItem />} />
                <Route path="product/:id" element={<AuthProductDetails />} />
                <Route path="cart" element={<AuthCart />} />
                <Route path="profile" element={<AuthProfile />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default AllComponents;