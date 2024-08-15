import "./style.scss"
import { useState } from 'react'
import AddImagePng from "../../assets/icons/addImage.png"


function CreateItem(props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    })

    function submit(e) {
        e.preventDefault()
        console.log(form)

        e.target.reset()
    }

    function setFormValue(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })

        if (name === "image") {
            const imagesContainer = document.querySelector(".images-container");
            // ... todo
        }
    }


    return (
        <section className="create-item-page-wrapper">
            <h1>Create your Product</h1>

            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="product-name">Product name</label>
                    <input id="product-name" type="text"
                        placeholder="Product name" name="name"
                        onChange={setFormValue}
                    />
                </div>
                <div className="form-control">
                    <div className="row">
                        <div className="image-input-wrapper">
                            <input id="product-image" type="file" 
                                name="image" multiple required 
                                onChange={setFormValue}
                            />
                            <img src={AddImagePng} alt="addImage" />
                            <small>Upload or drag here</small>

                            <div className="images-container"></div>
                        </div>
                        <div className="price-input-wrapper">
                            <label htmlFor="product-price">Product price</label>
                            <input id="product-price" type="number"
                                placeholder="Product price" name="price"
                                onChange={setFormValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="product-description">Product description</label>
                    <textarea id="product-description"
                        placeholder="Product description"
                        rows={8}
                        name="description"
                        onChange={setFormValue}
                    />
                </div>
                <div className="form-control">
                    <button type="submit">Create</button>
                </div>
            </form>
        </section>
    );
}

export default CreateItem;