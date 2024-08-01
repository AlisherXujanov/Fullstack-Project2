import { useLocation, Route, Routes } from 'react-router-dom'
import Navigation from "./Navigation"
import NoPage from "./NoPage"

function AllComponents(props) {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigation />} >
                <Route index element={"AliExpress"} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default AllComponents;