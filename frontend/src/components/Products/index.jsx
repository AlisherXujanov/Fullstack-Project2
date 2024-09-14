import "./style.scss"
import Product from "./Product"
import ProductImage from '../../assets/images/product.png'
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { BASE_URL, context } from "../../store"
import { Link } from 'react-router-dom'

function Products(props) {
    const state = useContext(context)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const URL = BASE_URL + "/api/products/"
        try {
            let response = await axios.get(URL)
            if (response.status === 200) {
                state.dispatch({ type: "SET_PRODUCTS", payload: response.data })
            } else {
                console.log("Failed to fetch products")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="products-wrapper">
            <div className="header">
                <a className="active" href="#">Top-products</a>
                <a href="#">More To Love</a>
            </div>

            <div className="content">
                {
                    state.products.map((product, index) => {
                        return (
                            <Link to={"/product/" + parseInt(product.id)} key={index}>
                                <Product
                                    image={product.images.length ? product.images[0].image : null}
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                />
                            </Link>
                        )
                    })
                }

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