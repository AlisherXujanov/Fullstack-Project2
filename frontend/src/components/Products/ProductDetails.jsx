import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { BASE_URL } from '../../store'
import { convertToUZS } from "../../helpers"
import { toast } from 'react-toastify'
import axios from 'axios'
import "./productDetails.scss"

function ProductDetails(props) {
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const URL = BASE_URL + "/api/products/" + parseInt(id) + "/"
        try {
            let response = await axios.get(URL)
            if (response.status === 200) {
                setProduct(response.data)
            } else {
                console.log("Failed to fetch product")
            }
        } catch (error) {
            console.error(error)
        }
    }


    async function deleteItem() {
        if (confirm(`Delete - ${product.name}?`)) {
            try {
                let response = await axios.delete(BASE_URL + "/api/products/" + product.id + "/")
                if (response.status !== 204) {
                    console.log("Failed to delete product")
                    return
                }
                toast.success(`${product.name} deleted successfully!`, {theme: "dark"})
                navigate("/")
            } catch (error) {
                console.error(error)
            }
        } else {
            return
        }
    }


    return (
        <div className="product-details">
            <h1 className="name">{product.name}</h1>

            <div className="row">
                <h4 className="price">
                    Price: <del>{convertToUZS(product.price)} UZS</del>
                    <p>
                        Discount <span>-50</span>% =
                        <u>{convertToUZS(product.price / 2)} UZS</u>
                    </p>
                </h4>
                <div className="right">
                    <Link to={"#"} className="delete" onClick={deleteItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        Delete
                    </Link>
                    <Link to={"/update-item/" + product.id} className="update">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                        Update
                    </Link>
                </div>
            </div>

            <div className="row">
                <img src={product.image} width={"100%"} height={400} />

                <p className="description">
                    {product.description}
                    <br />
                    <br />
                    Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Путь по всей агентство свой букв сих продолжил дал жизни имеет за, они переписывается он рыбными пунктуация то океана рыбного точках залетают своего власти страна подпоясал переписали! Запятых раз прямо рот семантика. Путь рыбными рот продолжил проектах заманивший но свою меня, ее великий океана страну ipsum ручеек взобравшись инициал. Ему но текст языком правилами коварных живет пунктуация заманивший, образ предупредила свою на берегу дороге не свое переулка всемогущая? Продолжил свой первую безопасную если домах за грамматики переписали несколько речью ее раз вопроса, ручеек заголовок! Скатился грустный власти рекламных! Пояс своего проектах щеке.

                    <button className="checkout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                        </svg>
                        Checkout
                    </button>
                </p>
            </div>


        </div>
    );
}

export default ProductDetails;