import { toast } from 'react-toastify'
import { useEffect, useState, useContext } from "react"
import { FcGoogle } from "react-icons/fc"
import { SlSocialVkontakte } from "react-icons/sl"
import { SiOdnoklassniki } from "react-icons/si"
import { MdAlternateEmail } from "react-icons/md"
import { BASE_URL, context, getMe } from "../../store"
import "./style.scss"


function Authentication(props) {
    const state = useContext(context)

    const [showModal, setShowModal] = useState(false)
    const [hasAccount, setHasAccount] = useState(true)
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        re_password: ""
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({});
        setForm({});
    }, [hasAccount]);

    function setInput(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    async function submit(e) {
        e.preventDefault()
        let path = null

        if (hasAccount) {
            path = "/api/token/create/"
        } else {
            path = "/auth/users/"
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        };

        let response = await fetch(BASE_URL + path, options)

        if (response.ok) {
            let data = await response.json()
            console.log(data)

            if (hasAccount) {
                localStorage.setItem("auth-token", JSON.stringify(data))
                let user_data = await getMe()
                state.dispatch({ type: "SET_CURRENT_USER", payload: user_data })

                console.log(user_data)
                toast.success("Logged in successfully", { theme: "dark" })
                closeModal();
            } else {
                setHasAccount(true);
                toast.success("Account created successfully. Login now!", { theme: "dark" })
            }
            e.target.reset();
        } else {
            let errors = await response.json();
            setForm({});
            console.log(errors);
            setErrors(errors);
        }
    }

    function changeWindow(e) {
        setErrors({});
        setForm({});
        setHasAccount(!hasAccount);
    }

    function closeModal(e = null) {
        setShowModal(false);
        setErrors({});
        setForm({});
    }

    return (
        <div className="auth-login-wrapper">
            <button className="open-modal" onClick={() => setShowModal(true)}>
                Open modal
            </button>

            <div className="modal" style={showModal ? { display: "flex" } : { display: "none" }}>
                <div className="modal-content">
                    <span className="close-modal" onClick={closeModal}>
                        &times;
                    </span>

                    <h1>{hasAccount ? "Sign in" : "Create account"}</h1>

                    <ul className="errors">
                        {Object.entries(errors).map(([key, value], index) => (
                            <li className="error" key={index}>
                                {value}
                            </li>
                        ))}
                    </ul>

                    <div className="info">
                        <form onSubmit={submit}>
                            {!hasAccount && (
                                <div className="form-control reg-email">
                                    <label htmlFor="reg-email">Email</label>
                                    <input
                                        id="reg-email"
                                        type="email"
                                        onChange={setInput}
                                        placeholder="Email"
                                        name="email"
                                        value={form.email || ""}
                                    />
                                </div>
                            )}
                            <div className="form-control reg-name">
                                <label htmlFor="reg-name">Username</label>
                                <input
                                    id="reg-name"
                                    type="text"
                                    onChange={setInput}
                                    placeholder="Username"
                                    name="username"
                                    value={form.username || ""}
                                />
                            </div>


                            <div className="form-control reg-password">
                                <label htmlFor="reg-password">Password</label>
                                <input
                                    id="reg-password"
                                    type="password"
                                    onChange={setInput}
                                    placeholder="Password"
                                    name="password"
                                    value={form.password || ""}
                                />
                            </div>

                            {!hasAccount && (
                                <div className="form-control reg-password-conf">
                                    <label htmlFor="reg-password-conf">Password confirmation</label>
                                    <input
                                        id="reg-password-conf"
                                        type="password"
                                        onChange={setInput}
                                        placeholder="Password confirmation"
                                        name="re_password"
                                        value={form.re_password || ""}
                                    />
                                </div>
                            )}

                            <div className="form-control">
                                <button className="submit" type="submit">
                                    Continue
                                </button>
                            </div>
                        </form>

                        <div className="social-media-auth">
                            <p className="text-muted">Or continue through</p>
                            <div className="social-icons">
                                <a href="#" className="vkontakte-link-wrapper">
                                    <SlSocialVkontakte />
                                </a>
                                <a href="#" className="email-link-wrapper">
                                    <MdAlternateEmail />
                                </a>
                                <a href="#" className="odnoklassniki-link-wrapper">
                                    <SiOdnoklassniki />
                                </a>
                                <a href="#" className="google-link-wrapper">
                                    <FcGoogle />
                                </a>
                            </div>
                        </div>

                        <hr />

                        <button className="create-account" type="button" onClick={changeWindow}>
                            {hasAccount ? "Create an account" : "Already have an account"}
                        </button>
                        <p className="help">
                            <a href="#">Need help?</a>
                        </p>

                        <p className="text-muted">
                            <small>
                                By using this site, you automatically create or use an existing account on AliExpress, agree to the
                                processing of personal data and accept the terms <u>AliExpress User Agreement</u>. <u>Show More</u>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;
