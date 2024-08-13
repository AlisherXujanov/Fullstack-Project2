import { BASE_URL, initialState } from "."

function refreshToken() {
    const TOKEN = localStorage.getItem("auth-token") || "{}"

    fetch(BASE_URL + "/api/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: JSON.parse(TOKEN).refresh })
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


function logoutFunction() {
    const TOKEN = localStorage.getItem("auth-token") || "{}"

    fetch(BASE_URL + "/auth/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(TOKEN).access}`
        },
        body: JSON.stringify({ refresh: JSON.parse(TOKEN).refresh })
    })
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem("auth-token")
            initialState.currentUser = {}
        })
        .catch(error => {
            console.error("--- Error when logging out ---")
            console.error(error)
            console.error("-----------------------------------")
        })
}

export {
    refreshToken,
    logoutFunction
}
