import axios from 'axios'

async function getExchangeRates() {
    let conversion_rates = {}
    // let canCall = localStorage.getItem("canCallExchangeRates")
    // const URL = "https://v6.exchangerate-api.com/v6/3e5ca154c1ae64e74ec0f0cd/latest/USD"
    // if (canCall) {
    //     try {
    //         let response = await axios.get(URL)
    //         if (response.ok) {
    //             conversion_rates = response.data.conversion_rates
    //         } else {
    //             localStorage.setItem("canCallExchangeRates", "false")
    //             console.log("Failed to fetch product")
    //         }
    //     } catch (error) {
    //         if (error.response.status == 429) {
    //             localStorage.setItem("canCallExchangeRates", false)
    //             const MONTH = 1000 * 60 * 60 * 24 * 30
    //             setTimeout(() => {
    //                 localStorage.setItem("canCallExchangeRates", true)
    //             }, MONTH)
    //         }
    //         console.log("-------------------------------------------")
    //         console.error(error)
    //         console.log(error.response)
    //         console.log(error.response.status)
    //         console.log("-------------------------------------------")
    //     }
    // }
    return conversion_rates
}



function convertToUZS(exchangeRates, price) {
    let uzs = parseInt(exchangeRates.UZS * price)

    // 7822785    -->>   7 822 785
    let formatted_sum = ''
    String(uzs).split("").reverse().forEach((char, index) => {
        if (index % 3 == 0) {
            formatted_sum += " " + char
        } else {
            formatted_sum += char
        }
    })
    return formatted_sum.split("").reverse().join("")
}


function getTokensFromLocalStorage() {
    const TOKEN = localStorage.getItem("auth-token") || "{}"
    const accessToken = JSON.parse(TOKEN).access
    const refreshToken = JSON.parse(TOKEN).refresh
    return { accessToken, refreshToken }
}


export { convertToUZS, getExchangeRates, getTokensFromLocalStorage }