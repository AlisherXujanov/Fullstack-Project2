import { createContext } from "react";
const BASE_URL = "http://127.0.0.1:8000"


const context = createContext()
const initialState = {}

function globalReducer(state, action) {
    switch (action.type) {
        case "...":
            return "..."
        default:
            throw new Error("Unexpected action")
    }
}

export {
    context,
    initialState,
    globalReducer,
    BASE_URL,
};