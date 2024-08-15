import "./style.scss"
import { Link } from "react-router-dom";

function Orders(props) {
    return (
        <section className="orders-page-wrapper">
            <Link className="standart-button" to="/create-item">
                Sell on AliExpress
            </Link>

            
            <h1>Orders</h1>
            <p>Orders Page</p>


        </section>
    );
}

export default Orders;