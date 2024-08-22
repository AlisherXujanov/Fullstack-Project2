import { BASE_URL, initialState } from "."
import { getTokensFromLocalStorage } from "../helpers"



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
    const { accessToken, _ } = getTokensFromLocalStorage()

    try {
        let user_response = await fetch(BASE_URL + "/auth/users/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return await user_response.json()
    } catch (error) {
        console.error("--- Error when getting myself ---")
        console.error(error)
        console.error("-----------------------------------")
    }
}


export {
    refreshToken,
    fetchLogout,
    getMe
}
