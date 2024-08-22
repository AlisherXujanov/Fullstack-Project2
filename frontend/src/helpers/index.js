import axios from 'axios'

async function getExchangeRates() {
    const URL = "https://v6.exchangerate-api.com/v6/3e5ca154c1ae64e74ec0f0cd/latest/USD"
    try {
        let response = await axios.get(URL)
        if (response.status === 200) {
            return response.data.conversion_rates
        } else {
            console.log("Failed to fetch product")
        }
    } catch (error) {
        console.error(error)
    }
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