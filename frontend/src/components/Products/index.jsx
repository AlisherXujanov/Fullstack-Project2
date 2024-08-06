import "./style.scss"
import Product from "./Product"
import ProductImage from '../../assets/images/product.png'

function Products(props) {
    return (
        <div className="products-wrapper">
            <div className="header">
                <a className="active" href="#">Top-products</a>
                <a href="#">More To Love</a>
            </div>

            <div className="content">
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
                <Product image={ProductImage} />
            </div>
        </div>
    )
}

export default Products;