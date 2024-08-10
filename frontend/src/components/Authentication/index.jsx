import { useEffect, useState } from "react"
import "./style.scss"
import { FcGoogle } from "react-icons/fc"
import { SlSocialVkontakte } from "react-icons/sl"
import { SiOdnoklassniki } from "react-icons/si"
import { MdAlternateEmail } from "react-icons/md"



function Authentication(props) {
    const [showModal, setShowModal] = useState(false)
    const [hasAccount, setHasAccount] = useState(false)

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })
    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        email: "",
        password: "",
        re_password: ""
    })
    const [errors, setErrors] = useState({})

    function setInput(e) {
        const { name, value } = e.target

        if (hasAccount) {
            setLoginForm({ ...loginForm, [name]: value })
        } else {
            setRegistrationForm({ ...registrationForm, [name]: value })
        }
    }

    async function submit(e) {
        e.preventDefault()
        const BASE_URL = "http://127.0.0.1:8000"
        let form = null
        let path = null
        if (hasAccount) {
            form = loginForm
            path = "/api/token/create/"
        } else {
            form = registrationForm
            path = "/auth/users/"
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }
        let response = await fetch(BASE_URL + path, options)

        if (response.ok) {
            let data = await response.json()
            console.log(data)

            if (hasAccount) {
                localStorage.setItem("auth-token", JSON.stringify(data))
                alert("Logged in successfully")
                setShowModal(false)
            } else {
                setHasAccount(true)
                alert("Account created successfully. Login now!")
            }
            e.target.reset()
        } else {
            let errors = await response.json()
            setLoginForm({})
            setRegistrationForm({})
            console.log(errors)
            setErrors(errors)
        }
    }

    function changeWindow(e) {
        setErrors({})
        setLoginForm({})
        setRegistrationForm({})
        setHasAccount(!hasAccount)
    }

    return (
        <div className="auth-login-wrapper">
            <button className="open-modal" onClick={() => setShowModal(true)}>
                Open modal
            </button>

            <div className="modal" style={showModal ? { display: 'flex' } : { display: 'none' }}>
                <div className="modal-content">
                    <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>

                    <h1>{hasAccount ? "Sign in" : "Create account"}</h1>

                    <ul className="errors">
                        {
                            Object.entries(errors).map(([key, value], index) => {
                                return (
                                    <li className="error" key={index}>
                                        {value}
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div className="info">
                        {
                            hasAccount
                                ?
                                <form onSubmit={submit}>
                                    <div className="form-control login-name">
                                        <label htmlFor="login-name">Username</label>
                                        <input id="login-name"
                                            type="text"
                                            onChange={setInput}
                                            placeholder="Username"
                                            name="username"
                                            value={loginForm.username || ""}
                                        />
                                    </div>
                                    <div className="form-control login-password">
                                        <label htmlFor="login-password">Password</label>
                                        <input id="login-password"
                                            type="password"
                                            onChange={setInput}
                                            placeholder="Password"
                                            name="password"
                                            value={loginForm.password || ""}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <button className="submit" type="submit">Continue</button>
                                    </div>
                                </form>
                                :
                                <form onSubmit={submit}>
                                    <div className="form-control reg-name">
                                        <label htmlFor="reg-name">Username</label>
                                        <input id="reg-name"
                                            type="text"
                                            onChange={setInput}
                                            placeholder="Username"
                                            name="username"
                                            value={registrationForm.username || ""}
                                        />
                                    </div>
                                    <div className="form-control reg-email">
                                        <label htmlFor="reg-email">Email</label>
                                        <input id="reg-email"
                                            type="email"
                                            onChange={setInput}
                                            placeholder="Email"
                                            name="email"
                                            value={registrationForm.email || ""}
                                        />
                                    </div>
                                    <div className="form-control reg-password">
                                        <label htmlFor="reg-password">Password</label>
                                        <input id="reg-password"
                                            type="password"
                                            onChange={setInput}
                                            placeholder="Password"
                                            name="password"
                                            value={registrationForm.password || ""}
                                        />
                                    </div>
                                    <div className="form-control reg-password-conf">
                                        <label htmlFor="reg-password-conf">Password confirmation</label>
                                        <input id="reg-password-conf"
                                            type="password"
                                            onChange={setInput}
                                            placeholder="Password confirmation"
                                            name="re_password"
                                            value={registrationForm.re_password || ""}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <button className="submit" type="submit">Continue</button>
                                    </div>
                                </form>
                        }

                        <div className="social-media-auth">
                            <p className="text-muted">Or conrinue through</p>
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

                        <button className="create-account" type="button"
                            onClick={changeWindow}
                        >
                            {hasAccount ? "Create an account" : "Already have an account"}
                        </button>
                        <p className="help">
                            <a href="#">Need help?</a>
                        </p>

                        <p className="text-muted">
                            <small>
                                By using this site, you automatically create or use an existing account on AliExpress,
                                agree to the processing of personal data and accept the terms <u>AliExpress User Agreement</u>.
                                <u>Show More</u>
                            </small>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;