import "./style.scss"
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import { BASE_URL, context } from "../../store"
import { convertToUZS } from "../../helpers"
import axios from "axios"

function Cart(props) {
    const [products, setProducts] = useState([])
    const state = useContext(context)

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
    function getProductCountFromLS(productID, object = false) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]")
        let product = cart.find(p => p.id === productID)
        if (product) {
            if (object) { return product }
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
        state.setSelectedItemsCount()
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
            state.dispatch({ type: "SET_SELECTED_PRODUCTS", payload: [...state.selectedProducts, productID] })
        } else {
            state.dispatch({ type: "SET_SELECTED_PRODUCTS", payload: state.selectedProducts.filter(p => p !== productID) })
        }
    }
    function setAllSelected(e = null) {
        if (e && e.target.checked) {
            state.dispatch({ type: "SET_SELECTED_PRODUCTS", payload: products.map(p => p.id) })
        } else {
            state.dispatch({ type: "SET_SELECTED_PRODUCTS", payload: [] })
        }
    }

    return (
        <div className="cart-page-wrapper">
            <h1>Cart</h1>
            <div className="content">
                <div className="orders-list-wrapper">
                    <div className="header">
                        <div className="select-all-wrapper">
                            <div className="checkbox-wrapper-styled">
                                <input
                                    id="_checkbox-styled"
                                    type="checkbox" name='select-all'
                                    checked={products.length == state.selectedProducts.length}
                                    onChange={(e) => { setAllSelected(e) }}
                                />
                                <label htmlFor="_checkbox-styled">
                                    <div className="tick_mark"></div>
                                </label>
                            </div>
                        </div>
                        <p>
                            Selected {state.selectedProducts.length} out of {products.length} products
                        </p>
                    </div>
                    <hr />
                    <div className="all-orders">
                        {
                            products && products.map((product, index) => {
                                return (
                                    <div className="product-item" key={index}>
                                        <div className="input-wrapper">
                                            <div className="checkbox-wrapper-styled">
                                                <input
                                                    id={"_checkbox-styled" + index}
                                                    type="checkbox"
                                                    name='select-all'
                                                    onChange={(e) => setItemAsSelected(e, product.id)}
                                                    checked={state.selectedProducts.includes(product.id)}
                                                />
                                                <label htmlFor={"_checkbox-styled" + index}>
                                                    <div className="tick_mark"></div>
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
                                                <h2>{convertToUZS(product.price)}</h2>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="checkout-details">
                    <h3>Selected {state.selectedProducts.length} items</h3>
                    <div className="items">
                        {
                            products.map((p, index) => {
                                if (!state.selectedProducts.includes(p.id)) return null
                                return (
                                    <div key={index} className="info">
                                        <div className="row">
                                            <h4>✅ {p.name} - {getProductCountFromLS(p.id)} pics</h4>
                                            <div className="item-total-price">
                                                {convertToUZS(p.price * getProductCountFromLS(p.id))} UZS
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="total-all-price">
                        <h3>Total: {
                            convertToUZS(
                                products.reduce((acc, p) => {
                                    if (state.selectedProducts.includes(p.id)) {
                                        return acc + p.price * getProductCountFromLS(p.id)
                                    }
                                    return acc
                                }, 0)
                            )
                        } UZS</h3>
                        <button className='checkout-btn'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;