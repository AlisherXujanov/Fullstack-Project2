import "./style.scss"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { BASE_URL } from "../../store"
import axios from "axios"

function Cart(props) {
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])

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
    function getProductCountFromLS(productID) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]")
        let product = cart.find(p => p.id === productID)
        if (product) {
            return product.count
        }
        return 0
    }
    function updateProductFromLS(productID) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]")
        let product = cart.find(p => p.id === productID)
        if (product) {
            let updatedProducts = products.map(p => {
                if (p.id === productID) {
                    p.added_count = product.count
                }
                return p
            })
            setProducts(updatedProducts)
        } else {
            let updatedProducts = products.map(p => {
                if (p.id === productID) {
                    p.added_count = 0
                }
                return p
            })
            setProducts(updatedProducts)
        }
    }
    function removeFromCart(productID) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]")
        let product = cart.find(p => p.id === productID)

        if (product) {
            if (product.count > 1) {
                let updatedProducts = cart.filter(p => p.id !== productID)
                let updatedProduct = { ...product, count: product.count - 1 }
                updatedProducts.push(updatedProduct)
                localStorage.setItem("cart", JSON.stringify(updatedProducts))
            } else if (product.count === 1) {
                let updatedProducts = cart.filter(p => p.id !== productID)
                localStorage.setItem("cart", JSON.stringify(updatedProducts))
            }
            updateProductFromLS(productID)
        }
    }
    function addToCart(productID) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]")
        let product = cart.find(p => p.id === productID)
        if (product) {
            let updatedProducts = cart.filter(p => p.id !== productID)
            let newProduct = { ...product, count: product.count + 1 }

            updatedProducts.push(newProduct)
            localStorage.setItem("cart", JSON.stringify(updatedProducts))
        } else {
            let newProduct = { id: productID, count: 1 }
            console.log(newProduct)
            localStorage.setItem("cart", JSON.stringify([...cart, newProduct]))
        }
        updateProductFromLS(productID)
    }

    function setItemAsSelected(e, productID) {
        let selected = e.target.checked
        if (selected) {
            setSelectedProducts([...selectedProducts, productID])
        } else {
            setSelectedProducts(selectedProducts.filter(p => p !== productID))
        }
    }
    function setAllSelected(e = null) {
        if (e && e.target.checked) {
            setSelectedProducts(products.map(p => p.id))
        } else {
            setSelectedProducts([])
        }
    }

    return (
        <div className="cart-page-wrapper">
            <h1>Cart</h1>
            <div className="content">
                <div className="orders-list-wrapper">
                    <div className="header">
                        <div className="select-all-wrapper">
                            <div class="checkbox-wrapper-styled">
                                <input
                                    id="_checkbox-styled"
                                    type="checkbox" name='select-all'
                                    checked={products.length == selectedProducts.length}
                                    onChange={(e) => { setAllSelected(e) }}
                                />
                                <label for="_checkbox-styled">
                                    <div class="tick_mark"></div>
                                </label>
                            </div>
                        </div>
                        <p>
                            Selected {selectedProducts.length} out of {products.length} products
                        </p>
                    </div>
                    <hr />
                    <div className="all-orders">
                        {
                            products && products.map((product, index) => {
                                return (
                                    <div className="product-item" key={index}>
                                        <div className="input-wrapper">
                                            <div class="checkbox-wrapper-styled">
                                                <input
                                                    id={"_checkbox-styled" + index}
                                                    type="checkbox"
                                                    name='select-all'
                                                    onChange={(e) => setItemAsSelected(e, product.id)}
                                                    checked={selectedProducts.includes(product.id)}
                                                />
                                                <label for={"_checkbox-styled" + index}>
                                                    <div class="tick_mark"></div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="image">
                                            <img src={product.image} alt="product" height={100} />
                                        </div>
                                        <div className="description">
                                            <Link to={"/product/" + product.id}>
                                                {product.name}
                                                <br />
                                                {product.description.slice(0, 50) + " ..."}
                                            </Link>
                                            <div className="counter">
                                                <button onClick={(e) => { removeFromCart(product.id) }}>🗑️</button>
                                                {product.added_count || getProductCountFromLS(product.id)}
                                                <button onClick={(e) => { addToCart(product.id) }}>+</button>
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