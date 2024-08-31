import "./style.scss"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { BASE_URL } from "../../store"
import axios from "axios"

function Cart(props) {
    const [products, setProducts] = useState([])
    const [productCount, setProductCount] = useState(0)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const URL = BASE_URL + "/api/products/"
        try {
            let response = await axios.get(URL)
            if (response.status === 200) {
                let data = await response.data
                const productIDS = JSON.parse(localStorage.getItem("cart") || "[]").map(p => p.id)
                let neededProducts = data.filter(p => productIDS.includes(p.id))
                setProducts(neededProducts)
            } else {
                console.log("Failed to fetch products")
            }
        } catch (error) {
            console.error(error)
        }
    }


    // function updateProductFromLS(productID) {
    //     let cart = JSON.parse(localStorage.getItem("cart") || "[]")
    //     let product = cart.find(p => p.id === productID)
    //     if (product) {
    //         setProductCount(product.count)
    //     } else {
    //         setProductCount(0)
    //     }
    // }
    // function removeFromCart(productID) {
    //     let cart = JSON.parse(localStorage.getItem("cart") || "[]")
    //     let product = cart.find(p => p.id === productID)

    //     if (product) {
    //         if (product.count > 1) {
    //             let updatedProducts = cart.filter(p => p.id !== productID)
    //             let updatedProduct = { ...product, count: product.count - 1 }
    //             updatedProducts.push(updatedProduct)
    //             localStorage.setItem("cart", JSON.stringify(updatedProducts))
    //         } else if (product.count === 1) {
    //             let updatedProducts = cart.filter(p => p.id !== productID)
    //             localStorage.setItem("cart", JSON.stringify(updatedProducts))
    //         }
    //         updateProductFromLS()
    //     }
    // }
    // function addToCart(productID) {
    //     let cart = JSON.parse(localStorage.getItem("cart") || "[]")
    //     let product = cart.find(p => p.id === productID)
    //     if (product) {
    //         let updatedProducts = cart.filter(p => p.id !== productID)
    //         let newProduct = { ...product, count: product.count + 1 }

    //         updatedProducts.push(newProduct)
    //         localStorage.setItem("cart", JSON.stringify(updatedProducts))
    //     } else {
    //         let newProduct = { id: productID, count: 1 }
    //         console.log(newProduct)
    //         localStorage.setItem("cart", JSON.stringify([...cart, newProduct]))
    //     }
    //     updateProductFromLS()
    // }


    return (
        <div className="cart-page-wrapper">

            <h1>Cart</h1>

            <div className="content">
                <div className="orders-list-wrapper">
                    <div className="header">
                        <div className="select-all-wrapper">
                            <input type="checkbox" name='select-all' />
                        </div>
                        <p>
                            Selected 2 out of 2
                        </p>
                    </div>
                    <hr />
                    <div className="all-orders">
                        {
                            products && products.map((product, index) => {
                                return (
                                    <div className="product-item" key={index}>
                                        <div className="input-wrapper">
                                            <input type="checkbox" name='select-all' />
                                        </div>
                                        <div className="image">
                                            <img src={product.image} alt="product" height={100} />
                                        </div>
                                        <div className="description">
                                            <Link to="/product/1">
                                                {product.name}
                                                <br />
                                                {product.description.slice(0, 50) + " ..."}
                                            </Link>
                                            <div className="counter">
                                                <button>🗑️</button>
                                                {product.id}
                                                <button>+</button>
                                            </div>
                                            <div className="price-wrapper">
                                                <h2>13 143 406.51 UZS</h2>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;