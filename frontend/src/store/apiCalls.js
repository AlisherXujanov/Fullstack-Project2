import { BASE_URL, initialState } from "."
import { getTokensFromLocalStorage } from "../helpers"
import axios from 'axios'


async function accessTokenExpired() {
    try {
        const { accessToken, _ } = getTokensFromLocalStorage()
        const URL = BASE_URL + "/api/token/verify/"
        let result = await axios.post(URL, {token: accessToken})
        return result.status !== 200
    }
    catch (error) {
        refreshToken()
    }
}


function refreshToken() {
    const { _, refreshToken } = getTokensFromLocalStorage()

    fetch(BASE_URL + "/api/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("auth-token", JSON.stringify(data))
        })
        .catch(error => {
            console.error("--- Error when refreshing token ---")
            console.error(error)
            console.error("-----------------------------------")
            localStorage.removeItem("auth-token")
        })
}


async function fetchLogout() {
    const { accessToken, refreshToken } = getTokensFromLocalStorage()

    const response = await fetch(BASE_URL + "/auth/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
    if (response.ok) {
        localStorage.removeItem("auth-token")
    }
    else {
        console.error("--- Error when logging out ---")
        console.error(response)
        console.error("-----------------------------------")
    }
}


async function getMe() {
    if (await accessTokenExpired()) return initialState.currentUser

    const { accessToken, _ } = getTokensFromLocalStorage()
    try {
        let user_response = await fetch(BASE_URL + "/api/current_user_profile/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        if (user_response.ok) {
            return await user_response.json()
        } else {
            return initialState.currentUser
        }
    } catch (error) {
        console.error("--- Error when getting myself ---")
        console.error(error)
        console.error("-----------------------------------")
        return initialState.currentUser
    }
}


export {
    refreshToken,
    fetchLogout,
    getMe
}
