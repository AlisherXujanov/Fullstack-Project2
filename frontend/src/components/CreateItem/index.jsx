import "./style.scss"
import { useState, useEffect } from 'react'
import AddImagePng from "../../assets/icons/addImage.png"
import { BASE_URL } from "../../store"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function CreateItem(props) {
    const { id } = useParams()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        images: [],
    })

    useEffect(() => {
        if (id) {
            setProductForm()
        }
    }, [])


    async function setProductForm() {
        let response = await axios.get(BASE_URL + "/api/products/" + parseInt(id) + "/")
        let data = await response.data


        // NOTE: TODO
        // FIX THIS
        let imgAsFile = null;
        if (data.image) {
            const response = await axios.get(data.image, {
                responseType: 'blob'
            });
            const blob = await response.data;
            imgAsFile = new File([blob], "image.jpg");
        }

        setForm({
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            // images: [[imgAsFile, data.image]]
        })
    }

    async function submit(e) {
        e.preventDefault()

        // Create form data
        const formData = new FormData()
        formData.append("name", form.name)
        formData.append("description", form.description)
        formData.append("price", form.price)
        // GET ONLY FIRST image as image for now
        if (form.images) {
            formData.append("image", form.images[0][0])
        }
        // -------------------------
        // TODO: Add multiple images
        // form.images.forEach((image, index) => {
        //     formData.append(`images[${index}]`, image)
        // })
        // -------------------------
        const URL = BASE_URL + "/api/products/"
        try {
            let response = null
            if (id) {
                response = await axios.put(URL + parseInt(id) + "/", formData)
                toast.success("Product updated successfully", { theme: "dark" })

                // redirect to homepage "/"
                navigate('/')
            } else {
                response = await axios.post(URL, formData)
            }
            // TODO:  'Authorization': `Bearer ${token}`
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
        e.target.reset()
        removeImage(null, true)
    }

    function setFormValue(e) {
        const { name, value } = e.target;
        if (name === "images") {
            const file = e.target.files[0]
            const imageUrl = URL.createObjectURL(file)

            // set form images and image URLs
            setForm({ ...form, images: [...form.images, [file, imageUrl]] })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    function removeImage(e = null, all = false) {
        if (form.images) {
            if (all == true) {
                for (let i = 0; i < form.images.length; i++) {
                    let imageUrl = form.images[i][1]
                    let imgTag = document.querySelector(`img[src="${imageUrl}"]`)
                    imgTag.remove()
                }
                form.images = []
            } else {
                let imageUrl = e.target.src
                setForm({ ...form, images: form.images.filter(img => img[1] !== imageUrl) })

                try {
                    let imageEl = document.querySelector(`${e.target.getAttribute("data-del")}`)
                    imageEl.remove()
                } catch (error) {
                    console.warn("Image has been deleted")
                }
            }
        }
    }

    return (
        <section className="create-item-page-wrapper">
            <h1>
                {id ? "Update " : "Create "}
                your Product
            </h1>

            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="product-name">Product name</label>
                    <input id="product-name" type="text"
                        placeholder="Product name" name="name"
                        onChange={setFormValue}
                        value={form.name}
                    />
                </div>
                <div className="form-control">
                    <div className="row">
                        <div className="image-input-wrapper">
                            <input id="product-image"
                                type="file"
                                name="images"
                                onChange={setFormValue}
                                accept="image/*"
                            />
                            <img src={AddImagePng} alt="addImage" />
                            <small>Upload or drag here</small>
                        </div>
                        <div className="price-input-wrapper">
                            <label htmlFor="product-price">Product price</label>
                            <input id="product-price" type="number"
                                placeholder="Product price" name="price"
                                value={form.price}
                                onChange={setFormValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <div className="images-container">
                        {
                            form.images && form.images.map((image, index) =>
                                <img
                                    key={index}
                                    src={image[1]}
                                    alt="product"
                                    onClick={removeImage}
                                    data-del={image[1].slice(image[1].length - 10)} // last 10 characters of the image URL
                                />
                            )
                        }
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="product-description">Product description</label>
                    <textarea id="product-description"
                        placeholder="Product description"
                        rows={8}
                        name="description"
                        onChange={setFormValue}
                        value={form.description}
                    />
                </div>
                <div className="form-control">
                    <button type="submit">
                        {id ? "Update " : "Create "}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreateItem
